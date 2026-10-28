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
  /** Announced by nime.org. */
  host: "Devinci Higher Education",
  /** The venue named across the organisers' plans and location photographs. */
  venue: "Campus du Parc",
  /**
   * Confirmed against ESILV's own campus page in both languages, which give
   * the same street number. An older Devinci Executive Education page says
   * 41; the venue's current pages win.
   */
  venueAddress: "29 Allée le Corbusier, 92000 Nanterre",
  /**
   * Confirmed: it appears in the Papers, Music, Art / Installations and
   * Artifacts & Ideas calls. The Student Consortium draft still carries an
   * older name and is marked "TO UPDATE" in the source document.
   */
  theme: "Sensorial Symbiosis",
  /** The call is published the week commencing 26 October 2026. */
  callOpens: "October 2026",
  /** TBC — this address does not exist yet. */
  email: "general-chairs@nime2027.org",
  /** Shown to readers. */
  domain: "nime2027.org",
  /**
   * The host actually served. The apex 308-redirects to www, so every
   * canonical signal (sitemap, robots, og:url) must name www or they all
   * point at a redirect and the signals get split.
   */
  origin: "https://www.nime2027.org",
} as const;

/**
 * External services the site has to link to but does not own. Each stays null
 * until it actually exists: the pages that depend on one say plainly that it
 * is not open yet rather than linking nowhere. Switching one on is a one-line
 * change here.
 */
export const links: {
  /** The CMT submission site. Opens 4 December 2026 for the peer reviewed tracks. */
  submissions: string | null;
  /** The reviewer sign-up form. Needed well before the review period starts. */
  reviewerSignUp: string | null;
} = {
  submissions: null,
  reviewerSignUp:
    "https://docs.google.com/forms/d/e/1FAIpQLSeT8lwP7hdRN7QwTxhyjuPK_EZDy7XURpWXmhLIEj3y0iymPw/viewform",
};

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
      { label: "Submission instructions", href: "/call/submission-instructions" },
      { label: "Review for NIME", href: "/call/reviewing" },
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
      { label: "Conference map", href: "/visit/map" },
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
  juried: "Sunday 4 April 2027",
} as const;

export type ImportantDate = {
  date: string;
  label: string;
  kind: "deadline" | "event" | "info";
};

/**
 * From NIME Track Schedules.xlsx, which the general chairs confirmed is the
 * master schedule. Where the individual call documents disagree with these
 * dates, the schedule wins. All submission deadlines are 23:59 AoE.
 */
export const importantDates: ImportantDate[] = [
  { date: "26 October 2026", label: "Call for contributions published", kind: "info" },
  {
    /**
     * The calls say 4 December, the master schedule said the 14th. The
     * chairs' own call documents are the later word, so they win. If CMT
     * is not open that morning the chairs will hear about it, which is the
     * trade they chose.
     */
    date: "4 December 2026",
    label: "Submission system opens for the peer reviewed tracks",
    kind: "info",
  },
  {
    date: "Sunday 24 January 2027",
    label: "Peer reviewed — titles, abstracts and authors due",
    kind: "deadline",
  },
  {
    date: "Sunday 31 January 2027",
    label: "Peer reviewed — full submissions due",
    kind: "deadline",
  },
  { date: "Monday 8 — Sunday 28 February 2027", label: "Review period", kind: "info" },
  { date: "Friday 19 March 2027", label: "Peer reviewed decisions and reviews released", kind: "info" },
  { date: "March 2027", label: "Submission system opens for the juried tracks", kind: "info" },
  { date: "Sunday 4 April 2027", label: "Juried — submissions due", kind: "deadline" },
  { date: "Friday 30 April 2027", label: "Juried decisions released", kind: "info" },
  {
    /**
     * Two camera-ready dates, not one. The calls set each track's deadline
     * from its own decision date, so the peer reviewed tracks, decided in
     * March, close before the juried ones, decided at the end of April.
     */
    date: "Friday 30 April 2027",
    label: "Peer reviewed \u2014 camera-ready and presenter registration due",
    kind: "deadline",
  },
  {
    date: "Sunday 9 May 2027",
    label: "Juried \u2014 final materials and presenter registration due",
    kind: "deadline",
  },
  { date: "Monday 21 June 2027", label: "Fête de la musique", kind: "event" },
  {
    date: "Tuesday 22 June 2027",
    label: "Workshops, Doctoral Consortium, reception and opening concert",
    kind: "event",
  },
  { date: "Wednesday 23 — Friday 25 June 2027", label: "Main conference", kind: "event" },
];

export type Track = {
  title: string;
  href: string;
  /** Which of the two deadlines this track falls under. */
  group: "peer-reviewed" | "juried";
  blurb: string;
};

/**
 * The seven calls, in the organisers' own words. Note the grouping: three
 * tracks are peer reviewed and close in January, four are juried and close
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
    group: "juried",
    blurb:
      "Work that fosters critical dialogue about the field and its practices, or challenges established academic formats, conventions, and ways of presenting or sharing knowledge.",
  },
  {
    title: "Artifacts & Ideas",
    href: "/call/artifacts",
    group: "juried",
    blurb:
      "Works without an accompanying research paper, such as a DIY instrument presented as a demo, or a musical interaction concept presented as a poster.",
  },
  {
    title: "Workshops",
    href: "/call/workshops",
    group: "juried",
    blurb:
      "Shared activities, such as exploring collaborative live coding, discussing accessible music-making, or bringing NIME subcommunities together.",
  },
  {
    title: "Doctoral Consortium",
    href: "/call/doctoral-consortium",
    group: "juried",
    /**
     * Not PhD only. The call itself takes two categories, doctoral and
     * taught-degree students, so a summary naming only the PhD turns
     * away exactly the master's students it means to invite.
     */
    blurb:
      "Feedback on a developing doctoral or master's project from peers and senior mentors.",
  },
];

export type ConferenceDay = { date: string; weekday: string; items: string[] };

/**
 * The shape of the week, from the organisers' general schedule. Note that the
 * source spreadsheet dates these columns June 2026; that is a typo in their
 * file, the conference is 2027.
 */
export const conferenceWeek: ConferenceDay[] = [
  { date: "21 June", weekday: "Monday", items: ["Fête de la musique"] },
  {
    date: "22 June",
    weekday: "Tuesday",
    items: ["Workshops", "Doctoral Consortium", "Reception", "Concert"],
  },
  {
    date: "23 June",
    weekday: "Wednesday",
    items: ["Papers", "Demos", "Installations", "Concerts"],
  },
  {
    date: "24 June",
    weekday: "Thursday",
    items: ["Papers", "Demos", "Installations", "Concerts"],
  },
  {
    date: "25 June",
    weekday: "Friday",
    items: ["Papers", "Demos", "Installations", "Concerts"],
  },
];

/** The theme text, as the organisers wrote it in the Papers and Music calls. */
export const themeText = [
  "NIME 2027\u2019s theme, Sensorial Symbiosis, explores how musical expression emerges through relationships among performers, instruments, computational systems, environments, and audiences.",
  "How do bodies, instruments, machines, and environments shape one another? What forms of musical expression emerge when sensing, agency, and authorship move between people, materials, and machines? How can interfaces extend, substitute for, or reshape perception, or allow us to encounter traces across time?",
  "Each submission track approaches these questions through its own forms of contribution, presentation, review, and exchange.",
];
