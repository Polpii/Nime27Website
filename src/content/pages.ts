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

export const pages: Record<string, PageContent> = {
  papers: {
    slug: "call/papers",
    title: "Call for Papers",
    eyebrow: "Call",
    intro:
      "Original research on the scientific and artistic use of new interfaces for musical expression.",
    body: [
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
      "[general-chairs@nime2027.org](mailto:general-chairs@nime2027.org)",
    ],
  },

  music: {
    slug: "call/music",
    title: "Call for Music / Performance",
    eyebrow: "Call",
    intro:
      "Performances and installations that showcase new interfaces for musical expression in composition, performance and sound art.",
    body: [
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
      "Shared activities, such as exploring collaborative live coding, discussing accessible music-making, or bringing NIME subcommunities together.",
    body: [
      "Workshops take place on **Tuesday 22 June 2027**, the day before the main conference opens, alongside the Doctoral Consortium. The call will be published soon.",
      "For questions about workshops, contact the workshop chairs at [workshops@nime2027.org](mailto:workshops@nime2027.org).",
    ],
  },

  "alt-nime": {
    slug: "call/alt-nime",
    title: "alt.nime",
    eyebrow: "Call",
    intro:
      "A space for contributions that question, challenge, or expand what NIME can be.",
    body: [
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
      "NIME depends on volunteers. Whatever you submit, please also [sign up to review](/call/reviewing).",
    ],
  },


  reviewing: {
    slug: "call/reviewing",
    title: "Review for NIME 2027",
    eyebrow: "Call",
    intro:
      "NIME runs on volunteer reviewers. If you submit to the conference, please sign up to review for it.",
    body: [
      "Every peer reviewed submission gets three reviews from peer experts and a meta review from an experienced member of the NIME community. That only works if enough people volunteer, so we ask everyone who submits to review as well.",
      "## What we ask for",
      "The form takes a couple of minutes. It asks for:",
      "- Your name and affiliation",
      "- An email address we can reach you on",
      "- Your areas of expertise, so submissions can be matched sensibly",
      "Your details are used to run the review process and are not published. Reviewers are credited as a list of names after reviewing closes, unless you ask us not to, and you can ask the general chairs to show or delete what we hold about you.",
      "## When reviewing happens",
      "For the peer reviewed tracks, Papers, Music / Performance and Art / Installations, the review period runs from **Monday 8 February to Sunday 28 February 2027**, with decisions released on 19 March.",
      "The juried tracks review between **Monday 5 April and Monday 26 April 2027**, though this varies a little from track to track.",
      "Expect a handful of submissions and a structured form covering the contribution, the method, the clarity and the relevance to NIME.",
      "## Contact",
      "[general-chairs@nime2027.org](mailto:general-chairs@nime2027.org)",
    ],
  },

  registration: {
    slug: "registration",
    title: "Registration",
    eyebrow: "Attend",
    intro: "Registration opens in early 2027.",
    body: [
      "Rates, categories and the cancellation policy will be published here.",
    ],
  },

  keynotes: {
    slug: "programme/keynotes",
    title: "Keynotes",
    eyebrow: "Programme",
    intro: "Keynote speakers will be announced in early 2027.",
    body: [
      "## Suggest a speaker",
      "The committee welcomes suggestions from the community, particularly for voices under-represented in previous NIME keynote programmes. Write to [general-chairs@nime2027.org](mailto:general-chairs@nime2027.org).",
    ],
  },

  "satellite-events": {
    slug: "satellite-events",
    title: "Satellite Events",
    eyebrow: "Around the conference",
    intro:
      "Concerts, exhibitions and meet-ups happening in Paris around the conference week.",
    body: [
      "Paris has a dense calendar of experimental music, media art and research events in June. We expect to list work by partner institutions and by members of the NIME community who are in town, and events will be added here as they are confirmed.",
      "## Propose an event",
      "If you are organising something in Paris that week and would like it listed, write to [general-chairs@nime2027.org](mailto:general-chairs@nime2027.org).",
    ],
  },

  visit: {
    slug: "visit",
    title: "Visit Paris",
    eyebrow: "Practical",
    intro:
      "Getting to the city, getting around it, and what to know before you arrive.",
    body: [
      "## Getting to Paris",
      "- **By air** — Paris is served by Charles de Gaulle (CDG), Orly (ORY) and Beauvais (BVA). CDG and Orly both connect to the city centre by rail",
      "- **By rail** — direct high-speed services reach Paris from London, Brussels, Amsterdam, Cologne, Frankfurt, Barcelona, Milan, Geneva and most French cities. For most European delegates the train is faster door-to-door than flying, and considerably lower-carbon",
      "- **Long-distance coach** — services arrive at Bercy-Seine and Porte Maillot",
      "We encourage delegates to travel by rail where it is a reasonable option.",
      "## Visas",
      "France is part of the Schengen Area. Depending on your nationality you may need a short-stay Schengen visa. Apply early, because appointment waiting times can be long in peak season.",
      "If you need an invitation letter for a visa application, write to [general-chairs@nime2027.org](mailto:general-chairs@nime2027.org). How these are issued is still being arranged, so ask early rather than close to your appointment.",
      "## Accommodation",
      "June is high season in Paris and rooms go quickly, so book early. Whether the conference will arrange a block booking or negotiated rates is not decided yet. Accommodation guidance will be published here once registration opens.",
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
      "What is settled, what is not, and how to tell us what you need.",
    body: [
      "NIME seeks to bring together an outstanding worldwide community, open to all people regardless of age, nationality, ethnicity, gender identity, sexual orientation or disability status. Accessibility is part of that commitment rather than an add-on to it.",
      "NIME 2027 has an accessibility chair, so there is someone whose job this is. You can raise an access requirement now, long before registration opens, and it will reach them.",
      "## What we can tell you now",
      "- The conference is hosted at Campus du Parc in Nanterre, west of Paris. Access details for each space will be published on the [conference map](/visit/map) once the rooms are allocated",
      "- Step-free access on the historic Paris métro is limited, while the RER, tram and bus networks are much better served and every city bus is accessible. See [get around](/visit/get-around)",
      "## Tell us what you need",
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

  "submission-instructions": {
    slug: "call/submission-instructions",
    title: "Submission instructions",
    eyebrow: "Call",
    intro:
      "How to prepare and upload a submission, in one place, for every track.",
    body: [
      "This page will be published before the submission system opens on 4 December 2026. It covers the parts that are the same whichever track you submit to: making an account on the submission system, the templates, how to anonymise a submission, how to upload supplementary media, and how to change a submission before the deadline.",
      "Until then, the requirements specific to each track are in its own call:",
      "- [Papers](/call/papers)",
      "- [Music / Performance](/call/music)",
      "- [Art / Installations](/call/installations)",
      "- [alt.nime](/call/alt-nime)",
      "- [Artifacts & Ideas](/call/artifacts)",
      "- [Workshops](/call/workshops)",
      "- [Doctoral Consortium](/call/doctoral-consortium)",
      "## Deadlines",
      "The two deadlines and everything that hangs off them are on the [call overview](/call) and in [key dates](/programme).",
      "## Contact",
      "If something is unclear and this page does not answer it yet, write to [general-chairs@nime2027.org](mailto:general-chairs@nime2027.org).",
    ],
  },

  map: {
    slug: "visit/map",
    title: "Conference map",
    eyebrow: "Visit",
    intro:
      "Where everything happens on site: rooms, concert spaces, installations and demos.",
    body: [
      "The site plan is not drawn yet. It will be published here once the room allocation is settled, and because it matters most to people submitting installations and demos, it will be up before the juried deadline on Sunday 4 April 2027.",
      "## The venue",
      "NIME 2027 is hosted by **Devinci Higher Education** at **Campus du Parc**, 29 Allée le Corbusier, 92000 Nanterre, just west of Paris.",
      "## What the map will show",
      "- Paper sessions and keynote rooms",
      "- Concert and performance spaces",
      "- Installation and demo areas, with their power and network points",
      "- Registration, catering and the quiet room",
      "- Step-free routes and accessible toilets",
      "- The nearest stations and how long the walk is",
      "## Submitting an installation or a demo",
      "If you are planning a work that needs particular space, power, light, sound or network conditions, describe those requirements in your submission rather than waiting for the map. The chairs match works to spaces, not the other way round. See the [Art / Installations](/call/installations) and [Artifacts & Ideas](/call/artifacts) calls.",
      "## Getting to the campus",
      "Campus du Parc sits in the Paris La Défense business district, on the edge of the parc André Malraux. The venue describes it as close to two regional rail lines:",
      "- **RER E** at **Nanterre La Folie**, the line's western terminus",
      "- **RER A**, which runs from central Paris through La Défense",
      "Both connect to the centre of Paris in around twenty minutes. Exact walking routes and times from each station will be published here with the site plan, because the campus is new and opened only in late 2026.",
      "Travel into Paris and around the city is covered on [Visit Paris](/visit) and [Get around](/visit/get-around).",
    ],
  },
};
