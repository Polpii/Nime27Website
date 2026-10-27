# Call text from the chairs

Drop a chair's markdown file in this folder and it becomes the page. The file
name is the page key used in `src/content/pages.ts`, so `papers.md` becomes
`/call/papers` and `doctoral-consortium.md` becomes `/call/doctoral-consortium`.

A file here **replaces** the title, the standfirst and the whole body of that
page. Nothing is merged, so whatever the chairs send is exactly what is
published. If there is no file for a page, the text in `pages.ts` is used.

## The format

Ordinary markdown. Write it as you would anywhere else.

```md
# Call for Papers

One sentence of introduction, which becomes the standfirst under the title.

## Length

Full papers must be between **2,000 and 6,000 words**.

## Template

- Use the NIME 2027 template
- Papers must be written in English

> Anything in a blockquote is shown as an orange TBC box, so use it for
> things that are not settled yet.
```

What is supported: headings (the first `#` is the page title, `##` and `###`
become sub-headings, anything deeper is flattened to `###`), paragraphs that
soft-wrap across lines, bullet and numbered lists, blockquotes, horizontal
rules, pipe tables, `**bold**`, `*italic*`, `` `code` `` and
`[links](https://example.com)`. Internal links start with a slash, like
`[key dates](/programme)`.

What is not: images, nested lists (they are flattened to one level), and HTML.

## Page keys

Run `npm run content` to see every page, its key, and whether it is backed by
a file here or still carries placeholder text.
