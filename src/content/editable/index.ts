/**
 * The text of the pages that are not markdown documents.
 *
 * The home page and the call overview are layouts, not prose: a logo, a date,
 * a grid of cards. Handing a chair one big markdown box for either of them
 * would be handing them the chance to delete the page. So their words live in
 * a small JSON file each, and the studio shows one labelled box per piece of
 * text. The studio rebuilds the JSON itself, so an edit cannot produce an
 * invalid file.
 *
 * The theme is its own file because both pages show it and they must not be
 * able to drift apart.
 */

import callJson from "./call.json";
import homeJson from "./home.json";
import themeJson from "./theme.json";

export const theme: { name: string; paragraphs: string[] } = themeJson;
export const home: {
  saveTheDate: string;
  themeLabel: string;
  about: string;
  callNoticeLead: string;
  callOpens: string;
} = homeJson;
export const call: {
  intro: string;
  themeNote: string;
  peerReviewedNote: string;
  juriedNote: string;
  elsewhere: string;
  reviewHeading: string;
  reviewBody: string;
  reviewSignUp: string;
} = callJson;

/** How one piece of text is shown and stored. */
export type Field = {
  key: string;
  label: string;
  /** One line under the box, in the chairs' terms, not ours. */
  hint?: string;
  /** "line" is a single input, "text" a box, "list" a box split on blank lines. */
  kind: "line" | "text" | "list";
};

export type FieldsPage = {
  /** The file under src/content/editable, and the key used in the studio URL. */
  file: string;
  title: string;
  /** Where to look at the result. */
  slug: string;
  intro: string;
  fields: Field[];
};

/**
 * Everything the studio needs to render and save these pages. A key that is
 * not in this list is never written, so the form is also the allow-list.
 */
export const fieldsPages: Record<string, FieldsPage> = {
  "home-page": {
    file: "home.json",
    title: "Home page",
    slug: "",
    intro: "The front page. The dates, the city and the logo are set elsewhere, so they are not here.",
    fields: [
      {
        key: "saveTheDate",
        label: "Line above the logo",
        hint: "Shown in small capitals. Three or four words.",
        kind: "line",
      },
      { key: "themeLabel", label: "Word above the theme", kind: "line" },
      {
        key: "about",
        label: "What NIME is",
        hint: "The paragraph near the bottom of the page.",
        kind: "text",
      },
      {
        key: "callNoticeLead",
        label: "Last line of the page",
        hint: "The date below is added at the end of this sentence, and a full stop after it.",
        kind: "line",
      },
      {
        key: "callOpens",
        label: "When the call is published",
        hint: "Shown highlighted at the end of the line above. For example: early November 2026.",
        kind: "line",
      },
    ],
  },

  "call-overview": {
    file: "call.json",
    title: "Call overview",
    slug: "call",
    intro: "The page that lists every track. The track names and their one-line descriptions are set elsewhere.",
    fields: [
      {
        key: "intro",
        label: "Opening lines, under the title",
        kind: "text",
      },
      {
        key: "themeNote",
        label: "Note under the theme",
        kind: "text",
      },
      {
        key: "peerReviewedNote",
        label: "What peer review means",
        hint: "Shown under the Peer reviewed heading, above those three tracks.",
        kind: "text",
      },
      {
        key: "juriedNote",
        label: "What juried means",
        hint: "Shown under the Juried heading, above those four tracks.",
        kind: "text",
      },
      {
        key: "elsewhere",
        label: "Where to find the shared steps",
        hint: "The line after the tracks. Links are written [like this](/call/key-dates).",
        kind: "text",
      },
      { key: "reviewHeading", label: "Heading of the reviewing section", kind: "line" },
      { key: "reviewBody", label: "Why we need reviewers", kind: "text" },
      { key: "reviewSignUp", label: "How to sign up", kind: "text" },
    ],
  },

  "conference-theme": {
    file: "theme.json",
    title: "Conference theme",
    slug: "call",
    intro: "Shown on the home page and at the top of the call overview. Editing it here changes both.",
    fields: [
      { key: "name", label: "Theme name", kind: "line" },
      {
        key: "paragraphs",
        label: "The theme, explained",
        hint: "Leave a blank line between paragraphs. The home page shows the first one only.",
        kind: "list",
      },
    ],
  },
};
