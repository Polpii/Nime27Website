import Link from "next/link";
import { notFound } from "next/navigation";
import { pages } from "@/content/pages";
import { currentEditor, readPage } from "@/lib/studio";
import { Editor } from "./editor";

export default async function StudioPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;

  const editor = await currentEditor();
  if (!editor) {
    return (
      <main className="mx-auto w-full max-w-5xl px-5 py-20 lg:px-8">
        <h1 className="font-display text-3xl text-craie">Please sign in first</h1>
        <Link
          href="/studio"
          className="mt-6 inline-block text-neon-teal underline underline-offset-4"
        >
          Go to the studio
        </Link>
      </main>
    );
  }

  const page = pages[key];
  if (!page) notFound();

  const result = await readPage(key);
  if (!result.ok) {
    return (
      <main className="mx-auto w-full max-w-5xl px-5 py-20 lg:px-8">
        <h1 className="font-display text-3xl text-craie">{page.title}</h1>
        <p className="mt-6 max-w-xl border-l-2 border-neon-or pl-4 text-[15px] leading-relaxed text-neon-or">
          {result.reason === "missing"
            ? "This page has no text file yet, so there is nothing to edit here. Ask Paul-Peter to add one."
            : `The text could not be fetched just now, so it is not shown rather than shown wrong. Try again in a moment, and tell Paul-Peter if it keeps happening. (${result.detail ?? "no detail"})`}
        </p>
        <Link
          href="/studio"
          className="mt-8 inline-block text-neon-teal underline underline-offset-4"
        >
          Back to all pages
        </Link>
      </main>
    );
  }
  const file = result.file;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 lg:px-8">
      <Link href="/studio" className="text-[13px] text-brume hover:text-neon-teal">
        ← All pages
      </Link>

      <h1 className="mt-6 font-display text-3xl text-craie sm:text-4xl">{page.title}</h1>
      <p className="mt-3 text-[13px] text-brume">/{page.slug}</p>

      <div className="mt-8 max-w-2xl space-y-3 text-[15px] leading-relaxed text-brume">
        <p>
          This is the page in plain text. Write normally. A line starting with{" "}
          <code className="bg-white/[0.07] px-1.5 py-0.5 text-craie"># </code> is the page
          title, <code className="bg-white/[0.07] px-1.5 py-0.5 text-craie">## </code> is a
          section heading, <code className="bg-white/[0.07] px-1.5 py-0.5 text-craie">- </code>
          starts a bullet, and{" "}
          <code className="bg-white/[0.07] px-1.5 py-0.5 text-craie">**like this**</code>{" "}
          is bold. The first paragraph under the title becomes the line in the header.
        </p>
        <p>
          Links are written{" "}
          <code className="bg-white/[0.07] px-1.5 py-0.5 text-craie">
            [the words](https://example.com)
          </code>
          , and a link to another page of our own site starts with a slash, like{" "}
          <code className="bg-white/[0.07] px-1.5 py-0.5 text-craie">(/call/papers)</code>.
          Anything in a{" "}
          <code className="bg-white/[0.07] px-1.5 py-0.5 text-craie">&gt; </code> line shows
          up as an orange &ldquo;not settled yet&rdquo; box.
        </p>
      </div>

      <Editor
        pageKey={key}
        sha={file.sha}
        initialText={file.text}
        previewHref={`/${page.slug}`}
      />
    </main>
  );
}
