/**
 * Site content.
 *
 * CONFIRMED facts and PLACEHOLDERS are both here, but they are not equal:
 * anything marked `TBC` below is carried over from NIME 2026 or extrapolated,
 * and is rendered on the page inside a <Provisional> callout so no reader can
 * mistake it for a decision. See TBC.txt for the full audit.
 *
 * Confirmed so far: the name, the dates, Paris, and that the call for papers
 * and participation is published in October 2026.
 */

export const conference = {
  name: "NIME 2027",
  fullName: "New Interfaces for Musical Expression",
  /** nime.org's own wording for the conference series. */
  seriesName: "The International Conference on",
  /** TBC — the edition number has never been published by NIME itself. */
  number: "The International Conference on",
  dates: "22–25 June 2027",
  datesShort: "22–25 JUN 2027",
  city: "Paris",
  country: "France",
  location: "Paris, France",
  /** Announced by nime.org. The exact site and address are still TBC. */
  host: "Devinci Higher Education",
  /** When the call for papers and participation is published. */
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
      { label: "Music", href: "/call/music" },
      { label: "Workshops", href: "/call/workshops" },
      { label: "alt.nime", href: "/call/alt-nime" },
      { label: "Student Consortium", href: "/call/student-consortium" },
      { label: "Student Volunteers", href: "/call/student-volunteers" },
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

export type ImportantDate = {
  date: string;
  label: string;
  kind: "deadline" | "event" | "info";
};

/**
 * TBC — every date except the conference itself is extrapolated one year
 * forward from NIME 2026. Note that nime.org announces 21–25 June for the
 * conference while the organisers gave 22–25; that discrepancy is unresolved.
 */
export const importantDates: ImportantDate[] = [
  { date: "October 2026", label: "Call for papers and participation published", kind: "info" },
  { date: "December 2026", label: "Submission site opens", kind: "info" },
  { date: "February 2027", label: "Papers & Music — submissions due", kind: "deadline" },
  { date: "March 2027", label: "Workshops, alt.nime & Student Consortium due", kind: "deadline" },
  { date: "April 2027", label: "Acceptance decisions and reviews released", kind: "info" },
  { date: "April 2027", label: "Camera-ready and presenter registration deadline", kind: "deadline" },
  { date: "22–25 June 2027", label: "Conference", kind: "event" },
];

export const tracks = [
  {
    title: "Papers",
    href: "/call/papers",
    blurb:
      "Original research on the scientific and artistic use of new interfaces for musical expression, in long, medium and short length classes.",
  },
  {
    title: "Music",
    href: "/call/music",
    blurb:
      "Performances, installations and sound works that put new instruments in front of an audience across the conference venues.",
  },
  {
    title: "Workshops",
    href: "/call/workshops",
    blurb:
      "Half- and full-day hands-on sessions run on the day before the main conference programme opens.",
  },
  {
    title: "alt.nime",
    href: "/call/alt-nime",
    blurb:
      "Formats that do not fit anywhere else: provocations, unconferences, listening sessions, experiments in how we meet.",
  },
  {
    title: "Student Consortium",
    href: "/call/student-consortium",
    blurb:
      "A dedicated day for doctoral researchers to present work in progress and get feedback from senior mentors.",
  },
  {
    title: "Student Volunteers",
    href: "/call/student-volunteers",
    blurb:
      "Help run the conference, meet the community and attend for a reduced registration fee.",
  },
];
