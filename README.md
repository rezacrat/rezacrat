# rezacrat — portfolio site

Live at: https://rezacrat.github.io/rezacrat/

A recolored, restructured build of the MHD portfolio template — dark/minimal
theme, adapted for a short-form editor's brand, workflow, and actual
positioning (short-form editing for people who teach online).

## What's new in this update

**Real bugs fixed (things that were actually broken):**
- The "more" button under a caption was showing even on one-line captions
  that didn't need it. Cause: `-webkit-line-clamp` makes the browser report
  `scrollHeight` equal to `clientHeight` always, so the old overflow check
  never worked. Fixed by briefly lifting the clamp to measure the caption's
  true full height, then restoring it.
- That same "more" button, even when correctly marked hidden in code, was
  still rendering — a CSS rule (`display: inline-block`) was overriding the
  browser's native `[hidden]` behavior. Added an explicit
  `.caption-toggle[hidden] { display: none; }` rule.
- Caption overflow was being measured before the web font finished loading,
  so it could measure against the fallback font and get the wrong line
  count. Now waits for `document.fonts.ready` first.
- A missing/unreachable video file (like project 4 right now) used to leave
  a plain blank/black box. It now gets a `.is-empty` class with a subtle
  gradient treatment instead, so a missing file reads as a placeholder, not
  a broken page.

**Design/content changes:**
- The identical "Educational Content Editing" tag repeated under all 6
  cards was removed — repeating the same label on every card read as
  templated. It's now a single subtitle next to "Selected work" instead.
- Video modal now opens at the **video's own native size** (bounded by the
  viewport) instead of a forced 16:9 box — a vertical Reel opens tall, a
  widescreen edit opens wide. Pure CSS (`width/height: auto` + max caps), no
  JS measuring needed, so it can't drift out of sync.
- The modal now shows the project's real caption under the title instead of
  a generic tag — reuses content you're already writing per project.
- Header tagline changed from a listy "Reels · TikTok · Shorts" to
  "Editing for people who teach online" — reads like something a person
  wrote, not a template placeholder.
- Added a "How it actually works" 3-step section to the About page (send
  the lesson → I cut for retention → you get something to post) — this is
  a trust/transparency addition: a stranger deciding whether to book a call
  can see exactly what happens before committing.
- Missing-video/poster placeholders now use a subtle radial gradient
  instead of flat near-black, so an incomplete project card looks
  intentional rather than broken.

**SEO/technical additions** (so the link looks right when shared on
Instagram, and shows up properly in search):
- Open Graph + Twitter Card meta tags on both pages (title/description/image)
- `<link rel="canonical">` on both pages
- JSON-LD structured data (`ProfessionalService` on the Work page, `Person`
  on the About page)
- `robots.txt` and `sitemap.xml` at the repo root

## Two things you still need to add

1. **`media/og-cover.jpg`** — a 1200×630px image. This is what shows up as
   the preview image when someone shares your site link on Instagram,
   iMessage, Twitter, etc. Without it, some platforms show a blank/generic
   preview. Any clean still from your work (or a simple branded card) works.
2. **The missing media files** — as of this update, `media/4.mp4` and the
   video/poster files for projects 5 and 6 aren't uploaded yet, and no
   `.webp` poster exists for any of the 6 projects. See "Getting your video
   files ready" below.

## File structure

```
rezacrat-site/
├── index.html          → Work page (loads style.css, projects-data.js, app.js)
├── about/index.html    → About page (same files, one level up)
├── style.css           → all styling
├── app.js              → all behavior (routing, video logic, cursor effect, captions)
├── projects-data.js    → ← THE ONLY FILE YOU NEED TO TOUCH TO ADD/EDIT PROJECTS
├── robots.txt          → tells search engines they can index the site
├── sitemap.xml         → lists the site's pages for search engines
└── media/              → put your .mp4, .webp, and og-cover.jpg files here
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
- Keep them at their natural aspect ratio (16:9 widescreen or 9:16 vertical
  both work now — the modal adapts). Compress to a few MB each, not 50+, so
  the grid loads fast.
- Generate a poster image (the frame shown before it plays) with `ffmpeg`:
  ```
  ffmpeg -i media/your-clip.mp4 -ss 00:00:01 -vframes 1 media/your-clip.webp
  ```
  (pick a timestamp — `-ss 00:00:01` — that lands on a good-looking frame)
- Double-check the filename in `projects-data.js` matches the actual
  uploaded filename exactly, including case (`media/4.mp4` ≠ `media/4.MP4`).

## The two links in `app.js`

Near the top of `app.js` — already filled in on the live site, listed here
for reference:

```js
const INSTAGRAM_URL = "https://www.instagram.com/rezacrat/";
const BOOKING_EMBED_URL = "https://calendar.google.com/calendar/appointments/schedules/...";
```

If you ever need to change your Instagram handle or regenerate your booking
link, this is the only place to update it.

## Testing locally

From inside the `rezacrat-site` folder:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` and `http://localhost:8000/about/`. Open
DevTools (F12) → Console to check for any red errors before pushing.

## Deploying updates

The site is already live and deployed via GitHub Pages (Settings → Pages →
Deploy from a branch → `main` → `/ (root)`). To update it:

1. Edit the file(s) that changed (directly on GitHub, or locally + git push)
2. Commit
3. Wait ~1-2 minutes for the Actions tab to show a green deploy
4. Hard-refresh the live site (Ctrl+Shift+R / Cmd+Shift+R)

## Custom domain (optional)

If you get your own domain, add it under **Settings → Pages → Custom
domain**, point your domain's DNS at GitHub Pages per their docs, then
update the URLs in `index.html`, `about/index.html`, `robots.txt`, and
`sitemap.xml` from `rezacrat.github.io/rezacrat` to your new domain.
