/**
 * The text of the pages that are not markdown documents.
 *
 * Two kinds live here. Some pages are a layout with named pieces of text in
 * it, like the home page. Others are a table: the key dates, the committee,
 * the week, the contact addresses. Handing a chair one big markdown box for
 * any of them would be handing them the chance to delete the page, so each
 * one gets a form instead, and the studio rebuilds the JSON itself from the
 * fields it knows. An edit cannot produce a file the site fails to read.
 *
 * The theme is its own file because the home page and the call overview both
 * show it and they must not be able to drift apart.
 */

import callJson from "./call.json";
import committeeJson from "./committee.json";
import contactJson from "./contact.json";
import homeJson from "./home.json";
import keyDatesJson from "./key-dates.json";
import programmeJson from "./programme.json";
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

export const keyDates: {
  intro: string;
  rows: { date: string; label: string; kind: string }[];
} = keyDatesJson;

export const programme: {
  weekNote: string;
  /** One activity per line, because a table cell holding a list is still a cell. */
  days: { weekday: string; date: string; items: string }[];
} = programmeJson;

export const contact: {
  intro: string;
  addresses: { role: string; email: string }[];
  stayNote: string;
} = contactJson;

export const committeeData: {
  /** One row per person. The group column is what puts them in a section. */
  people: { group: string; email: string; name: string; affiliation: string }[];
  openPlaces: { group: string; places: string }[];
  vacantRoles: string[];
} = committeeJson;

/* ------------------------------------------------------------- the schema */

/** One column of a table field. */
export type Column = {
  key: string;
  label: string;
  /** "lines" is a small box whose lines become separate items. */
  kind: "line" | "lines" | "choice";
  /** For "choice" only. The first is used when a row arrives with nothing. */
  options?: string[];
  /** Roughly how much of the row this column should take. */
  span?: 1 | 2 | 3;
};

/** How one piece of text is shown and stored. */
export type Field = {
  key: string;
  label: string;
  /** One line under the box, in the chairs' terms, not ours. */
  hint?: string;
  /**
   * "line" is a single input, "text" a box, "list" a box split on blank
   * lines, "lines" a box with one item per line, and "rows" a table the
   * chair can add to, reorder and delete from.
   */
  kind: "line" | "text" | "list" | "lines" | "rows";
  /** For "rows" only. */
  columns?: Column[];
  /** For "rows" only: shown on the button that adds one. */
  rowNoun?: string;
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
    intro:
      "The front page. The dates, the city and the logo are set elsewhere, so they are not here.",
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
        label: "Highlighted end of that line",
        hint: "Shown highlighted at the end of the line above. For example: later in November 2026.",
        kind: "line",
      },
    ],
  },

  "call-overview": {
    file: "call.json",
    title: "Call overview",
    slug: "call",
    intro:
      "The page that lists every track. The track names and their one-line descriptions are set elsewhere.",
    fields: [
      { key: "intro", label: "Opening lines, under the title", kind: "text" },
      { key: "themeNote", label: "Note under the theme", kind: "text" },
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
    intro:
      "Shown on the home page and at the top of the call overview. Editing it here changes both.",
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

  "key-dates": {
    file: "key-dates.json",
    title: "Key dates",
    slug: "call/key-dates",
    intro:
      "Every date the conference publishes. These are the facts people plan their year around, so change them from the schedule rather than from memory. The order here is the order on the page.",
    fields: [
      { key: "intro", label: "Opening lines, under the title", kind: "text" },
      {
        key: "rows",
        label: "The dates",
        rowNoun: "date",
        kind: "rows",
        columns: [
          { key: "date", label: "When", kind: "line", span: 1 },
          { key: "label", label: "What", kind: "line", span: 2 },
          {
            key: "kind",
            label: "Kind",
            kind: "choice",
            options: ["deadline", "event", "info"],
            span: 1,
          },
        ],
      },
    ],
  },

  committee: {
    file: "committee.json",
    title: "Committee",
    slug: "committee",
    intro:
      "One row per person. People sharing a group name appear together, in the order they are listed here, and the first address given for a group is the one shown. Only add someone who has accepted: an invitation is not an acceptance, and a name published by mistake is a thing done to a person.",
    fields: [
      {
        key: "people",
        label: "The committee",
        rowNoun: "person",
        kind: "rows",
        columns: [
          { key: "group", label: "Group", kind: "line", span: 1 },
          { key: "email", label: "Group address", kind: "line", span: 1 },
          { key: "name", label: "Name", kind: "line", span: 1 },
          { key: "affiliation", label: "Affiliation", kind: "line", span: 2 },
        ],
      },
      {
        key: "openPlaces",
        label: "Places still open in a group",
        hint: "Only for groups that have someone in them already. Leave the table empty if there are none.",
        rowNoun: "group",
        kind: "rows",
        columns: [
          { key: "group", label: "Group", kind: "line", span: 2 },
          { key: "places", label: "How many", kind: "line", span: 1 },
        ],
      },
      {
        key: "vacantRoles",
        label: "Roles with nobody in them yet",
        hint: "One per line.",
        kind: "lines",
      },
    ],
  },

  programme: {
    file: "programme.json",
    title: "Programme",
    slug: "programme",
    intro: "The shape of the conference week. One card per day, in this order.",
    fields: [
      { key: "weekNote", label: "Note under the heading", kind: "text" },
      {
        key: "days",
        label: "The week",
        rowNoun: "day",
        kind: "rows",
        columns: [
          { key: "weekday", label: "Day", kind: "line", span: 1 },
          { key: "date", label: "Date", kind: "line", span: 1 },
          { key: "items", label: "What happens (one per line)", kind: "lines", span: 2 },
        ],
      },
    ],
  },

  contact: {
    file: "contact.json",
    title: "Contact",
    slug: "contact",
    intro:
      "Only list addresses that exist. One that bounces is worse than none, so a role with no chair yet should not be here at all.",
    fields: [
      { key: "intro", label: "Opening lines, under the title", kind: "text" },
      {
        key: "addresses",
        label: "Who to write to",
        rowNoun: "address",
        kind: "rows",
        columns: [
          { key: "role", label: "For what", kind: "line", span: 1 },
          { key: "email", label: "Address", kind: "line", span: 2 },
        ],
      },
      { key: "stayNote", label: "Under 'Stay informed'", kind: "text" },
    ],
  },
};
