/*
  This is your editing panel.
  To add a new project: copy one block below, paste it above the closing "]",
  and fill in your own values. To remove one, delete its block.

  - title    → shown under the video
  - file     → path to your video, relative to this file (drop the .mp4 in /media)
  - poster   → the thumbnail image shown before the video loads/plays
               (export a .webp/.jpg frame from your own video — see README)
  - tag      → the small grey label next to the title (kept the same for all
               projects right now: "Educational Content Editing" — change the
               constant in app.js if you want one label for everyone, or add
               a "tag" field per project here if you want it to vary)
  - caption  → the expandable text under the project (like an IG/YouTube
               caption). Write as much as you want — it truncates to 2 lines
               with a "more" button automatically. Put your process notes,
               tools used, the brief, whatever you want a client to read.
*/

window.PROJECTS = [
  {
    title: "Project title 1",
    file: "media/1.mp4",
    poster: "media/project-1.webp",
    caption: "Write the story of this edit here — the brief, what you changed, why it works. This is your space, not mine."
  },
  {
    title: "Project title 2",
    file: "media/2.mp4",
    poster: "media/project-2.webp",
    caption: "Second project caption goes here."
  },
  {
    title: "Project title 3",
    file: "media/3.mp4",
    poster: "media/project-3.webp",
    caption: "Third project caption goes here."
  },
  {
    title: "Project title 4",
    file: "media/4.mp4",
    poster: "media/project-4.webp",
    caption: "Fourth project caption goes here."
  },
  {
    title: "Project title 5",
    file: "media/project-5.mp4",
    poster: "media/project-5.webp",
    caption: "Fifth project caption goes here."
  },
];
