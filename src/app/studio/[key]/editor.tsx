"use client";

import { useActionState } from "react";
import { save, type SaveState } from "../actions";

export function Editor({
  pageKey,
  sha,
  initialText,
  previewHref,
}: {
  pageKey: string;
  sha: string;
  initialText: string;
  previewHref: string;
}) {
  const [state, action, pending] = useActionState<SaveState, FormData>(save, {});

  return (
    <form action={action} className="mt-10">
      <input type="hidden" name="key" value={pageKey} />
      <input type="hidden" name="sha" value={sha} />

      <textarea
        name="text"
        defaultValue={initialText}
        spellCheck
        // Tall by default: these are long documents and a short box makes
        // people edit through a letterbox.
        className="h-[62vh] w-full resize-y border border-white/15 bg-white/[0.03] p-5 font-mono text-[14px] leading-[1.7] text-craie outline-none focus:border-neon-teal"
      />

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={pending}
          className="border border-neon-teal px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-neon-teal hover:bg-neon-teal hover:text-nuit disabled:opacity-50"
        >
          {pending ? "Saving" : "Save"}
        </button>

        {state.saved !== undefined && (
          <p className="text-[15px] text-neon-teal">
            Saved. The preview rebuilds itself, so give it about a minute, then look at{" "}
            <a
              href={previewHref}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              the page
            </a>
            .
          </p>
        )}

        {state.error && (
          <p className="max-w-xl border-l-2 border-neon-rose pl-4 text-[15px] text-neon-rose">
            {state.error}
          </p>
        )}
      </div>
    </form>
  );
}
