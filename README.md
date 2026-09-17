# NIME 2027 — nime2027.org

Website for the 27th International Conference on New Interfaces for Musical
Expression, Paris, 22–25 June 2027.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · fully static.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — all 22 routes prerender as static HTML
npm run start    # serve the production build
```

## Where the content lives

You should almost never need to touch a page component to change wording.

| File | What it holds |
| --- | --- |
| `src/content/site.ts` | Dates, city, theme, navigation menu, important dates, submission tracks, venues |
| `src/content/pages.ts` | The body text of every interior page |
| `src/app/page.tsx` | The homepage (the one page whose text is inline, because its layout is bespoke) |

`src/content/pages.ts` uses a deliberately tiny markup dialect so it can be
edited without knowing React:

```
## Heading            -> sub-heading
- item                -> bullet
> note                -> gold "TBC" callout
anything else         -> paragraph
**bold** and [label](https://url) work inline
```

Adding a page: add an entry to `pages.ts`, create
`src/app/<path>/page.tsx` copying any existing one-liner route file, and add the
link to `nav` in `site.ts`.

## The Paris design system

Tokens are defined once in the `@theme` block of `src/app/globals.css`:

| Token | Reference |
| --- | --- |
| `craie` / `craie-2` / `pierre` | Haussmann limestone facades |
| `plaque` | the blue of Paris street-name plaques |
| `encre` | near-black ink, used for dark sections |
| `zinc-toit` | the grey of Paris rooftops |
| `rouge` | the red of the city coat of arms |
| `or` | gilding — Opéra, Pont Alexandre III |
| `vert` | Guimard métro / Wallace fountain green |

Use them as normal Tailwind utilities: `bg-craie`, `text-plaque`, `border-pierre`.

Ornaments live in `src/components/paris.tsx`:

- `ParisSkyline` — mansard rooftops, chimney pots and a set-back Eiffel tower,
  drawn from the `BUILDINGS` array so the roofline can be re-composed by editing
  numbers rather than SVG paths
- `EiffelTower`, `MetroArch`, `Plaque`, `Ferronnerie` (a wrought-iron balcony
  railing used as a rule)

Type: Playfair Display for display, Inter for text, both self-hosted through
`next/font`. The font CSS variables are set on `<html>`, not `<body>` — the
`@theme` tokens that reference them resolve at `:root`, so moving them to
`<body>` silently breaks every font on the site.

## Content status

Everything currently on the site is **provisional**. Text is adapted from
[nime2026.org](https://nime2026.org) as a placeholder, and dates are
extrapolated one year forward from the 2026 edition. Placeholders are marked
in the UI with the gold `TBC` callout (`<Provisional>`), so nothing reads as
confirmed when it is not.

Still to be supplied by the committee: venues, host institutions, the 2027
theme, keynote speakers, committee names, registration rates, and the real
deadline dates.

## Deployment

The site is fully static and has no server dependencies. To put it on Vercel:

1. Push this directory to a Git repository
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is
   detected, no configuration needed
3. Add `nime2027.org` in the project's Domains settings, then in Porkbun's DNS
   set the `A` and `CNAME` records Vercel gives you

Cloudflare Pages, Netlify and GitHub Pages all work too — `next build` output is
static.
