const pagePath = location.pathname.replace(/\/$/, "");
const isAbout = pagePath.endsWith("/about");
const serviceLine = "Short-form edits for online educators";
const projects = window.PROJECTS || [];

const workIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>';
const aboutIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></svg>';
const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 8 5-8 5Z"/></svg>';
const closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
const arrowIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';

// ---- EDIT THESE TWO LINES with your real links ----
const INSTAGRAM_URL = "https://www.instagram.com/rezacrat/";
const BOOKING_EMBED_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0aeoI-y-MW3hjiJDjZG8ovY3lCsjLP90xoLe8cdyIS4jDyedGo2o9mO4NhVQlQTTt0xOc_SxMR?gv=true";
// ----------------------------------------------------

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

const projectCards = projects.map((project, index) => `
  <article class="project">
    <button class="project-open" type="button" data-project="${index}" aria-label="Play ${escapeHTML(project.title)}">
      <span class="art" id="art-${index}">
        <video class="project-video" data-index="${index}" muted loop playsinline preload="metadata" poster="${project.poster}" aria-hidden="true">
          <source src="${project.file}" type="video/mp4">
        </video>
        <span class="play-indicator">${playIcon}</span>
      </span>
    </button>
    <div class="project-info">
      <div class="project-meta">
        <h2>${escapeHTML(project.title)}</h2>
      </div>
      <div class="project-caption">
        <p class="caption-text" id="caption-${index}">${escapeHTML(project.caption || "")}</p>
        <button class="caption-toggle" type="button" data-caption-toggle="${index}" hidden>more</button>
      </div>
    </div>
  </article>
`).join("");

const workPage = `
  <main class="work">
    <div class="section-label">
      <div>
        <h1>Selected work</h1>
        <p class="section-sub">${serviceLine}</p>
      </div>
      <span class="count">01 — ${String(projects.length).padStart(2, "0")}</span>
    </div>
    <div class="grid">${projectCards}</div>
  </main>
  <dialog class="video-dialog" id="projectPlayer" aria-labelledby="projectTitle">
    <button class="dialog-close" id="closePlayer" type="button" aria-label="Close video">${closeIcon}</button>
    <div class="dialog-video-wrap">
      <video class="dialog-video" id="fullVideo" controls playsinline></video>
    </div>
    <div class="dialog-meta">
      <h2 id="projectTitle"></h2>
      <p id="projectCaption"></p>
    </div>
  </dialog>
`;

const aboutPage = `
  <main class="about">
    <p class="eyebrow">A little about me</p>
    <h1>You know the lesson.<br><span>I make people watch it.</span></h1>
    <div class="about-lower">
      <div>
        <p class="bio">I'm <strong>Reza</strong> — I edit short-form video for people who teach for a living: coaches, consultants, and course creators. My job isn't just cutting clips together — it's finding where your lesson actually hooks, cutting the parts that lose people, and pacing the rest so someone who's never heard of you stays to the end.<br><br>I work mostly in Premiere, After Effects, and DaVinci Resolve — captions, pacing, motion, sound design, all of it — so you can hand me a raw lesson and get back something built to be watched, not just posted.</p>
        <p class="tools">Premiere Pro &nbsp; / &nbsp; After Effects &nbsp; / &nbsp; DaVinci Resolve</p>
      </div>
      <div class="call-area">
        <p>Have a lesson sitting in your camera roll?<br>Let's turn it into something people finish watching.</p>
        <div class="cta-row">
          <a class="call-button" id="dmButton" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer">DM on Instagram ${arrowIcon}</a>
          <button class="call-button secondary" id="book" type="button" aria-haspopup="dialog" aria-controls="booking">Book a call ${arrowIcon}</button>
        </div>
      </div>
    </div>
    <div class="how-it-works">
      <h2>How it actually works</h2>
      <div class="how-steps">
        <div class="how-step">
          <span class="step-number">01</span>
          <h3>Send me the raw lesson</h3>
          <p>A screen recording, a Zoom call, a phone clip — whatever you've already got. No need to shoot anything special first.</p>
        </div>
        <div class="how-step">
          <span class="step-number">02</span>
          <h3>I cut it for retention</h3>
          <p>I watch it once as a stranger would, then edit for where people actually drop off — not just where it looks good.</p>
        </div>
        <div class="how-step">
          <span class="step-number">03</span>
          <h3>You get something to post</h3>
          <p>Captions, pacing, sound — done. You review it, ask for tweaks if needed, and it's ready to go up.</p>
        </div>
      </div>
    </div>
  </main>
  <dialog class="booking-dialog" id="booking" aria-labelledby="bookingTitle">
    <div class="booking-header">
      <h2 id="bookingTitle">Pick a time</h2>
      <button class="booking-close" id="closeBooking" type="button" aria-label="Close booking calendar">${closeIcon}</button>
    </div>
    ${BOOKING_EMBED_URL
      ? `<iframe class="booking-frame" src="${BOOKING_EMBED_URL}" title="Book a call with Reza" loading="lazy" frameborder="0"></iframe>`
      : `<div class="booking-frame" style="display:flex;align-items:center;justify-content:center;background:#101010;color:#777;font-size:14px;text-align:center;padding:30px;">
           Add your Calendly or Google Calendar link in <code>app.js</code> (BOOKING_EMBED_URL) to make this button work.
         </div>`
    }
  </dialog>
`;

