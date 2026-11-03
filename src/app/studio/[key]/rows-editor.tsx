"use client";

import { useState } from "react";
import type { Column } from "@/content/editable";

const cell =
  "w-full border border-white/15 bg-white/[0.03] px-3 py-2 text-[14px] leading-[1.6] text-craie outline-none focus:border-neon-teal";

const span = { 1: "sm:col-span-1", 2: "sm:col-span-2", 3: "sm:col-span-3" } as const;

export type Row = Record<string, string>;

/**
 * A table the chair can add to, reorder and delete from.
 *
 * The rows are React state rather than plain inputs, because reordering
 * uncontrolled inputs loses what is typed in them. Each cell is named
 * `<field>.<position>.<column>`, so the server can rebuild the table by
 * walking the positions without parsing anything the browser invented.
 */
export function RowsEditor({
  name,
  columns,
  rowNoun,
  initial,
}: {
  name: string;
  columns: Column[];
  rowNoun: string;
  initial: Row[];
}) {
  const blank = (): Row => Object.fromEntries(columns.map((c) => [c.key, ""]));
  const [rows, setRows] = useState<Row[]>(initial.length > 0 ? initial : [blank()]);

  const change = (i: number, key: string, value: string) =>
    setRows((old) => old.map((r, n) => (n === i ? { ...r, [key]: value } : r)));

  const move = (i: number, by: number) =>
    setRows((old) => {
      const to = i + by;
      if (to < 0 || to >= old.length) return old;
      const next = [...old];
      [next[i], next[to]] = [next[to], next[i]];
      return next;
    });

  const remove = (i: number) =>
    setRows((old) => (old.length === 1 ? [blank()] : old.filter((_, n) => n !== i)));

  return (
    <div className="mt-3">
      <ol className="space-y-3">
        {rows.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-1 gap-2 border border-white/10 bg-white/[0.02] p-3 sm:grid-cols-6"
          >
            {columns.map((column) => (
              <div key={column.key} className={span[column.span ?? 1]}>
                <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brume">
                  {column.label}
                </label>
                {column.kind === "choice" ? (
                  <select
                    name={`${name}.${i}.${column.key}`}
                    value={row[column.key] ?? ""}
                    onChange={(e) => change(i, column.key, e.target.value)}
                    className={`${cell} mt-1`}
                  >
                    {(column.options ?? []).map((option) => (
                      <option key={option} value={option} className="bg-nuit">
                        {option}
                      </option>
                    ))}
                  </select>
                ) : column.kind === "lines" ? (
                  <textarea
                    name={`${name}.${i}.${column.key}`}
                    value={row[column.key] ?? ""}
                    onChange={(e) => change(i, column.key, e.target.value)}
                    rows={4}
                    spellCheck
                    className={`${cell} mt-1 resize-y`}
                  />
                ) : (
                  <input
                    name={`${name}.${i}.${column.key}`}
                    value={row[column.key] ?? ""}
                    onChange={(e) => change(i, column.key, e.target.value)}
                    spellCheck
                    className={`${cell} mt-1`}
                  />
                )}
              </div>
            ))}

            <div className="flex items-end gap-2 sm:col-span-6">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                aria-label="Move up"
                className="border border-white/15 px-3 py-1 text-[12px] text-brume hover:border-neon-teal hover:text-neon-teal disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === rows.length - 1}
                aria-label="Move down"
                className="border border-white/15 px-3 py-1 text-[12px] text-brume hover:border-neon-teal hover:text-neon-teal disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="ml-auto border border-white/15 px-3 py-1 text-[12px] text-brume hover:border-neon-rose hover:text-neon-rose"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={() => setRows((old) => [...old, blank()])}
        className="mt-3 border border-white/15 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-brume hover:border-neon-teal hover:text-neon-teal"
      >
        Add a {rowNoun}
      </button>
    </div>
  );
}
