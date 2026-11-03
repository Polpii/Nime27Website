import Link from "next/link";
import { notFound } from "next/navigation";
import { fieldsPages } from "@/content/editable";
import { pages } from "@/content/pages";
import { CALLS_DIR, FIELDS_DIR, currentEditor, readPage } from "@/lib/studio";
import { Editor } from "./editor";
import { FieldsEditor } from "./fields-editor";

function Shell({ title, slug, children }: { title: string; slug?: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 lg:px-8">
      <Link href="/studio" className="text-[13px] text-brume hover:text-neon-teal">
        ← All pages
      </Link>
      <h1 className="mt-6 font-display text-3xl text-craie sm:text-4xl">{title}</h1>
      {slug !== undefined && <p className="mt-3 text-[13px] text-brume">/{slug}</p>}
      {children}
    </main>
  );
}

function Unavailable({ reason, detail }: { reason: "missing" | "unreachable"; detail?: string }) {
  return (
    <>
      <p className="mt-6 max-w-xl border-l-2 border-neon-or pl-4 text-[15px] leading-relaxed text-neon-or">
        {reason === "missing"
          ? "This page has no text file yet, so there is nothing to edit here. Ask Paul-Peter to add one."
          : `The text could not be fetched just now, so it is not shown rather than shown wrong. Try again in a moment, and tell Paul-Peter if it keeps happening. (${detail ?? "no detail"})`}
      </p>
      <Link href="/studio" className="mt-8 inline-block text-neon-teal underline underline-offset-4">
        Back to all pages
      </Link>
    </>
  );
}

/** The short course in the markup, shown above a document editor. */
function MarkupHelp() {
  const code = "bg-white/[0.07] px-1.5 py-0.5 text-craie";
  return (
    <div className="mt-8 max-w-2xl space-y-3 text-[15px] leading-relaxed text-brume">
      <p>
        This is the page in plain text. Write normally. A line starting with{" "}
        <code className={code}># </code> is the page title,{" "}
        <code className={code}>## </code> is a section heading,{" "}
        <code className={code}>- </code> starts a bullet, and{" "}
        <code className={code}>**like this**</code> is bold. The first paragraph under the
        title becomes the line in the header.
      </p>
      <p>
        Links are written <code className={code}>[the words](https://example.com)</code>,
        and a link to another page of our own site starts with a slash, like{" "}
        <code className={code}>(/call/papers)</code>. Anything in a{" "}
        <code className={code}>&gt; </code> line shows up as an orange &ldquo;not settled
        yet&rdquo; box.
      </p>
    </div>
  );
}

export default async function StudioPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;

  const editor = await currentEditor();
  if (!editor) {
    return (
      <main className="mx-auto w-full max-w-5xl px-5 py-20 lg:px-8">
        <h1 className="font-display text-3xl text-craie">Please sign in first</h1>
        <Link href="/studio" className="mt-6 inline-block text-neon-teal underline underline-offset-4">
          Go to the studio
        </Link>
      </main>
    );
  }

  // A page whose text is a set of named pieces rather than a document.
  const fieldsPage = Object.prototype.hasOwnProperty.call(fieldsPages, key)
    ? fieldsPages[key]
    : undefined;

  if (fieldsPage) {
    const result = await readPage(`${FIELDS_DIR}/${fieldsPage.file}`);
    if (!result.ok) {
      return (
        <Shell title={fieldsPage.title} slug={fieldsPage.slug}>
          <Unavailable reason={result.reason} detail={result.detail} />
        </Shell>
      );
    }

    let stored: Record<string, unknown>;
    try {
      stored = JSON.parse(result.file.text) as Record<string, unknown>;
    } catch {
      return (
        <Shell title={fieldsPage.title} slug={fieldsPage.slug}>
          <Unavailable reason="unreachable" detail="the stored file could not be read" />
        </Shell>
      );
    }

    const values: Record<string, string> = {};
    const tables: Record<string, Record<string, string>[]> = {};

    for (const field of fieldsPage.fields) {
      const value = stored[field.key];

      if (field.kind === "rows") {
        // Only the columns the schema knows reach the form, so a stray key in
        // the stored file is shown to nobody and written back by nobody.
        tables[field.key] = (Array.isArray(value) ? value : []).map((row) => {
          const clean: Record<string, string> = {};
          for (const column of field.columns ?? []) {
            const cell = (row as Record<string, unknown>)?.[column.key];
            clean[column.key] = typeof cell === "string" ? cell : "";
          }
          return clean;
        });
        continue;
      }

      values[field.key] = Array.isArray(value)
        ? value.join(field.kind === "lines" ? "\n" : "\n\n")
        : typeof value === "string"
          ? value
          : "";
    }

    return (
      <Shell title={fieldsPage.title} slug={fieldsPage.slug}>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-brume">
          {fieldsPage.intro}
        </p>
        <FieldsEditor
          pageKey={key}
          sha={result.file.sha}
          fields={fieldsPage.fields}
          values={values}
          tables={tables}
          previewHref={`/${fieldsPage.slug}`}
        />
      </Shell>
    );
  }

  const page = pages[key];
  if (!page) notFound();

  const result = await readPage(`${CALLS_DIR}/${key}.md`);
  if (!result.ok) {
    return (
      <Shell title={page.title} slug={page.slug}>
        <Unavailable reason={result.reason} detail={result.detail} />
      </Shell>
    );
  }

  return (
    <Shell title={page.title} slug={page.slug}>
      <MarkupHelp />
      <Editor
        pageKey={key}
        sha={result.file.sha}
        initialText={result.file.text}
        previewHref={`/${page.slug}`}
      />
    </Shell>
  );
}
