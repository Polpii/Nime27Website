"use client";

import { useActionState } from "react";
import type { Field } from "@/content/editable";
import { RowsEditor, type Row } from "./rows-editor";
import { saveFields, type SaveState } from "../actions";

const box =
  "mt-2 w-full border border-white/15 bg-white/[0.03] px-4 py-3 text-[15px] leading-[1.7] text-craie outline-none focus:border-neon-teal";

export function FieldsEditor({
  pageKey,
  sha,
  fields,
  values,
  tables,
  previewHref,
}: {
  pageKey: string;
  sha: string;
  fields: Field[];
  /** A list field arrives already joined into text. */
  values: Record<string, string>;
  /** A table field arrives as its rows. */
  tables: Record<string, Row[]>;
  previewHref: string;
}) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveFields, {});

  return (
    <form
      action={action}
      // A table needs more room than a paragraph does.
      className={fields.some((f) => f.kind === "rows") ? "mt-10" : "mt-10 max-w-2xl"}
    >
      <input type="hidden" name="key" value={pageKey} />
      <input type="hidden" name="sha" value={sha} />

      <div className="space-y-9">
        {fields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={field.key}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neon-teal"
            >
              {field.label}
            </label>

            {field.kind === "rows" ? (
              <RowsEditor
                name={`f.${field.key}`}
                columns={field.columns ?? []}
                rowNoun={field.rowNoun ?? "row"}
                initial={tables[field.key] ?? []}
              />
            ) : field.kind === "line" ? (
              <input
                id={field.key}
                name={`f.${field.key}`}
                defaultValue={values[field.key]}
                spellCheck
                className={box}
              />
            ) : (
              <textarea
                id={field.key}
                name={`f.${field.key}`}
                defaultValue={values[field.key]}
                spellCheck
                rows={field.kind === "list" || field.kind === "lines" ? 10 : 5}
                className={`${box} resize-y`}
              />
            )}

            {field.hint && <p className="mt-2 text-[13px] text-brume">{field.hint}</p>}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
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