document.querySelector("#app").innerHTML = `
  <header>
    <a class="brand" href="${isAbout ? "../" : "./"}" aria-label="rezacrat home">rezacrat<span>.</span></a>
    <div class="header-note"><span>Reza</span>Editing for people who teach online</div>
  </header>
  ${isAbout ? aboutPage : workPage}
  <nav class="bottom-nav" aria-label="Main navigation">
    <a href="${isAbout ? "../" : "./"}" class="${!isAbout ? "active" : ""}" ${!isAbout ? 'aria-current="page"' : ""}>${workIcon}Work</a>
    <a href="${isAbout ? "./" : "about/"}" class="${isAbout ? "active" : ""}" ${isAbout ? 'aria-current="page"' : ""}>${aboutIcon}About</a>
  </nav>
`;

// ---- caption truncate/expand (Instagram/YouTube-style "more") ----
function setupCaptionToggles() {
  document.querySelectorAll(".caption-toggle").forEach((button) => {
    const index = button.dataset.captionToggle;
    const textEl = document.querySelector(`#caption-${index}`);
    if (!textEl) return;

    // With -webkit-line-clamp active, scrollHeight reports the same value as
    // clientHeight (the clamp already limits layout, not just paint), so the
    // usual scrollHeight > clientHeight check never fires. Instead: read the
    // clamped height, briefly lift the clamp to measure the true full height,
    // then put it back, a one-frame, invisible measurement.
    const clampedHeight = textEl.clientHeight;
    textEl.style.setProperty("-webkit-line-clamp", "unset");
    textEl.style.display = "block";
    const fullHeight = textEl.scrollHeight;
    textEl.style.removeProperty("-webkit-line-clamp");
    textEl.style.removeProperty("display");

    const isOverflowing = fullHeight > clampedHeight + 1;
    button.hidden = !isOverflowing;
    if (!isOverflowing || button.dataset.bound) return;

    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const expanded = textEl.classList.toggle("expanded");
      button.textContent = expanded ? "less" : "more";
    });
  });
}

if (!isAbout) {
  // measure only after the real font has loaded, measuring against the
  // fallback font first can give a wrong line-count that flips once
  // Space Grotesk/DM Sans swap in, showing/hiding "more" incorrectly
  const measureCaptions = () => requestAnimationFrame(() => requestAnimationFrame(setupCaptionToggles));
  if (document.fonts?.ready) {
    document.fonts.ready.then(measureCaptions).catch(measureCaptions);
  } else {
    measureCaptions();
  }
  window.addEventListener("resize", () => {
    document.querySelectorAll(".caption-text.expanded").forEach((el) => el.classList.remove("expanded"));
    document.querySelectorAll(".caption-toggle").forEach((btn) => { btn.textContent = "more"; });
    setupCaptionToggles();
  });
}

