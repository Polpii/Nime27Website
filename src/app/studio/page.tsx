import Link from "next/link";
import { fieldsPages } from "@/content/editable";
import { pages } from "@/content/pages";
import { currentEditor, studioBranch, studioConfigured } from "@/lib/studio";
import { signOut } from "./actions";
import { SignInForm } from "./sign-in-form";

/** The pages, grouped the way the chairs think about them rather than by key. */
const groups: { heading: string; keys: string[] }[] = [
  // The pages whose text is a set of named pieces rather than a document.
  // They lead the list because they are the ones the chairs asked for last.
  {
    heading: "The front of the site",
    keys: ["home-page", "call-overview", "conference-theme"],
  },
  // The pages that are tables rather than prose: a date, a name, an address
  // per row.
  { heading: "Lists and tables", keys: ["key-dates", "programme", "committee", "contact"] },
  {
    heading: "Calls",
    keys: [
      "papers",
      "music",
      "installations",
      "artifacts",
      "alt-nime",
      "workshops",
      "doctoral-consortium",
    ],
  },
  { heading: "Submitting and reviewing", keys: ["submission-instructions", "reviewing"] },
  { heading: "Attending", keys: ["registration", "keynotes", "satellite-events"] },
  { heading: "Visiting Paris", keys: ["visit", "get-around", "accessibility", "map"] },
];

export default async function StudioHome() {
  const editor = await currentEditor();

  if (!editor) {
    return (
      <main className="mx-auto w-full max-w-5xl px-5 py-20 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neon-teal">
          NIME 2027
        </p>
        <h1 className="mt-4 font-display text-4xl text-craie sm:text-5xl">Studio</h1>
        <p className="mt-6 max-w-xl text-[17px] leading-[1.75] text-brume">
          Edit the words on the conference site. Changes go to the preview, not to the
          live page, so nothing you do here is public until someone publishes it.
        </p>
        {studioConfigured() ? (
          <SignInForm />
        ) : (
          <p className="mt-10 max-w-xl border-l-2 border-neon-or pl-4 text-[15px] text-neon-or">
            The studio is not switched on yet. It needs its password and its access token
            set in the hosting dashboard.
          </p>
        )}
      </main>
    );
  }

  const known = new Set(groups.flatMap((g) => g.keys));
  const rest = [...Object.keys(fieldsPages), ...Object.keys(pages)].filter(
    (key) => !known.has(key),
  );
  const all = rest.length > 0 ? [...groups, { heading: "Other", keys: rest }] : groups;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-20 lg:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neon-teal">
            NIME 2027
          </p>
          <h1 className="mt-4 font-display text-4xl text-craie sm:text-5xl">Studio</h1>
        </div>
        <form action={signOut}>
          <p className="text-right text-[13px] text-brume">
            Signed in as {editor}
            <button
              type="submit"
              className="ml-3 underline underline-offset-4 hover:text-neon-teal"
            >
              sign out
            </button>
          </p>
        </form>
      </div>

      <p className="mt-6 max-w-2xl text-[17px] leading-[1.75] text-brume">
        Pick a page and rewrite whatever you like. Each save is recorded under your name
        on the <span className="text-craie">{studioBranch}</span> branch, and the preview
        rebuilds itself a minute or so later. Nothing here touches the live site.
      </p>

      <div className="mt-14 space-y-12">
        {all.map((group) => (
          <section key={group.heading}>
            <h2 className="border-b border-white/10 pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neon-teal">
              {group.heading}
            </h2>
            <ul className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {group.keys
                .map((key) => {
                  const entry = fieldsPages[key] ?? pages[key];
                  return entry ? { key, title: entry.title, slug: entry.slug } : null;
                })
                .filter((entry) => entry !== null)
                .map((entry) => (
                  <li key={entry.key}>
                    <Link
                      href={`/studio/${entry.key}`}
                      className="group flex items-baseline justify-between gap-4 border-b border-white/[0.07] pb-3"
                    >
                      <span className="font-display text-lg text-craie group-hover:text-neon-teal">
                        {entry.title}
                      </span>
                      <span className="shrink-0 text-[12px] text-brume">
                        /{entry.slug}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-16 max-w-2xl border-t border-white/10 pt-8 text-[14px] leading-relaxed text-brume">
        Every page of the site is here. The track names, the conference dates and the
        navigation are not, because they are the same in a dozen places at once. Ask
        Paul-Peter for those.
      </p>
    </main>
  );
}
