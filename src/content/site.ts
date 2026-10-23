/**
 * Site content.
 *
 * Most of this is now CONFIRMED, taken from the organisers' own documents:
 * the call overview, the track schedule and the chairs sheet. Anything still
 * unsettled is marked TBC and rendered inside a <Provisional> callout so no
 * reader can mistake it for a decision. See TBC.txt for the remaining gaps.
 */

export const conference = {
  name: "NIME 2027",
  fullName: "New Interfaces for Musical Expression",
  /** nime.org's own wording for the conference series. */
  seriesName: "The International Conference on",
  /** TBC — the edition number has never been published by NIME itself. */
  number: "The International Conference on",
  /**
   * 21-25 June, not 22-25: the published range covers the pre-conference
   * activities (21 June is the fête de la musique, 22 June the workshops and
   * reception), so nobody books travel that misses them.
   */
  dates: "21–25 June 2027",
  datesShort: "21–25 JUN 2027",
  city: "Paris",
  country: "France",
  location: "Paris, France",
  /** Announced by nime.org. The exact site and address are still TBC. */
  host: "Devinci Higher Education",
  /** The call is published the week commencing 26 October 2026. */
  callOpens: "October 2026",
  /** TBC — this address does not exist yet. */
  email: "contact@nime2027.org",
  /** Shown to readers. */
  domain: "nime2027.org",
  /**
   * The host actually served. The apex 308-redirects to www, so every
   * canonical signal (sitemap, robots, og:url) must name www or they all
   * point at a redirect and the signals get split.
   */
  origin: "https://www.nime2027.org",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Call",
    href: "/call",
    children: [
      { label: "Papers", href: "/call/papers" },
      { label: "Music / Performance", href: "/call/music" },
      { label: "Art / Installations", href: "/call/installations" },
      { label: "alt.nime", href: "/call/alt-nime" },
      { label: "Artifacts & Ideas", href: "/call/artifacts" },
      { label: "Workshops", href: "/call/workshops" },
      { label: "Doctoral Consortium", href: "/call/doctoral-consortium" },
      { label: "Reviewing", href: "/call/reviewing" },
      { label: "Camera-Ready", href: "/call/camera-ready" },
    ],
  },
  { label: "Registration", href: "/registration" },
  {
    label: "Programme",
    href: "/programme",
    children: [
      { label: "Overview", href: "/programme" },
      { label: "Keynotes", href: "/programme/keynotes" },
      { label: "Satellite Events", href: "/satellite-events" },
    ],
  },
  { label: "Committee", href: "/committee" },
  {
    label: "Visit",
    href: "/visit",
    children: [
      { label: "Get around", href: "/visit/get-around" },
      { label: "Accessibility FAQ", href: "/visit/accessibility" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/**
 * The two submission deadlines everything else hangs off. Both are AoE.
 * Taken from the organisers' call overview.
 */
export const deadlines = {
  peerReviewed: "Sunday 31 January 2027",
  curated: "Sunday 4 April 2027",
} as const;

export type ImportantDate = {
  date: string;
  label: string;
  kind: "deadline" | "event" | "info";
};

/** From the organisers' track schedule. All submission deadlines are 23:59 AoE. */
export const importantDates: ImportantDate[] = [
  { date: "October 2026", label: "Call for contributions published", kind: "info" },
  { date: "December 2026", label: "Submission system opens", kind: "info" },
  {
    date: "Sunday 24 January 2027",
    label: "Peer reviewed tracks — titles, abstracts and authors due",
    kind: "deadline",
  },
  {
    date: "Sunday 31 January 2027",
    label: "Peer reviewed tracks — full submissions due",
    kind: "deadline",
  },
  { date: "Friday 26 March 2027", label: "Peer reviewed decisions released", kind: "info" },
  {
    date: "Sunday 4 April 2027",
    label: "Curated tracks — submissions due",
    kind: "deadline",
  },
  { date: "Friday 30 April 2027", label: "Curated decisions released", kind: "info" },
  { date: "May 2027", label: "Final materials and camera-ready due", kind: "deadline" },
  { date: "Monday 21 June 2027", label: "Fête de la musique", kind: "event" },
  {
    date: "Tuesday 22 June 2027",
    label: "Workshops, Doctoral Consortium, reception and opening concert",
    kind: "event",
  },
  { date: "23–25 June 2027", label: "Main conference", kind: "event" },
];

export type Track = {
  title: string;
  href: string;
  /** Which of the two deadlines this track falls under. */
  group: "peer-reviewed" | "curated";
  blurb: string;
};

/**
 * The seven calls, in the organisers' own words. Note the grouping: three
 * tracks are peer reviewed and close in January, four are curated and close
 * in April. The intro page leads with that split because it is the thing a
 * reader most needs to get right.
 */
export const tracks: Track[] = [
  {
    title: "Papers",
    href: "/call/papers",
    group: "peer-reviewed",
    blurb:
      "Research, such as a study of musical gestures, a new instrument design or a reflection on performance practice.",
  },
  {
    title: "Music / Performance",
    href: "/call/music",
    group: "peer-reviewed",
    blurb:
      "Concert works, such as a piece for a custom controller or a human–machine duet.",
  },
  {
    title: "Art / Installations",
    href: "/call/installations",
    group: "peer-reviewed",
    blurb:
      "Artworks, such as an interactive sound sculpture or a room that responds musically to visitors.",
  },
  {
    title: "alt.nime",
    href: "/call/alt-nime",
    group: "curated",
    blurb:
      "Work that challenges conventional formats, such as a zine, a participatory ritual or an experimental lecture.",
  },
  {
    title: "Artifacts & Ideas",
    href: "/call/artifacts",
    group: "curated",
    blurb:
      "Works without an accompanying research paper, such as a DIY instrument presented as a demo, or a musical interaction concept presented as a poster.",
  },
  {
    title: "Workshops",
    href: "/call/workshops",
    group: "curated",
    blurb:
      "Shared activities, such as exploring collaborative live coding, discussing accessible music-making, or get-togethers of subcommunities within NIME.",
  },
  {
    title: "Doctoral Consortium",
    href: "/call/doctoral-consortium",
    group: "curated",
    blurb: "Feedback on a developing PhD project from peers and senior mentors.",
  },
];