// ---- halftone cursor effect ----
const setupHalftoneCursor = () => {
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!hasFinePointer || prefersReducedMotion) return;

  const canvas = document.createElement("canvas");
  canvas.className = "cursor-halftone";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) {
    canvas.remove();
    return;
  }

  let width = window.innerWidth;
  let height = window.innerHeight;
  let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  let frame = 0;
  let strength = 0;
  let targetStrength = 0;
  let pointerActive = false;
  let textRects = [];
  const surfaceSelector = "a, button, dialog, .bottom-nav";
  const textSelector = [
    ".header-note",
    ".section-label h1",
    ".section-label .section-sub",
    ".section-label .count",
    ".project-meta h2",
    ".caption-text",
    ".eyebrow",
    ".about h1",
    ".bio",
    ".how-step h3",
    ".how-step p",
    ".tools",
    ".call-area p",
  ].join(", ");
  const current = { x: width / 2, y: height / 2 };
  const target = { x: current.x, y: current.y };

  const measureTextRects = () => {
    textRects = [];
    document.querySelectorAll(textSelector).forEach((element) => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let textNode = walker.nextNode();

      while (textNode) {
        if (textNode.textContent.trim()) {
          const range = document.createRange();
          range.selectNodeContents(textNode);
          [...range.getClientRects()].forEach((rect) => {
            if (rect.width > 0 && rect.height > 0) {
              textRects.push({
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
              });
            }
          });
        }
        textNode = walker.nextNode();
      }
    });
  };

  const isOverText = (x, y) => textRects.some((rect) => (
    x >= rect.left
    && x <= rect.right
    && y >= rect.top
    && y <= rect.bottom
  ));

  const updateTargetStrength = (x, y, element) => {
    const targetElement = element instanceof Element ? element : null;
    const isOverInterface = targetElement?.closest(surfaceSelector)
      || isOverText(x, y)
      || document.querySelector("dialog[open]");
    targetStrength = isOverInterface ? 0 : 1;
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const scheduleDraw = () => {
    if (!frame) frame = requestAnimationFrame(draw);
  };

  const draw = () => {
    frame = 0;
    current.x += (target.x - current.x) * 0.22;
    current.y += (target.y - current.y) * 0.22;
    const strengthEase = 0.095;
    strength += (targetStrength - strength) * strengthEase;
    context.clearRect(0, 0, width, height);

    if (strength > 0.004) {
      const radius = Math.min(220, Math.max(170, width * 0.15));
      const spacing = 49;
      const startX = Math.floor((current.x - radius) / spacing) * spacing;
      const endX = Math.ceil((current.x + radius) / spacing) * spacing;
      const startY = Math.floor((current.y - radius) / spacing) * spacing;
      const endY = Math.ceil((current.y + radius) / spacing) * spacing;

      const glow = context.createRadialGradient(current.x, current.y, 0, current.x, current.y, radius);
      glow.addColorStop(0, `rgba(0, 91, 210, ${0.07 * strength})`);
      glow.addColorStop(0.58, `rgba(0, 91, 210, ${0.022 * strength})`);
      glow.addColorStop(1, "rgba(0, 91, 210, 0)");
      context.fillStyle = glow;
      context.fillRect(current.x - radius, current.y - radius, radius * 2, radius * 2);

      for (let y = startY; y <= endY; y += spacing) {
        for (let x = startX; x <= endX; x += spacing) {
          const distance = Math.hypot(x - current.x, y - current.y);
          if (distance > radius) continue;

          const falloff = Math.max(0, 1 - distance / radius);
          const intensity = Math.pow(falloff, 1.42) * strength;
          if (intensity < 0.012) continue;

          const dotRadius = 0.6 + intensity * 3.2;
          const alpha = Math.min(0.9, intensity * 0.86);
          context.shadowBlur = intensity > 0.42 ? 8 * intensity : 0;
          context.shadowColor = "rgba(0, 91, 210, 0.85)";
          context.fillStyle = `rgba(46, 125, 255, ${alpha})`;
          context.beginPath();
          context.arc(x, y, dotRadius, 0, Math.PI * 2);
          context.fill();
        }
      }

      context.shadowBlur = 0;
    }

    const stillMoving = Math.abs(target.x - current.x) > 0.15
      || Math.abs(target.y - current.y) > 0.15
      || Math.abs(targetStrength - strength) > 0.006;
    if (stillMoving) scheduleDraw();
  };

  window.addEventListener("pointermove", (event) => {
    pointerActive = true;
    if (strength < 0.01) {
      current.x = event.clientX;
      current.y = event.clientY;
    }
    target.x = event.clientX;
    target.y = event.clientY;
    updateTargetStrength(event.clientX, event.clientY, event.target);
    scheduleDraw();
  }, { passive: true });

  document.documentElement.addEventListener("mouseleave", () => {
    pointerActive = false;
    targetStrength = 0;
    scheduleDraw();
  });

  window.addEventListener("blur", () => {
    pointerActive = false;
    targetStrength = 0;
    scheduleDraw();
  });

  window.addEventListener("resize", () => {
    resize();
    measureTextRects();
    if (pointerActive) {
      updateTargetStrength(target.x, target.y, document.elementFromPoint(target.x, target.y));
    }
    scheduleDraw();
  }, { passive: true });

  window.addEventListener("scroll", () => {
    measureTextRects();
    if (pointerActive) {
      updateTargetStrength(target.x, target.y, document.elementFromPoint(target.x, target.y));
    }
    scheduleDraw();
  }, { passive: true });

  resize();
  measureTextRects();
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      measureTextRects();
      if (pointerActive) {
        updateTargetStrength(target.x, target.y, document.elementFromPoint(target.x, target.y));
        scheduleDraw();
      }
    });
  }
};

