/**
 * The organising committee.
 *
 * The list itself now lives in src/content/editable/committee.json, where the
 * general chairs edit it in the studio, one row per person. This file only
 * turns those rows back into the groups the page renders: people sharing a
 * group name are gathered in the order they appear, and the first address
 * given for a group is the one shown.
 *
 * The rule that used to live here as a comment nobody reading the studio
 * would ever see is now the first thing on the studio's own committee form:
 * only publish someone who has accepted, because an invitation is not an
 * acceptance and a name published by mistake is a thing done to a person.
 */

import { committeeData } from "./editable";

export type Member = { name: string; affiliation?: string };
export type CommitteeGroup = {
  title: string;
  members: Member[];
  vacancies?: number;
  /** The track address, where one exists. Groups without a chair have none. */
  email?: string;
};

function buildGroups(): CommitteeGroup[] {
  const byTitle = new Map<string, CommitteeGroup>();

  for (const row of committeeData.people) {
    const title = row.group.trim();
    if (title === "" || row.name.trim() === "") continue;

    let group = byTitle.get(title);
    if (!group) {
      group = { title, members: [] };
      byTitle.set(title, group);
    }
    // The first address given for a group wins, so correcting one row is
    // enough and a blank in a later row does not wipe it.
    if (!group.email && row.email.trim() !== "") group.email = row.email.trim();

    const member: Member = { name: row.name.trim() };
    if (row.affiliation.trim() !== "") member.affiliation = row.affiliation.trim();
    group.members.push(member);
  }

  for (const open of committeeData.openPlaces) {
    const group = byTitle.get(open.group.trim());
    const places = Number.parseInt(open.places, 10);
    if (group && Number.isFinite(places) && places > 0) group.vacancies = places;
  }

  return [...byTitle.values()];
}

export const committee: CommitteeGroup[] = buildGroups();

/** Roles with nobody appointed yet. Shown so the gaps are findable. */
export const vacantRoles: string[] = committeeData.vacantRoles;
