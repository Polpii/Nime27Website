# NIME 2027 — nime2027.org

Save-the-date page for the International Conference on New Interfaces for
Musical Expression, Paris, 22–25 June 2027.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · fully static, one route.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## What this site is allowed to say

The page carries **confirmed facts only**: the conference name, the dates, and
Paris. Everything else a NIME site normally announces — theme, venues, host
institutions, deadlines, committee, registration, the edition number, whether
the conference is hybrid — is still unconfirmed by the 2027 committee and is
therefore *absent*, not guessed.

`TBC.txt` is the full audit of what is still missing, with file and line
references. Read it before adding anything to this page.

`src/content/site.ts` holds every fact the page displays. If a value isn't in
that file, the page doesn't claim it.

## drafts/

`drafts/` holds a complete multi-page conference site — submissions, registration,
programme, committee, visit, contact — written earlier against text adapted from
nime2026.org. It is **not built**: it sits outside `src/app/`, and `drafts` is in
the `tsconfig.json` exclude list so it is not type-checked either.

It is kept because the structure is worth reusing once the facts exist. Restoring
a page means moving its folder back under `src/app/`, moving `drafts/pages.ts`
back to `src/content/`, and `drafts/simple-page.tsx`, `ui.tsx`, `site-header.tsx`,
`site-footer.tsx` back to `src/components/`. Those components still assume the
old light palette and will need reworking for the dark one.

## Design

The palette is **sampled from the conference logo**, not chosen:

| Token | Value | Where it comes from |
| --- | --- | --- |
| `nuit` | `#000002` | the logo's own ground |
| `neon-teal` | `#20d0d4` | measured off the logo's strokes |
| `neon-or` | `#fda01f` | " |
| `neon-rose` | `#f34f7b` | " |
| `craie` / `brume` | `#edeae4` / `#8d96a6` | body text, muted text |
| `toit` | tuned inline in `page.tsx` | rooftop silhouette |

**The hero background must stay exactly `#000002`.** `public/logoNime27.png` is
opaque RGB with no alpha channel, so any glow, tint or gradient painted behind it
cuts its square out of the page as a visible tile. An earlier version had a
radial bloom there and the logo read as a pasted grey rectangle. If you want a
glow, either get a transparent PNG of the logo or composite the glow on top.

`src/components/paris.tsx` draws the Paris rooftops from the `BUILDINGS` array —
mansard roofs, chimney pots and a set-back Eiffel tower — so the roofline is
recomposed by editing numbers, not SVG paths. Its window colour comes from
`--window-glow`, set by the consuming page, so the skyline works on light or dark.

Type: Playfair Display for display, Inter for text, via `next/font`. The font CSS
variables are set on `<html>`, not `<body>` — the `@theme` tokens that reference
them resolve at `:root`, so moving them to `<body>` silently breaks every font.

## Generated assets

| File | How it was made |
| --- | --- |
| `src/app/icon.svg` | Drawn by hand. The logo's neon hairlines disappear below ~64px, so a crop of it makes an illegible favicon; this is a bold reduction of the same tower-and-beacon motif. |
| `src/app/apple-icon.png` | Same glyph, rendered to 180px. |
| `src/app/opengraph-image.png` | 1200×630 share card: logo plus dates. |

The script that produced the two PNGs is kept out of the repo; regenerate them by
editing the glyph in `icon.svg` and matching it, or ask for the script again.

## Deployment

Static, no server dependencies. On Vercel: import the repo, no configuration
needed, then add `nime2027.org` under Domains and copy the records Vercel gives
you into Porkbun's DNS.