setupHalftoneCursor();

if (isAbout) {
  document.title = "About — rezacrat";
  const booking = document.querySelector("#booking");

  document.querySelector("#book").addEventListener("click", () => {
    if (typeof booking.showModal !== "function") return;
    if (!booking.open) {
      document.body.classList.add("modal-open");
      booking.showModal();
    }
  });

  document.querySelector("#closeBooking").addEventListener("click", () => booking.close());
  booking.addEventListener("close", () => document.body.classList.remove("modal-open"));
  booking.addEventListener("click", (event) => {
    if (event.target !== booking) return;
    const rect = booking.getBoundingClientRect();
    const outside = event.clientX < rect.left
      || event.clientX > rect.right
      || event.clientY < rect.top
      || event.clientY > rect.bottom;
    if (outside) booking.close();
  });
} else {
  const modal = document.querySelector("#projectPlayer");
  const fullVideo = document.querySelector("#fullVideo");
  const modalTitle = document.querySelector("#projectTitle");
  const modalCaption = document.querySelector("#projectCaption");
  const previewVideos = [...document.querySelectorAll(".project-video")];

  // if a video file is missing/unreachable, mark its card instead of
  // leaving a broken, blank-looking box. is-empty gets a subtle CSS treatment.
  // Note: a load failure fires "error" on the <source> child, not the <video>
  // element, and that event does not bubble, so we listen on <source> directly.
  previewVideos.forEach((video) => {
    const sourceEl = video.querySelector("source");
    sourceEl?.addEventListener("error", () => {
      document.querySelector(`#art-${video.dataset.index}`)?.classList.add("is-empty");
    });
  });

  const playVisiblePreviews = () => {
    if (modal.open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    previewVideos.forEach((video) => {
      const rect = video.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible) video.play().catch(() => {});
    });
  };

  const resetPlayer = () => {
    document.body.classList.remove("modal-open");
    fullVideo.pause();
    fullVideo.removeAttribute("src");
    fullVideo.removeAttribute("poster");
    fullVideo.load();
    playVisiblePreviews();
  };

  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projects[Number(button.dataset.project)];
      if (!project) return;
      previewVideos.forEach((video) => video.pause());
      modalTitle.textContent = project.title;
      modalCaption.textContent = project.caption || "";
      fullVideo.poster = project.poster;
      fullVideo.src = project.file;
      document.body.classList.add("modal-open");
      modal.showModal();
      fullVideo.play().catch(() => {});
    });
  });

  document.querySelector("#closePlayer").addEventListener("click", () => modal.close());
  modal.addEventListener("close", resetPlayer);
  modal.addEventListener("click", (event) => {
    if (event.target !== modal) return;
    const rect = modal.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) modal.close();
  });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (modal.open) return entry.target.pause();
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) entry.target.play().catch(() => {});
        else entry.target.pause();
      });
    }, { threshold: [0, 0.45, 0.8] });
    previewVideos.forEach((video) => observer.observe(video));
  }
}
