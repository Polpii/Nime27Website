/**
 * Content for the interior pages.
 *
 * `body` uses a deliberately tiny markup dialect so that non-developers can
 * edit this file safely:
 *   "## Heading"   -> sub-heading
 *   "- item"       -> bullet (consecutive lines are grouped into one list)
 *   "> note"       -> highlighted TBC / provisional callout
 *   anything else  -> paragraph
 * Inline links: [label](https://example.com)
 */

export type PageContent = {
  slug: string;
  title: string;
  eyebrow?: string;
  intro?: string;
  body: string[];
};

const provisional =
  "> Placeholder text adapted from NIME 2026. The NIME 2027 committee will confirm the final wording and dates.";

export const pages: Record<string, PageContent> = {
  papers: {
    slug: "submissions/papers",
    title: "Call for Papers",
    eyebrow: "Submissions",
    intro:
      "We welcome submissions of original research on the scientific and artistic use of new interfaces for musical expression.",
    body: [
      provisional,
      "## Length classes",
      "Submissions are made in one of three length classes, counted excluding references:",
      "- **Long** — up to 6000 words",
      "- **Medium** — up to 4000 words",
      "- **Short** — up to 2000 words",
      "All length classes undergo the same review process, and all length classes are eligible for oral or poster presentation if accepted. Choose the class that fits the contribution rather than the one you think reviewers will reward.",
      "## Anonymity",
      "Submissions must be completely anonymised, including, but not limited to, authors, references, and specific project names that can clearly identify the author(s). Submissions that are not anonymised may be desk-rejected.",
      "## Originality",
      "Work cannot already be under review for publication elsewhere, or be submitted for a second review elsewhere while under review for NIME.",
      "## Review process",
      "Each paper submission will be assigned to at least three reviewers for evaluation. A meta-reviewer then synthesises the discussion and makes a recommendation, and the committee chairs determine final acceptance.",
      "Reviewing is double-blind: reviewers remain anonymous to the authors and vice-versa.",
      "## Contact",
      "Questions about paper submissions can be sent to the paper chairs at [papers@nime2027.org](mailto:papers@nime2027.org).",
    ],
  },

  music: {
    slug: "submissions/music",
    title: "Call for Music",
    eyebrow: "Submissions",
    intro:
      "Performances, installations and sound works that put new instruments in front of an audience.",
    body: [
      provisional,
      "The music programme is a core part of NIME, not a fringe to the research sessions. We invite submissions for concert performances, installations, and works that sit somewhere between the two.",
      "## Categories",
      "- **Concert works** — pieces for the evening concert programme, performed live",
      "- **Installations** — works exhibited across the conference venues for the duration of the conference",
      "- **Sound and listening works** — pieces designed for headphones, fixed media or specific listening conditions",
      "## What to submit",
      "- A programme note and technical description",
      "- Documentation of the work (audio or video)",
      "- A full technical rider, including stage plan and any hosting requirements",
      "- The names and roles of all performers",
      "Submissions are reviewed by the music committee on artistic merit, relevance to NIME, and feasibility within the conference venues.",
      "## Contact",
      "[music@nime2027.org](mailto:music@nime2027.org)",
    ],
  },

  workshops: {
    slug: "submissions/workshops",
    title: "Call for Workshops",
    eyebrow: "Submissions",
    intro:
      "Half- and full-day hands-on sessions, held on 22 June 2027, the day before the main programme opens.",
    body: [
      provisional,
      "Workshops are a chance to teach a technique, road-test a tool, or gather a sub-community around a shared problem. They take place the day before the main conference, alongside the Student Consortium.",
      "## Proposals should include",
      "- Title, abstract and intended audience",
      "- Format — half day or full day — and a rough schedule",
      "- Maximum and minimum number of participants",
      "- Space, equipment and technical requirements",
      "- Short biographies of the organisers",
      "- Any materials participants need to bring or install in advance",
      "## Selection",
      "Proposals are reviewed by the workshop chairs for relevance, feasibility and the diversity of the overall workshop programme.",
      "## Contact",
      "[workshops@nime2027.org](mailto:workshops@nime2027.org)",
    ],
  },

  "alt-nime": {
    slug: "submissions/alt-nime",
    title: "alt.nime",
    eyebrow: "Submissions",
    intro:
      "For contributions that do not fit anywhere else — and are more interesting for it.",
    body: [
      provisional,
      "alt.nime is the track for formats the other calls cannot accommodate: provocations, unconference sessions, listening sessions, games, interventions, failures worth discussing, and experiments in how a conference can meet.",
      "If you have been reading a call and thinking that your idea is not quite a paper, not quite a workshop and not quite a performance, this is the track for it.",
      "## What to submit",
      "- A description of the contribution and what happens during it",
      "- How long it needs and what kind of space it needs",
      "- How many people can take part",
      "- Why it belongs at NIME",
      "## Contact",
      "[altnime@nime2027.org](mailto:altnime@nime2027.org)",
    ],
  },

  "student-consortium": {
    slug: "submissions/student-consortium",
    title: "Student Consortium",
    eyebrow: "Submissions",
    intro:
      "A dedicated day for doctoral researchers to present work in progress and get feedback from senior mentors.",
    body: [
      provisional,
      "The Student Consortium takes place on 22 June 2027. It is aimed at doctoral students who have a defined research question but still have enough of their project ahead of them for feedback to change its direction.",
      "## Format",
      "Participants present their work to a small group of peers and mentors, and receive structured feedback. The day includes discussion sessions on research methods, writing and life after the doctorate.",
      "## What to submit",
      "- An extended abstract describing your research question, methods and progress so far",
      "- A short statement on what you hope to get out of the consortium",
      "- A letter of support from your supervisor",
      "## Contact",
      "[consortium@nime2027.org](mailto:consortium@nime2027.org)",
    ],
  },

  "student-volunteers": {
    slug: "submissions/student-volunteers",
    title: "Student Volunteers",
    eyebrow: "Submissions",
    intro:
      "Help run the conference, meet the community, and attend for a reduced registration fee.",
    body: [
      provisional,
      "Student volunteers keep NIME running: session chairing support, registration desk, concert set-up and strike, streaming, and helping delegates find the right room in an unfamiliar city.",
      "## What we ask",
      "- Availability for a set number of shifts across the conference",
      "- Attendance at a briefing before the conference opens",
      "- Enthusiasm at eight in the morning on the third day",
      "## What you get",
      "- A reduced registration fee",
      "- Access to the full conference programme outside your shifts",
      "- A short route into the community for anyone attending NIME for the first time",
      "Applications open with registration. Places are limited and allocated with attention to geographic and institutional diversity.",
      "## Contact",
      "[volunteers@nime2027.org](mailto:volunteers@nime2027.org)",
    ],
  },

  reviewing: {
    slug: "submissions/reviewing",
    title: "Reviewing",
    eyebrow: "Submissions",
    intro:
      "NIME depends on its reviewers. If you submit to the conference, please consider reviewing for it.",
    body: [
      provisional,
      "## Signing up",
      "Reviewer sign-up opens alongside the submission site. You will be asked for your areas of expertise so that submissions can be matched sensibly.",
      "## What reviewing involves",
      "- Typically two to four submissions per reviewer",
      "- A structured review form covering contribution, method, clarity and relevance",
      "- A discussion phase with the other reviewers and the meta-reviewer",
      "## Writing a useful review",
      "Say what the work contributes before saying what is missing. Be specific about what would change your assessment. Remember that a NIME submission may be an artistic contribution, an engineering contribution, a study, or all three — and should be judged on the terms it sets for itself.",
      "Reviewing is double-blind. Do not attempt to identify the authors, and declare any conflict of interest as soon as you spot one.",
      "## Contact",
      "[reviewing@nime2027.org](mailto:reviewing@nime2027.org)",
    ],
  },

  "camera-ready": {
    slug: "submissions/camera-ready",
    title: "Camera-Ready",
    eyebrow: "Submissions",
    intro:
      "Instructions for preparing the final version of an accepted contribution.",
    body: [
      provisional,
      "The camera-ready and presenter registration deadline is 29 April 2027. At least one author of each accepted contribution must be registered by this date for the work to appear in the proceedings.",
      "## Checklist",
      "- Address the reviewers' comments, and say briefly how you did so if asked to",
      "- De-anonymise the submission: add authors, affiliations and any references you withheld",
      "- Use the NIME 2027 template, unmodified",
      "- Check that all figures are legible in greyscale and have alternative text",
      "- Confirm the licence and copyright statement",
      "- Submit the final PDF and any accompanying media through the submission site",
      "## Proceedings",
      "NIME proceedings are open access and archived at [nime.org/papers](https://nime.org/papers/).",
      "## Contact",
      "[proceedings@nime2027.org](mailto:proceedings@nime2027.org)",
    ],
  },

  registration: {
    slug: "registration",
    title: "Registration",
    eyebrow: "Attend",
    intro:
      "Registration opens in early 2027. Rates, categories and the cancellation policy will be published here.",
    body: [
      provisional,
      "## Categories",
      "Registration will be offered in the following categories, with in-person and online rates for each:",
      "- Standard",
      "- Student",
      "- Reduced rate for delegates from countries where the standard fee is a barrier",
      "- Day pass",
      "- Workshop and Student Consortium day",
      "## What registration includes",
      "- Access to all conference sessions, posters and demos",
      "- Entry to the concert programme and installations",
      "- Refreshments during the conference days",
      "- Access to the online programme and recordings where authors have consented",
      "## Presenter registration",
      "At least one author of every accepted contribution must be registered by 29 April 2027 for the contribution to appear in the programme and the proceedings.",
      "## Financial support",
      "We intend to offer a limited number of fee waivers and travel bursaries, prioritising students and delegates who would otherwise be unable to attend. Details will be published with the registration rates.",
      "## Contact",
      "[registration@nime2027.org](mailto:registration@nime2027.org)",
    ],
  },

  programme: {
    slug: "programme",
    title: "Programme",
    eyebrow: "Conference",
    intro:
      "The full programme will be published after acceptance decisions in April 2027.",
    body: [
      provisional,
      "## Shape of the week",
      "- **Monday 21 June** — arrivals, informal meet-up",
      "- **Tuesday 22 June** — workshops and Student Consortium",
      "- **Wednesday 23 June** — conference opens: keynote, paper sessions, posters and demos, evening concert",
      "- **Thursday 24 June** — paper sessions, installations, evening concert",
      "- **Friday 25 June** — paper sessions, community meeting, closing and evening concert",
      "- **Saturday 26 June** — NIME Open Day, open to the public",
      "Once the programme is finalised, this section will offer a calendar view, a view by track and a view by session, plus a personal schedule you can export.",
      "## Hybrid participation",
      "All authors will have the option to present in person or online. Online sessions will be scheduled with attention to time zones rather than treated as an afterthought.",
    ],
  },

  keynotes: {
    slug: "programme/keynotes",
    title: "Keynotes",
    eyebrow: "Programme",
    intro: "Keynote speakers will be announced in early 2027.",
    body: [
      provisional,
      "NIME 2027 will host keynote talks and performances from figures whose work has shaped how instruments are designed, built, played and shared.",
      "Speakers will be announced here and on the NIME forum as they are confirmed.",
      "## Suggest a speaker",
      "The committee welcomes suggestions from the community, particularly for voices under-represented in previous NIME keynote programmes. Write to [programme@nime2027.org](mailto:programme@nime2027.org).",
    ],
  },

  committee: {
    slug: "committee",
    title: "Committee",
    eyebrow: "Organisation",
    intro:
      "NIME 2027 is organised by a local committee working with the international NIME steering committee.",
    body: [
      "> The committee list below is a structural placeholder. Names and affiliations will be filled in as roles are confirmed.",
      "## Local organising committee",
      "- General chairs — TBC",
      "- Local arrangements — TBC",
      "- Finance — TBC",
      "- Communications and web — TBC",
      "## Programme committee",
      "- Paper chairs — TBC",
      "- Music chairs — TBC",
      "- Workshop chairs — TBC",
      "- alt.nime chairs — TBC",
      "- Student Consortium chairs — TBC",
      "- Proceedings chairs — TBC",
      "- Diversity, equity and inclusion chairs — TBC",
      "- Accessibility chairs — TBC",
      "## Steering committee",
      "NIME is guided by an international steering committee. See [nime.org](https://nime.org) for its current membership.",
      "## Reviewers",
      "The full list of reviewers will be published after the review period closes, in recognition of the work involved.",
    ],
  },

  "satellite-events": {
    slug: "satellite-events",
    title: "Satellite Events",
    eyebrow: "Around the conference",
    intro:
      "Concerts, exhibitions and meet-ups happening in Paris around the conference week.",
    body: [
      provisional,
      "Paris has a dense calendar of experimental music, media art and research events in June. We will list satellite events here as they are confirmed, including work by partner institutions and by members of the NIME community who are in town.",
      "## The NIME Open Day",
      "On 26 June 2027 the conference opens to the public: instruments to try, installations to walk through, and short talks aimed at an audience with no prior connection to the field.",
      "## Propose an event",
      "If you are organising something in Paris that week and would like it listed, write to [satellite@nime2027.org](mailto:satellite@nime2027.org).",
    ],
  },

  visit: {
    slug: "visit",
    title: "Visit Paris",
    eyebrow: "Practical",
    intro:
      "Getting to the city, getting around it, and what to know before you arrive.",
    body: [
      provisional,
      "## Getting to Paris",
      "- **By air** — Paris is served by Charles de Gaulle (CDG), Orly (ORY) and Beauvais (BVA). CDG and Orly both connect to the city centre by rail",
      "- **By rail** — direct high-speed services reach Paris from London, Brussels, Amsterdam, Cologne, Frankfurt, Barcelona, Milan, Geneva and most French cities. For most European delegates the train is faster door-to-door than flying, and considerably lower-carbon",
      "- **Long-distance coach** — services arrive at Bercy-Seine and Porte Maillot",
      "We encourage delegates to travel by rail where it is a reasonable option.",
      "## Visas",
      "France is part of the Schengen Area. Depending on your nationality you may need a short-stay Schengen visa. Apply early: appointment waiting times can be long in peak season. Invitation letters for visa applications will be available to registered delegates.",
      "## Accommodation",
      "June is high season in Paris and rooms go quickly. We will list student residences, budget options and a small block booking here once registration opens. Book early.",
      "## Money and practicalities",
      "- Currency is the euro. Cards are accepted almost everywhere, contactless included",
      "- Tap water is safe to drink, and free drinking fountains are scattered across the city",
      "- Paris in late June is typically 17–26°C, occasionally hotter. Bring something for a warm evening and something for a sudden shower",
    ],
  },

  "get-around": {
    slug: "visit/get-around",
    title: "Get around",
    eyebrow: "Visit",
    intro: "Métro, RER, bus, tram, bike — and walking, which is often quicker.",
    body: [
      provisional,
      "## Public transport",
      "Paris and its region are covered by an integrated network of métro, RER commuter rail, tram and bus, run under the Île-de-France Mobilités umbrella. A single ticket covers the métro and bus network within the city, with transfers.",
      "- **Métro** — 16 lines, dense enough that most of central Paris is within 500 m of a station. Runs roughly 05:30 to 01:15, later at weekends",
      "- **RER** — faster regional lines crossing the city, useful for airports and for longer hops",
      "- **Bus and tram** — slower but above ground, and often the more pleasant way to cross the centre",
      "Contactless bank cards and phone wallets can be used directly at most barriers, and multi-day passes are available. We will publish specific recommendations for the conference venues nearer the time.",
      "## Cycling",
      "Paris has expanded its protected cycle network substantially, and the Vélib' public bike share has stations throughout the city and inner suburbs, including electric bikes. It is a genuinely good way to move between venues in June.",
      "## Walking",
      "Central Paris is small. Many journeys that look like a métro ride are a twenty-minute walk, and the walk is usually more interesting.",
      "## Accessibility of the network",
      "Step-free access on the historic métro is limited. The RER, tram and bus networks are considerably better served, and all city buses are accessible. See the [accessibility FAQ](/visit/accessibility) for route guidance to the conference venues.",
    ],
  },

  accessibility: {
    slug: "visit/accessibility",
    title: "Accessibility FAQ",
    eyebrow: "Visit",
    intro:
      "What we are committing to, what we are still working on, and how to tell us what you need.",
    body: [
      provisional,
      "NIME seeks to bring together an outstanding worldwide community, open to all people regardless of age, nationality, ethnicity, gender identity, sexual orientation or disability status. Accessibility is part of that commitment rather than an add-on to it.",
      "## Will the venues be step-free?",
      "Step-free access to all conference and concert spaces is a requirement in our venue selection. Detailed access information — entrances, lifts, accessible toilets, and routes from the nearest accessible transport — will be published for each venue once confirmed.",
      "## Will sessions be captioned?",
      "We intend to provide live captioning for keynotes and main-room sessions, and to make captioned recordings available to registered delegates where authors consent. Requests for sign language interpretation should reach us as early as possible.",
      "## Will there be a quiet space?",
      "Yes. A low-stimulus room will be available throughout the conference, away from the main circulation areas.",
      "## What about the concerts?",
      "Concert programmes will carry advance notice of high volume levels, strobe and flashing light, and haptic intensity. Ear protection will be available. Seating will be reserved at each concert for delegates who need it.",
      "## I have a requirement that is not listed here",
      "Please write to [access@nime2027.org](mailto:access@nime2027.org). We would much rather hear about a barrier in January than discover it in June.",
    ],
  },
};
