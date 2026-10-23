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
    slug: "call/papers",
    title: "Call for Papers",
    eyebrow: "Call",
    intro:
      "Original research on the scientific and artistic use of new interfaces for musical expression.",
    body: [
      "> The chairs are still finalising this call, and the submission link does not exist yet. The deadlines on the [key dates](/programme) page are being confirmed: the call document and the planning schedule currently disagree by a week.",
      "Papers is one of the three peer reviewed tracks. We welcome submissions of original research on the scientific and artistic use of new interfaces for musical expression.",
      "## Length",
      "Full papers must be between **2,000 and 6,000 words**. The count covers the main text, including section headings, figure and table captions, and footnotes. It excludes the title, abstract and references.",
      "## Template and language",
      "- Use the NIME 2027 paper template, in LaTeX (Overleaf) or Word, and submit a PDF",
      "- Papers must be written in English",
      "## Anonymisation",
      "Review is double-blind. Remove author names, affiliations, acknowledgments, funding details, and identifying project names, links and repositories.",
      "## Publication",
      "Accepted papers are published on [nime.org](https://nime.org/papers/), each with a DOI, under a CC BY 4.0 licence. Papers that are not presented are not published.",
      "## Mentorship",
      "Authors new to NIME can be paired with an experienced member through the NIME mentorship programme.",
      "## Contact",
      "[papers@nime2027.org](mailto:papers@nime2027.org)",
    ],
  },

  music: {
    slug: "call/music",
    title: "Call for Music / Performance",
    eyebrow: "Call",
    intro:
      "Performances and installations that showcase new interfaces for musical expression in composition, performance and sound art.",
    body: [
      "> The chairs are still finalising this call, and the submission link does not exist yet. The deadlines on the [key dates](/programme) page are being confirmed: the call document and the planning schedule currently disagree by a week.",
      "We look forward to receiving work that expands and reshapes our understanding of NIME in the conceptualisation, performance and reception of music. Submissions may be existing works or proposals for new ones, and there are no limitations or requirements concerning musical style.",
      "## Categories",
      "- **Live (in person) performance** — at least one performer is present at NIME. A live work may also involve an online connection to an artist who is not present, provided the technical requirements are fully documented and approved by the chairs",
      "- **Remote (pre-recorded) performance** — no author attends in person, and the work is presented as a pre-recorded video with a live Q&A where possible",
      "- **Installation** — physical works for foyer, room or gallery spaces, and virtual works that exist online",
      "Typical NIME performances last 5 to 15 minutes. Shorter and longer proposals will be considered, and where a longer work is accepted the chairs may ask for a shorter version.",
      "## What to submit",
      "All music submissions must include a PDF using the NIME music template, with these sections: Program Notes, Project Description, Technical Notes, Media Links, Acknowledgements (optional), Ethical Standards, References.",
      "- Images and diagrams as needed, so reviewers understand the work and how it might be staged",
      "- Video that documents or otherwise communicates the proposed work, as a link or as supplementary material",
      "Submissions without an appropriate PDF including the sections above may not be reviewed.",
      "## Anonymisation",
      "We ask for **soft anonymisation**. Author names should not appear in the PDF, the video documentation, or account names linked from submissions. You do not have to blur or obscure faces in videos or images.",
      "## If your work is accepted",
      "Accepted artists are expected to be available to perform on any day of the conference, unless otherwise agreed with the chairs. Accepted work is published on the conference website and on nime.org as part of the Music Proceedings.",
      "The organisers cannot provide funding to support travel or accommodation for performers.",
      "## Contact",
      "[music@nime2027.org](mailto:music@nime2027.org)",
    ],
  },

  workshops: {
    slug: "call/workshops",
    title: "Call for Workshops",
    eyebrow: "Call",
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
    slug: "call/alt-nime",
    title: "alt.nime",
    eyebrow: "Call",
    intro:
      "A space for contributions that question, challenge, or expand what NIME can be.",
    body: [
      "> The chairs are still finalising this call, and the submission link does not exist yet. The deadlines on the [key dates](/programme) page are being confirmed: the call document and the planning schedule currently disagree by a week.",
      "Building on the experimental spirit of alt.nime 2026 and the heritage of alt.chi, alt.nime welcomes work that may not fit comfortably within conventional academic categories. Not because it is unfinished, but because it deliberately proposes a different way of contributing to NIME.",
      "alt.nime is a place where it is legitimate to take a position. Contributions may be personal, situated, political, activist, speculative or provocative. They do not need to perform neutrality. We expect contributors to situate their positions, engage critically with their implications, and create opportunities for meaningful discussion rather than provocation for its own sake.",
      "## What might a contribution do?",
      "alt.nime is format agnostic. What matters is not the form a contribution takes, but the questions it raises, the perspectives it brings, and the discussions it opens up.",
      "A contribution might bring practices, questions, methods or forms of knowledge from communities and disciplines that rarely appear at NIME. It can also turn the conference itself, its formats, institutions, assumptions, infrastructures, exclusions or habits, into an object of inquiry or intervention.",
      "## What alt.nime is not",
      "Experimental practice on its own is not an alt.nime contribution without an added element inviting meaningful discussion. That work belongs in [Artifacts & Ideas](/call/artifacts).",
      "## Submission format",
      "Submissions may be exclusively textual or take other forms and media, but all must include a PDF using the alt.nime template with these fields: Title, Abstract, Ethical Statement and References.",
      "- **alt.nime Statement** — why this contribution is relevant to alt.nime",
      "- **Presentation Specification** — the format, materials and how you intend to present it. The final form is decided in dialogue with the jury and the chairs",
      "Text-only submissions may extend beyond the mandatory fields up to **6,000 words**, excluding references and the ethical statement. Supplemental or non-textual submissions may be up to eight A4 pages or the equivalent, or around 15 minutes for audio-visual work.",
      "## Reviewing",
      "alt.nime continues the open, collaborative **alt.reviewing** process from NIME 2026. Rather than conventional academic assessment, reviewing takes the form of a curatorial process: an opportunity to engage deeply with the ideas raised.",
      "Each contribution is reviewed by members of a jury, who are encouraged to formulate situated, constructive and critical responses. Disagreement is welcome, provided it is grounded. Authors and jurors are invited into dialogue during the review period, and with the consent of authors parts of that discussion may be opened on the NIME forum.",
      "## Contact",
      "[alt.nime@nime2027.org](mailto:alt.nime@nime2027.org)",
    ],
  },

  "doctoral-consortium": {
    slug: "call/doctoral-consortium",
    title: "Doctoral Consortium",
    eyebrow: "Call",
    intro:
      "Feedback from the NIME community on the conceptual, theoretical, technical and musical components of your research.",
    body: [
      "> The chairs are still finalising this call, and the submission link does not exist yet. The deadlines on the [key dates](/programme) page are being confirmed: the call document and the planning schedule currently disagree by a week.",
      "The Consortium takes place as a **half-day session on 22 June 2027**. Peers and senior researchers, interaction designers and computer musicians are mixed together for an open discussion of NIME-related work.",
      "Ideal candidates are early-stage or mid-way into their project, presenting concrete research content within the NIME topics but with no conclusive results yet. Candidates should explain clearly what they bring to the Consortium and what they expect to get from it.",
      "## Two categories",
      "- PhD students",
      "- Undergraduate and graduate students",
      "## What to submit",
      "A document of at most **5,000 words**, excluding the bibliography, containing:",
      "- Title and keywords",
      "- Research question(s)",
      "- Related work: context and theories",
      "- Methods",
      "- Expected outcomes: what you hope to contribute and to gain",
      "- References",
      "You may also include software, video and audio recordings, blueprints documenting interface concepts and prototypes, and a short recommendation letter from your supervisor clarifying your year of study and research objectives.",
      "## Publication",
      "Final papers for the Doctoral Consortium are **not** published in the NIME proceedings.",
      "## Contact",
      "[student-consortium@nime2027.org](mailto:student-consortium@nime2027.org)",
    ],
  },


  reviewing: {
    slug: "call/reviewing",
    title: "Reviewing",
    eyebrow: "Call",
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
    slug: "call/camera-ready",
    title: "Camera-Ready",
    eyebrow: "Call",
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

  installations: {
    slug: "call/installations",
    title: "Call for Art / Installations",
    eyebrow: "Call",
    intro:
      "Artworks, such as an interactive sound sculpture or a room that responds musically to visitors.",
    body: [
      "> The chairs are still finalising this call, and the submission link does not exist yet. The deadlines on the [key dates](/programme) page are being confirmed: the call document and the planning schedule currently disagree by a week.",
      "Art / Installations is one of the three peer reviewed tracks. Installations can be physical works exhibited in foyer, room or gallery space, as well as virtual works that exist online.",
      "## The theme",
      "In line with the NIME 2027 theme of **Sensorial Symbiosis**, we encourage proposals that explore the novel relationships amongst bodies, instruments, machines, environments and audiences in musical interaction; shared agency and authorship across performers and machines; interfaces that extend, substitute or reshape perception; and works that engage with traces across time.",
      "We particularly welcome submissions from ensembles, compositions that integrate NIMEs with acoustic instruments, and collaborative projects exploring how human and machine sensing shape shared musical experiences.",
      "## What to submit",
      "- A PDF using the NIME template, covering the project description and technical notes",
      "- Images and diagrams showing the work and how it would be installed",
      "- Video documentation, as a link or as supplementary material",
      "- Space, power, light, sound and network requirements, and whether the work can be left unattended",
      "## Anonymisation",
      "As with Music, we ask for soft anonymisation: no author names in the PDF, the documentation or linked account names. You do not need to obscure faces.",
      "## Contact",
      "[installations@nime2027.org](mailto:installations@nime2027.org)",
    ],
  },

  artifacts: {
    slug: "call/artifacts",
    title: "Call for Artifacts & Ideas",
    eyebrow: "Call",
    intro:
      "Practice-based work without an accompanying research paper: a DIY instrument presented as a demo, or a musical interaction concept presented as a poster.",
    body: [
      "> The chairs are still finalising this call, and the submission link does not exist yet. The deadlines on the [key dates](/programme) page are being confirmed: the call document and the planning schedule currently disagree by a week.",
      "The track welcomes well-developed projects (**Artifacts**) and theoretical insights (**Ideas**) that represent substantial creative, technical or experimental contributions, but are not necessarily framed as conventional academic papers. It provides a space for work whose significance lies primarily in its design, implementation, functionality or creative possibilities.",
      "We welcome instrument makers, musicians, artists, designers, developers and researchers from within and beyond academia. Contributions may emerge from individual practice, community initiatives, independent workshops, educational settings or companies.",
      "Contributions should go beyond preliminary demonstrations or early-stage concepts, presenting consolidated, functioning artifacts that embody a clearly articulated idea. Projects need not be commercially polished, but should show a meaningful degree of development and practical realisation.",
      "## What to submit",
      "- **Title and abstract** — a brief introduction to the contribution",
      "- **Description of the work** — what it does, how it is used, and the idea it embodies",
      "- **Development and contribution** — its current state, the experimentation behind it, and what it offers to musical interaction",
      "- **Documentation** — images, diagrams, audio or video. Where relevant, show the artifact functioning",
      "- **Presentation specification** — space, equipment, power, sound, setup, access and safety requirements",
      "- **Ethical statement** and **references**",
      "Repository links and build documentation are strongly encouraged but optional. Contributors who cannot provide an open repository are welcome to submit.",
      "## Selection",
      "Jurors provide brief assessments and the chairs make the final decisions. There is no paper-style meta-review. The criteria are the creative or technical contribution, practical realisation, relevance to NIME, the value of the knowledge shared, and the clarity and feasibility of the proposed presentation.",
      "## Publication",
      "Accepted submissions are preserved on the conference website as a record of acceptance. Artifacts & Ideas contributions are **not** included in the main proceedings and do not receive a conference-issued DOI. Contributors who want a DOI may deposit their work in another repository.",
      "## Contact",
      "[artifacts@nime2027.org](mailto:artifacts@nime2027.org)",
    ],
  },
};
