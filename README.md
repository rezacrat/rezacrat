# rezacrat — portfolio site

A recolored, restructured build of the MHD portfolio template — same dark/minimal
theme and interactions, adapted for a short-form editor's brand and workflow.

## What changed from the original design, and why

- **Color:** the accent went from green (`#4bd200`) to blue (`#005bd2` / hover
  `#2e7dff`) — same saturation and lightness as the original, hue rotated to
  blue, so it reads exactly as "clean and premium" as the original did.
- **Fonts kept as-is:** Space Grotesk (headlines/brand) + DM Sans (body) — this
  pairing already does the "modern, minimal, slightly technical" job well for
  a motion/editing brand; changing it would work against the look you asked
  to preserve, so I left it alone.
- **Numbering removed** from the project cards (the `01 / 02` badge) — per
  your call, and also because numbered badges are only meaningful when
  content is a sequence, which a portfolio grid isn't.
- **Captions added** under each project, Instagram/YouTube-style: two lines,
  then a "more" button that expands the full text. You write these yourself
  per project — see `projects-data.js`.
- **Video previews autoplay with no click needed** (same as the original —
  muted, looped, plays when scrolled into view). Clicking still opens the
  larger modal player.
- **About page rewritten** for your actual positioning (short-form editing
  for people who teach — coaches, consultants, course creators), using Alex
  Hormozi's SPCL framework (Status / Power / Credibility / Likeness) as the
  lens: it leads with a specific hook the reader self-identifies with, names
  the actual mechanism (finding where a lesson hooks and where it loses
  people) instead of vague claims, names your real tools as credibility, and
  stays in first person so it still sounds like you, not a template. No
  invented stats or client numbers are in there — add real ones yourself
  once you have them.
- **Two CTAs side by side:** "DM on Instagram" (solid, primary — matches how
  you actually generate leads today) and "Book a call" (outlined, secondary).

## File structure

```
rezacrat-site/
├── index.html          → Work page (loads style.css, projects-data.js, app.js)
├── about/index.html    → About page (same files, one level up)
├── style.css           → all styling
├── app.js              → all behavior (routing, video logic, cursor effect, captions)
├── projects-data.js     → ← THE ONLY FILE YOU NEED TO TOUCH TO ADD/EDIT PROJECTS
└── media/               → put your .mp4 and .webp files here
```

## Adding or changing a project (your "editing panel")

Open `projects-data.js`. Each project is one block:

```js
{
  title: "Client name or project name",
  file: "media/your-clip.mp4",
  poster: "media/your-clip.webp",
  caption: "Whatever you want a viewer to read — the brief, your process, tools used."
}
```

To add a project: copy a block, paste it inside the `[ ]`, fill it in, commit,
push. To remove one: delete its block. Nothing else needs to change.

### Getting your video files ready
- Keep them 16:9, reasonably compressed (a few MB each, not 50+) so the grid
  loads fast.
- Generate a poster image (the frame shown before it plays) with `ffmpeg`:
  ```
  ffmpeg -i media/your-clip.mp4 -ss 00:00:01 -vframes 1 media/your-clip.webp
  ```
  (pick a timestamp — `-ss 00:00:01` — that lands on a good-looking frame)

## Before you go live, fill in two things in `app.js`

Near the top of `app.js`:

```js
const INSTAGRAM_URL = "https://www.instagram.com/rezacrat/"; // confirm this is right
const BOOKING_EMBED_URL = ""; // paste your Calendly/Google Calendar *appointment schedule* embed link here
```

Until `BOOKING_EMBED_URL` is filled in, the "Book a call" button opens a
dialog that just tells you to add it — it won't be broken/blank, just a
reminder.

## Testing locally

From inside the `rezacrat-site` folder:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Check both the Work page and
`http://localhost:8000/about/`.

## Deploying to GitHub Pages

1. Create a new repo (e.g. `rezacrat-site`) and push these files to it:
   ```
   git init
   git add .
   git commit -m "portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/rezacrat-site.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment → Source:**
   `Deploy from a branch` → Branch: `main`, folder `/ (root)` → **Save**.
3. Your site goes live at `https://YOUR-USERNAME.github.io/rezacrat-site/`
   after a couple of minutes.

All paths in this build are **relative**, not hardcoded to a repo name (the
original template hardcoded `/Mhd-Labs/...`), so this works under any repo
name or a custom domain without editing anything else.

## Custom domain (optional)

If you have your own domain, add it under **Settings → Pages → Custom
domain**, then point your domain's DNS at GitHub Pages per their docs.
