"use server";

import { redirect } from "next/navigation";
import { fieldsPages } from "@/content/editable";
import { pages } from "@/content/pages";
import {
  CALLS_DIR,
  FIELDS_DIR,
  checkPassword,
  currentEditor,
  endSession,
  startSession,
  studioConfigured,
  writePage,
} from "@/lib/studio";

export type SignInState = { error?: string };
export type SaveState = { error?: string; saved?: string };

/**
 * A server action is a POST endpoint whether or not the form that calls it is
 * on screen, so each one checks the session itself rather than trusting that
 * the page rendered the form at all.
 */
export async function signIn(
  _previous: SignInState,
  form: FormData,
): Promise<SignInState> {
  if (!studioConfigured()) {
    return { error: "The studio is not configured yet. Ask Paul-Peter." };
  }

  const name = String(form.get("name") ?? "").trim();
  const password = String(form.get("password") ?? "");

  if (name === "") return { error: "Please put your name, so the edit is signed." };
  if (!checkPassword(password)) return { error: "That password is not right." };

  await startSession(name);
  redirect("/studio");
}

export async function signOut(): Promise<void> {
  await endSession();
  redirect("/studio");
}

/** Shared by both save actions: the reason a save did not go through. */
function failure(reason: "conflict" | "failed", detail?: string): SaveState {
  if (reason === "conflict") {
    return {
      error:
        "Someone else saved this page while you were editing. Open it again in another tab, copy your version across, and save once more.",
    };
  }
  return { error: `The save did not go through. ${detail ?? ""}`.trim() };
}

/** Saves one of the markdown pages. */
export async function save(_previous: SaveState, form: FormData): Promise<SaveState> {
  const editor = await currentEditor();
  if (!editor) return { error: "Your session has expired. Please sign in again." };

  const key = String(form.get("key") ?? "");
  // The key decides which file is written, so it is checked against the list
  // of real pages rather than used as a path.
  if (!Object.prototype.hasOwnProperty.call(pages, key)) {
    return { error: "That is not a page of this site." };
  }

  const sha = String(form.get("sha") ?? "");
  if (sha === "") return { error: "Something went wrong loading this page. Reload and try again." };

  const text = String(form.get("text") ?? "");
  if (text.trim() === "") {
    return { error: "The page is empty. If you meant to clear it, tell Paul-Peter instead." };
  }

  const result = await writePage(
    `${CALLS_DIR}/${key}.md`,
    text.replace(/\r\n?/g, "\n"),
    editor,
    sha,
    key,
  );

  if (!result.ok) return failure(result.reason, result.detail);
  return { saved: result.commit };
}

/**
 * Saves one of the pages whose text is a set of named pieces rather than a
 * document.
 *
 * The JSON is rebuilt here from the known fields, never parsed back from
 * anything the browser sent, so an edit cannot produce a file the site
 * fails to read. A key that is not in the schema is ignored.
 */
export async function saveFields(
  _previous: SaveState,
  form: FormData,
): Promise<SaveState> {
  const editor = await currentEditor();
  if (!editor) return { error: "Your session has expired. Please sign in again." };

  const key = String(form.get("key") ?? "");
  const page = Object.prototype.hasOwnProperty.call(fieldsPages, key)
    ? fieldsPages[key]
    : undefined;
  if (!page) return { error: "That is not a page of this site." };

  const sha = String(form.get("sha") ?? "");
  if (sha === "") return { error: "Something went wrong loading this page. Reload and try again." };

  const content: Record<string, string | string[]> = {};
  const empty: string[] = [];

  for (const field of page.fields) {
    const raw = String(form.get(`f.${field.key}`) ?? "").replace(/\r\n?/g, "\n");
    if (field.kind === "list") {
      const items = raw
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
        .filter((p) => p !== "");
      if (items.length === 0) empty.push(field.label);
      content[field.key] = items;
    } else {
      // A single line never keeps its newlines, so a pasted paragraph cannot
      // quietly break the layout it sits in.
      const value =
        field.kind === "line" ? raw.replace(/\s+/g, " ").trim() : raw.trim();
      if (value === "") empty.push(field.label);
      content[field.key] = value;
    }
  }

  if (empty.length > 0) {
    return {
      error: `Nothing can be left blank here, and these are: ${empty.join(", ")}.`,
    };
  }

  const result = await writePage(
    `${FIELDS_DIR}/${page.file}`,
    JSON.stringify(content, null, 2) + "\n",
    editor,
    sha,
    page.title,
  );

  if (!result.ok) return failure(result.reason, result.detail);
  return { saved: result.commit };
}
