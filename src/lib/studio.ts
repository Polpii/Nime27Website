/**
 * The studio: a password-gated page where the general chairs edit the text of
 * the site in their browser, with no GitHub account and nothing to install.
 *
 * How it works. Every page of the site that carries prose is backed by a
 * markdown file in src/content/calls/, and getPage() prefers that file over
 * pages.ts. The studio reads those files straight from GitHub, shows one in a
 * text box, and commits the edit back. Vercel sees the commit and rebuilds,
 * so the change is on the preview a minute or so later.
 *
 * Reading from GitHub rather than from the bundle is deliberate: an edit made
 * two minutes ago is in the repository but not yet in the running deployment,
 * and a chair who saves twice in a row must see their own first edit, not the
 * text it replaced.
 *
 * What this is not: it is a shared password, not accounts. Everyone who has
 * it is the same person as far as the repository is concerned, so the commit
 * records the name they type. That is the trade for not making three people
 * sign up to GitHub, and it is recoverable either way because every save is
 * an ordinary commit on a branch.
 */

// Nothing here may reach the browser. There is no `server-only` package in
// this project to enforce it, so the guard is that every importer is a
// server component or a "use server" file, and that node:crypto below would
// fail the build if one of them were not.
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "nime_studio";
/** Long enough for an afternoon of editing, short enough to matter. */
const SESSION_SECONDS = 12 * 60 * 60;

const REPO = process.env.STUDIO_REPO ?? "Polpii/Nime27Website";
/**
 * Edits land on the preview branch, never straight on what the public sees.
 * Going live stays a deliberate act by whoever merges.
 */
const BRANCH = process.env.STUDIO_BRANCH ?? "preview/full-site";
const DIR = "src/content/calls";

/** Both secrets must be set for the studio to do anything at all. */
export function studioConfigured(): boolean {
  return Boolean(process.env.STUDIO_PASSWORD && process.env.STUDIO_GITHUB_TOKEN);
}

function signingKey(): string {
  const password = process.env.STUDIO_PASSWORD;
  if (!password) throw new Error("STUDIO_PASSWORD is not set");
  // Derived from the password rather than kept as a second secret, so there
  // is one thing to configure and changing the password ends every session.
  return createHmac("sha256", "nime2027-studio").update(password).digest("hex");
}

function sign(payload: string): string {
  return createHmac("sha256", signingKey()).update(payload).digest("base64url");
}

/** Compares two signatures without leaking how far they matched. */
function sameSignature(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function checkPassword(given: string): boolean {
  const expected = process.env.STUDIO_PASSWORD;
  if (!expected) return false;
  // Both sides are hashed first so the comparison is over two fixed-length
  // digests. Comparing the raw strings would return early on a length
  // mismatch, which tells an attacker how long the password is.
  const digest = (value: string) =>
    createHmac("sha256", "nime2027-studio-password").update(value).digest();
  return timingSafeEqual(digest(given), digest(expected));
}

/** Issues the session cookie. Only ever called after checkPassword passes. */
export async function startSession(name: string): Promise<void> {
  const payload = JSON.stringify({
    name: name.slice(0, 60),
    exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
  });
  const body = Buffer.from(payload, "utf8").toString("base64url");
  const store = await cookies();
  store.set(COOKIE, `${body}.${sign(body)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

/** The signed-in editor's name, or null when there is no valid session. */
export async function currentEditor(): Promise<string | null> {
  if (!studioConfigured()) return null;
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;

  const dot = raw.lastIndexOf(".");
  if (dot < 1) return null;
  const body = raw.slice(0, dot);
  if (!sameSignature(raw.slice(dot + 1), sign(body))) return null;

  try {
    const { name, exp } = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (typeof exp !== "number" || exp < Date.now() / 1000) return null;
    return typeof name === "string" && name.trim() !== "" ? name : "a chair";
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ GitHub */

function ghHeaders() {
  const token = process.env.STUDIO_GITHUB_TOKEN;
  if (!token) throw new Error("STUDIO_GITHUB_TOKEN is not set");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "nime2027-studio",
  };
}

export type StoredFile = { text: string; sha: string };

export type ReadResult =
  | { ok: true; file: StoredFile }
  | { ok: false; reason: "missing" | "unreachable"; detail?: string };

/**
 * The current text of one page, straight from the branch.
 *
 * The sha comes back with it and goes to GitHub again on save, which is what
 * stops two chairs editing the same page at once from quietly overwriting one
 * another: the second save is refused rather than applied.
 *
 * Nothing here throws. A chair who opens the studio while the token is wrong
 * or GitHub is down should read a sentence telling them so, not meet the
 * framework's error page.
 */
export async function readPage(key: string): Promise<ReadResult> {
  const url = `https://api.github.com/repos/${REPO}/contents/${DIR}/${encodeURIComponent(key)}.md?ref=${encodeURIComponent(BRANCH)}`;

  let res: Response;
  try {
    res = await fetch(url, { headers: ghHeaders(), cache: "no-store" });
  } catch (error) {
    return {
      ok: false,
      reason: "unreachable",
      detail: error instanceof Error ? error.message : "the request failed",
    };
  }

  if (res.status === 404) return { ok: false, reason: "missing" };
  if (!res.ok) {
    return { ok: false, reason: "unreachable", detail: `GitHub answered ${res.status}` };
  }

  try {
    const json = (await res.json()) as { content: string; sha: string };
    return {
      ok: true,
      file: {
        text: Buffer.from(json.content, "base64").toString("utf8"),
        sha: json.sha,
      },
    };
  } catch {
    return { ok: false, reason: "unreachable", detail: "GitHub sent something unreadable" };
  }
}

export type SaveResult =
  | { ok: true; commit: string }
  | { ok: false; reason: "conflict" | "failed"; detail?: string };

export async function writePage(
  key: string,
  text: string,
  editor: string,
  sha: string,
): Promise<SaveResult> {
  const url = `https://api.github.com/repos/${REPO}/contents/${DIR}/${encodeURIComponent(key)}.md`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "PUT",
      headers: { ...ghHeaders(), "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        message: `${key}: text edited by ${editor}\n\nEdited in the studio.`,
        content: Buffer.from(text, "utf8").toString("base64"),
        sha,
        branch: BRANCH,
      }),
    });
  } catch (error) {
    // The chair's words are still in the box in front of them, so the one
    // thing this must not do is lose them behind an error page.
    return {
      ok: false,
      reason: "failed",
      detail: error instanceof Error ? error.message : "the request failed",
    };
  }

  if (res.status === 409 || res.status === 422) {
    return { ok: false, reason: "conflict" };
  }
  if (!res.ok) {
    return { ok: false, reason: "failed", detail: `GitHub said ${res.status}` };
  }
  const json = (await res.json()) as { commit?: { sha?: string } };
  return { ok: true, commit: json.commit?.sha?.slice(0, 7) ?? "" };
}

export const studioBranch = BRANCH;
