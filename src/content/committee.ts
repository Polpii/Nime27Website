/**
 * The organising committee.
 *
 * ONLY people recorded as Confirmed in the committee sheet appear here, with
 * one deliberate exception noted below. Several roles are still vacant
 * (Proceedings, Registration, CMT, Student Volunteers, local and venue chairs)
 * and are listed as such rather than hidden, so the gaps are visible to anyone
 * who might fill them.
 *
 * Never publish anyone marked Invited, Proposed, Interested or declined: an
 * invitation is not an acceptance, and two people have already declined.
 */

export type Member = { name: string; affiliation?: string };
export type CommitteeGroup = {
  title: string;
  members: Member[];
  vacancies?: number;
  /** The track address, where one exists. Groups without a chair have none. */
  email?: string;
};

export const committee: CommitteeGroup[] = [
  {
    title: "General chairs",
    email: "general-chairs@nime2027.org",
    members: [
      { name: "Xiao Xiao", affiliation: "IFT, DVHE / MIT Media Lab" },
      { name: "Sofy Yuditskaya", affiliation: "IIM, DVHE" },
      { name: "Paul Strohmeier", affiliation: "MPI-INF" },
    ],
  },
  {
    title: "Papers",
    email: "papers@nime2027.org",
    members: [
      { name: "Akito Van Troyer", affiliation: "Berklee College of Music" },
      { name: "Lauren Hayes", affiliation: "Arizona State University" },
      { name: "Enrique Tomás", affiliation: "Tangible Music Lab, University of Arts Linz" },
    ],
  },
  {
    title: "Music / Performance",
    email: "music@nime2027.org",
    members: [
      { name: "Meg Schedel", affiliation: "Stony Brook University" },
      { name: "Christophe d'Alessandro", affiliation: "Sorbonne Université" },
      { name: "Manaswi Mishra", affiliation: "MIT Media Lab" },
    ],
  },
  {
    title: "Art / Installations",
    email: "installations@nime2027.org",
    members: [
      { name: "David Ramsay", affiliation: "DePaul University" },
      { name: "Mirna Zordan", affiliation: "SUSTech" },
      { name: "Marc Downie", affiliation: "University of Chicago" },
    ],
  },
  {
    title: "alt.nime",
    email: "alt.nime@nime2027.org",
    members: [
      // Emilien is "onboarding sent" in the sheet rather than Confirmed, but he
      // and Tove both stated publicly that the three of them chair alt.nime.
      { name: "Tove Grimstad Bang", affiliation: "IRCAM" },
      { name: "Théo Jourdan", affiliation: "IRCAM" },
      { name: "Emilien Ghomi" },
    ],
  },
  {
    title: "Concert",
    members: [{ name: "Bartélémy Belleudy", affiliation: "Krema Collective" }],
    vacancies: 1,
  },
  {
    title: "Artifacts & Ideas",
    email: "artifacts@nime2027.org",
    members: [
      { name: "Nicolò Merendino" },
      { name: "Kazuhiro Jo" },
      // Not in the sheet, which still shows this third seat as vacant under
      // another name. Paul asked for her by name in the chairs' channel, and
      // a general chair asking is the one thing that overrides the sheet.
      { name: "Astrid Bin" },
    ],
  },
  {
    title: "Workshops",
    email: "workshops@nime2027.org",
    members: [{ name: "Lea Schirp" }],
    vacancies: 2,
  },
  {
    title: "Doctoral Consortium",
    email: "student-consortium@nime2027.org",
    members: [
      { name: "Martin Kaltenbrunner", affiliation: "Tangible Music Lab, University of Arts Linz" },
      { name: "Sarah Nabi", affiliation: "IRCAM" },
    ],
  },
  {
    title: "Awards",
    members: [{ name: "Stefania Serafin", affiliation: "DTU" }],
  },
  {
    title: "Accessibility & Family",
    email: "access@nime2027.org",
    members: [{ name: "Rébecca Kleinberger", affiliation: "Northeastern University" }],
    vacancies: 1,
  },
  {
    title: "Hybrid",
    members: [
      { name: "Leo Mercier", affiliation: "IRCAM" },
      { name: "Balthazar Bujard", affiliation: "IRCAM" },
    ],
  },
  {
    title: "Design",
    members: [
      { name: "Ziyue Piao", affiliation: "McGill University" },
      { name: "Jian Gao", affiliation: "University of British Columbia" },
    ],
  },
  {
    title: "Web",
    members: [{ name: "Paul-Peter Arslan", affiliation: "De Vinci Higher Education" }],
  },
];

/** Roles with nobody appointed yet. Shown so the gaps are findable. */
export const vacantRoles = [
  "Proceedings",
  "Registration",
  "CMT",
  "Student Volunteers",
  "Local and venue chairs",
  "Kids programme",
];
