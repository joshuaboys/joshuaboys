# joshuaboys.github.io

**Aneki's Software Shack** — a hand-curated index of my public projects.
Live at <https://joshuaboys.github.io>.

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and copy |
| `styles.css` | All styling — CRT grid, scanlines, neon cards |
| `projects.js` | **The inventory.** The only file you edit to add or drop a project |
| `app.js` | Renders the inventory into the page |
| `assets/` | Social icons |
| `.nojekyll` | Tells Pages to serve the files as-is, no Jekyll build |

Static HTML, CSS, and vanilla JS. No build step, no dependencies, no trackers.

## Adding a project

Open `projects.js` and add an entry to `FEATURED` (the big cards) or
`BACK_ROOM` (the compact list):

```js
{
  name: 'thing',
  href: 'https://github.com/joshuaboys/thing',
  lang: 'Rust',
  tags: ['cli', 'agents'],
  blurb: 'One or two sentences. Present tense.',
  status: 'live',        // 'live' | 'wip' | 'cold'
}
```

Commit and push to `main`. Pages redeploys in about a minute.

## Working on it locally

Everything is same-origin and script-tag loaded, so `open index.html`
works straight off the filesystem. If you'd rather serve it:

```sh
python3 -m http.server 8000
```

## Deployment

GitHub Pages serves the default branch of this repo at the account root
because the repo is named `joshuaboys.github.io`. Settings → Pages →
*Deploy from a branch* → `main` / `/ (root)`.
