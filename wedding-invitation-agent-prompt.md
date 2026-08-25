# Agent Prompt — Wedding Invitation Website

Copy this entire prompt and hand it to a coding agent (Claude Code, Cowork, or similar) to build the project in one pass. The output must be a **multi-file project**, not a single HTML file, so it stays easy to edit later.

---

## 🎯 Goal

Build a fully responsive, single-page wedding invitation website with:
- A **ring-shaped intro gate** the guest taps to "unlock" before the site reveals itself.
- A **sectioned layout** below the gate.
- **Warm, Islamic-inspired visual design** with authentic Arabic typography (the invitation text itself is in Arabic; this brief is in English for the dev).
- Real **animation and interactivity** throughout — this should not feel static.

---

## 📋 Event details (use exactly as given)

- **Groom:** عبدالله (Abdullah)
- **Bride:** العروسة *(placeholder — ask the client for the real name before final delivery, but keep the code structured so it's a single easily-editable string/variable)*
- **Date:** September 14, 2026 (14/9/2026)
- **Venue:** نادي الهيئة العربية للتصنيع (Arab Organization for Industrialization Club)
- **Google Maps link:**
  `https://www.google.com/maps/place/%D9%86%D8%A7%D8%AF%D9%8A+%D8%A7%D9%84%D9%87%D9%8A%D8%A6%D8%A9+%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9+%D9%84%D9%84%D8%AA%D8%B5%D9%86%D9%8A%D8%B9%E2%80%AD/@29.8408227,31.3209388,16.75z/data=!4m6!3m5!1s0x145835002a405441:0xd6723485c62faf61!8m2!3d29.8390138!4d31.319929!16s%2Fg%2F11m5m0br43`

All invitation copy (headings, buttons, form labels) should be written in **Arabic**, `dir="rtl"`, `lang="ar"`.

---

## 🗂 Required file structure

Do not ship this as one giant HTML file. Use a plain, dependency-light structure so a non-developer can open files and tweak text/colors easily:

```
wedding-invitation/
├── index.html
├── README.md                  ← short guide: how to edit names/date/venue/images
├── css/
│   ├── variables.css          ← all design tokens (colors, fonts, spacing) as CSS custom properties
│   ├── base.css                ← resets, typography, RTL base rules
│   ├── gate.css                 ← intro ring gate styles
│   ├── sections.css             ← hero, story, details, footer
│   └── animations.css           ← @keyframes, transition utilities
├── js/
│   ├── gate.js                  ← ring tap-to-unlock interaction, ember particles, shimmer/starburst
│   ├── countdown.js              ← live countdown timer with tick animation
│   └── reveal-on-scroll.js       ← IntersectionObserver scroll animations
├── assets/
│   ├── fonts/                    ← (or use Google Fonts CDN, document choice in README)
│   ├── images/
│   │   └── hero-placeholder.jpg
│   └── patterns/
│       ├── islamic-star.svg      ← hand-drawn geometric motif, reused as background texture
│       └── corner-ornament.svg
```

Keep CSS split by concern (not all in one file) and JS split by feature (not all in one file), as shown above. `index.html` should link all CSS/JS files individually — no bundler required, this must run by just opening `index.html` or serving the folder statically.

---

## 🎨 Design direction

### Color palette — rich, warm jewel tones
Define these as CSS custom properties in `css/variables.css`. This replaces the earlier sand/terracotta-only palette with a richer combination — deep emerald as the anchor dark tone, antique gold as the hero accent, and rust/blush kept only as secondary warmth so the site feels more elevated and less flat:

| Token | Hex | Use |
|---|---|---|
| `--emerald-deep` | `#123C34` | primary dark background (gate, story section, footer) |
| `--emerald-mid` | `#1F5E4E` | secondary dark surfaces, gradients |
| `--gold` | `#CDA349` | primary accent — ornament lines, borders, ring |
| `--gold-bright` | `#F0D68A` | highlight/shimmer state, hover glow |
| `--ivory-warm` | `#FBF1DE` | light section backgrounds, card fills |
| `--rust` | `#B5622D` | secondary warm accent (small details only, not dominant) |
| `--blush-dust` | `#E8C9B0` | soft warmth in gradients/overlays, never large flat fills |

Avoid stark white and avoid letting rust/blush dominate — emerald + gold should read as the primary identity of the site, with the warm tones as supporting texture.

### Typography — authentic Arabic
- **Display / names / headings:** `Amiri` (classic naskh calligraphic) or `Aref Ruqaa`.
- **Eyebrows / small labels:** `Reem Kufi` (geometric kufic).
- **Body copy:** `Tajawal` or `Markazi Text` for readability.
- Load via Google Fonts with the Arabic subset; document the exact `<link>` tags in `README.md` so they're easy to swap.

### Islamic motifs
- Hand-drawn SVG geometric star patterns (`assets/patterns/islamic-star.svg`) used as a low-opacity (5–10%) repeating background texture — not a photo, not a copied asset.
- A hand-drawn SVG corner ornament (`corner-ornament.svg`) reused (rotated via CSS transform) in the four corners of key sections.
- A geometric divider between sections instead of a plain line.
- Use restraint: one clear ornamental signature (the gate ring + corner ornaments), not decoration everywhere.

---

## 🚪 Intro gate — the signature interaction (make this the most polished part of the site)

This is the most important custom piece, built in `js/gate.js` + `css/gate.css`. It should feel deliberately cinematic — this is the guest's first impression, so invest the most animation and visual polish here.

**Idle state (before tap):**
1. Full-screen overlay (`#gate`) on load, background a soft radial gradient from `--emerald-mid` to `--emerald-deep`, with a faint, slowly-drifting Islamic geometric pattern (`islamic-star.svg`) tiled behind everything at ~6% opacity, animated with a very slow `background-position` drift (60–90s loop) so it never feels static.
2. A scattering of small soft-glow "ember" particles (simple divs or a lightweight canvas, gold-colored, low opacity, 8–14 of them) drift upward very slowly and loop, like warm dust in candlelight. Keep this GPU-cheap (transform/opacity only).
3. Centered SVG **ring**, drawn with thin gold lines (`--gold` / `--gold-bright`), with a small 8-point geometric star sitting where a gemstone would be. The ring itself has a continuous, very slow idle rotation (e.g. 40s per full turn) and a gentle breathing glow (`filter: drop-shadow` pulsing between `--gold` and `--gold-bright` on a 3s cycle).
4. Below the ring: `المسّ الخاتم لفتح الدعوة` in Reem Kufi, with its own soft pulse/glow synced loosely to the ring's breathing animation so the whole thing feels alive, not like two unrelated effects.
5. A thin animated light ring (like a radar sweep or soft rotating highlight) can trace around the ring's outer edge continuously — subtle, not distracting.

**Tap/click sequence (the "unlock"):**
1. On tap, the ring snaps into a faster spin (1–2 quick rotations) while a bright shimmer sweep passes across the metal (an animated gradient highlight moving across the SVG, achievable with a moving `linearGradient` stop or a CSS mask sweep).
2. The central star briefly flares brighter and emits a quick radiating burst of thin gold light rays outward from the ring's center (simple SVG lines/triangles scaling out and fading — think a soft starburst, not a cheesy lens flare).
3. The ring then scales up slightly and fades while the whole gate overlay splits its exit into two layered motions for depth: the geometric background pattern zooms out and fades first, then the solid gate panel fades/slides away a beat later — so the reveal has depth instead of everything disappearing in one flat cut.
4. The hero content underneath animates in with a slight scale-up + fade (starting at ~97% scale) timed to land just as the gate finishes clearing, so the transition feels continuous rather than like two separate animations bumping into each other.
5. Total sequence: ~1–1.4s. Easing should be a soft custom cubic-bezier (e.g. `cubic-bezier(0.22, 1, 0.36, 1)`), not linear or default ease, to get a premium feel.
6. Add a subtle haptic-style micro-interaction on tap for touch devices if easy to include (e.g. `navigator.vibrate(10)` guarded in a feature check) — nice-to-have, not required.

**Accessibility / performance:**
- Respect `prefers-reduced-motion: reduce` by disabling the idle particle drift, idle rotation, and starburst — fall back to a simple 300ms opacity fade on tap, ring still visible but static.
- Keep all idle-state animations to `transform`/`opacity`/`filter` only so they stay smooth on mobile.
- Use `sessionStorage` (or in-memory JS state) so the gate only shows once per session, not on every scroll — but always on a fresh page load.

---

## 🧩 Page sections (in order, after the gate)

1. **Hero** — small bismillah line, bride & groom names in large Amiri type joined by a small ornament (not the word "و" — use ✦ or similar), the date (14 September 2026), one warm invitation sentence, and a **live countdown timer** (`js/countdown.js`) to the event. No CTA buttons in this section (see note below).
2. **Story / Ayah** — short Quranic verse about love and companionship (Ar-Rum 30:21) or a short couple's-story blurb, on a dark warm background with faint geometric texture.
3. **Event details** — 2–3 cards (date / time / venue), simple line icons, animated in on scroll. **The venue card itself is clickable** (whole card, or a small "افتح الموقع" label inside it) and opens the Google Maps link above directly in a new tab — there is no separate "Location" section and no standalone map button elsewhere on the page. Give the card an obvious hover/tap affordance (cursor pointer, subtle lift/scale on hover) so it reads as clickable.
4. **Footer** — the same Ar-Rum verse or a closing note, warm signature line from both families.

> **Explicitly removed from this build:** no RSVP section/form, no photo gallery, no event schedule/timeline section, no "تأكيد الحضور" button, and no standalone "الموقع على الخريطة" button. The only way to reach the map is by tapping the venue card in Event Details.

---

## ✨ Animation & interaction requirements

Beyond the gate, make sure the site actually feels alive:

- **Scroll reveal:** every section's content fades/slides in via `IntersectionObserver` (`js/reveal-on-scroll.js`), staggered for grouped elements (e.g. the detail cards).
- **Hero entrance:** names, date, and countdown stagger in sequentially right after the gate clears (not all at once) so the hero feels choreographed, not dumped on screen.
- **Countdown:** numbers should tick with a subtle flip/scale transition on each change, not just re-render flatly.
- **Venue card:** hover/tap state with a soft color shift and slight lift/scale, plus a visible keyboard focus ring, so it clearly reads as an actionable "open map" element.
- **Section dividers:** the geometric divider between sections can draw itself in (stroke-dashoffset animation) the first time it scrolls into view, rather than appearing instantly.
- **Ambient detail (optional, keep subtle):** a very slow drift/parallax on the background geometric texture as the user scrolls, echoing the same texture used behind the gate for visual continuity.
- All animations must respect `prefers-reduced-motion: reduce` — provide a reduced/instant fallback for every effect listed above.

---

## ⚙️ Technical requirements

- Plain HTML/CSS/JS, no build step required — must run by opening `index.html` directly or via a static server.
- Fully responsive, mobile-first (most guests will open this on a phone).
- `dir="rtl"` and `lang="ar"` on `<html>`, matching the Arabic content.
- Sufficient color contrast for readability, especially gold text on the deep emerald backgrounds.
- No copyrighted images or icon packs — hand-drawn SVG only, plus clearly labeled placeholder photos ready to be swapped for the couple's real photos.
- `README.md` must explain, in plain language: where to change the names/date/venue, where to swap the hero image, and where to change colors/fonts.

---

## ✅ Final note for the executing agent

The bride's name is still a placeholder — confirm the real name with the client before final delivery, but make sure it lives in one clearly-commented place in `index.html` (or a single `data-bride-name` attribute) so it's a one-line edit.