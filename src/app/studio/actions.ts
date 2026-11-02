"use server";

import { redirect } from "next/navigation";
import { pages } from "@/content/pages";
import {
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

  const result = await writePage(key, text.replace(/\r\n?/g, "\n"), editor, sha);

  if (!result.ok) {
    if (result.reason === "conflict") {
      return {
        error:
          "Someone else saved this page while you were editing. Open it again in another tab, copy your version across, and save once more.",
      };
    }
    return { error: `The save did not go through. ${result.detail ?? ""}`.trim() };
  }

  return { saved: result.commit };
}
