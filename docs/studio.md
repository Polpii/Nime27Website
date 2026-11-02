# The studio

A password-gated page at `/studio` where the general chairs edit the text of
the site themselves, in a browser, with no GitHub account and nothing to
install.

## How it works

Every page of the site that carries prose is backed by a markdown file in
`src/content/calls/`, and `getPage()` prefers that file over `pages.ts`. The
studio reads those files from the GitHub API, shows one in a text box, and
commits the edit back to the preview branch. Vercel sees the commit and
rebuilds, so the change is on the preview about a minute later.

Edits never land on `main`. Publishing stays a deliberate merge by whoever is
doing the publishing.

## Switching it on

Two environment variables, both set in the Vercel project (Settings →
Environment Variables), for every environment:

| Name | What it is |
| --- | --- |
| `STUDIO_PASSWORD` | The shared password given to the three general chairs. Make it long; it is the only thing standing in front of the editor. |
| `STUDIO_GITHUB_TOKEN` | A GitHub fine-grained personal access token, scoped to this repository alone, with **Contents: Read and write**. Nothing else. |

Two more are optional and default to this repository and the preview branch:

| Name | Default |
| --- | --- |
| `STUDIO_REPO` | `Polpii/Nime27Website` |
| `STUDIO_BRANCH` | `preview/full-site` |

Until both required variables are set, `/studio` says it is not switched on
and does nothing else.

### Making the token

GitHub → Settings → Developer settings → Personal access tokens → Fine-grained
tokens → Generate new token. Resource owner: your own account. Repository
access: only `Nime27Website`. Permissions: Repository permissions → Contents →
Read and write. Set an expiry you are willing to renew; the studio stops
working the day it lapses, which is the intended failure.

## What it is not

A shared password is not accounts. Everyone who has it is the same person as
far as the repository is concerned, so the commit records the name the editor
typed on the way in, and that name is not verified. The trade is that three
people can edit the site without signing up to anything, and every save is an
ordinary commit on a branch, so anything can be read back or undone.

## What is not editable yet

The home page, the calls overview and the committee list are built from
`site.ts` and `committee.ts` rather than from markdown, so they are not in the
studio. Moving them would mean giving those files the same markdown treatment
the pages got.
