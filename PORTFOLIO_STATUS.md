# Portfolio — Status & Structure

> Read this file first when resuming work. It documents what exists, design
> decisions, the animation work already done, blockers, and the next move —
> so you don't have to re-analyze the whole project.

## ⚠️ HERO EFFECT (noth.in "torsion") — recent work
- User wanted noth.in's hero: fullscreen looping video warped by a **WebGL shader** that
  twists/ripples the image around the mouse cursor.
- Implemented in `client/src/components/HeroVideo.jsx`:
  - Streams remote video `https://noth-in.b-cdn.net/nothin-sharp-high.mp4` (CORS `*` + byte-range OK).
  - `crossOrigin="anonymous"` so video can be used as a GL texture (not tainted).
  - Fragment shader: rotates UVs around cursor (torsion), adds radial bulge + ripple,
    global shear with mouse X, grayscale + contrast output to match monochrome brand,
    subtle light near cursor. Visible idle warp + strong hover boost (TUNING inline in FRAG).
  - Video is a real DOM <video> appended hidden into the wrap (reliable autoplay +
    texture decode), `crossOrigin=anonymous`.
  - Mouse lerped via rAF (0.08). Scrim `bg-light/40 dark:bg-dark/50`.
  - **Fallbacks**: `(hover:none)` touch or `prefers-reduced-motion` → renders plain
    `<video>` cover with scrim; also `uStrength=0` when reduced-motion flips mid-session.
  - If WebGL context fails → component returns (just scrim, no crash).
- Integrated in `Hero.jsx`: `<HeroVideo />` as absolute z-0 bg; content block and bottom
  marquee bumped to `relative z-10` above it; scrim div inside HeroVideo handles contrast.
- Grayscale is intentional (brand). If you want the colour video, note it and remove the
  `dot(...)` grayscale lines in FRAG.
- NOTE: relies on noth.in's CDN being up. If it dies, hero goes dark (scrim only) — you may
  want to bundle a local `public/videos/hero-bg.mp4` later (size ~ >10MB, timed out on download).

## Stack
- Client: React 18 + Vite 5 (port **3000**, `/api` proxied to `http://localhost:5000`), Tailwind CSS 3.
- Server: separate `server/` folder (Express; `/api/contact`). Not a git repo.
- Font: **IBM Plex Mono** (seed via `index.html`), var `--font-mono` → Tailwind `font-sans`.
- Monochrome noth.in-inspired: page bg `#f4f2ef` (light) / `#0c0c0c` (dark), ink `#121212`, accent **`#2500AD`**, hairlines `#e2dfda` / `#262626`.

## Personal Content (preserve EXACTLY — never change)
- Name: `Mohammad Junaid Mansoori`
- Title: `Full Stack Developer`
- Email: `junaidmansuri71@gmail.com`
- Phone: `9649354858` · WhatsApp: `919649354858` (also in `client/src/constants.js`)
- GitHub: `https://github.com/thedevmj`
- Resume: public `/Junaid_Mansoori_Resume.pdf`
- Copyright: `© 2026 Mohammad Junaid Mansoori. All rights reserved.`

## Commands
- Dev (client only): `cd client && npm run dev`  (Vite, port 3000)
- Full dev (client+server): `npm run dev` (root, nodemon server + vite)
- Build: `npm run build` (root = `cd client && npm run build`).
- Vite dev server writes logs to `client/devlog.txt` when launched hidden via cmd — delete it after verifying.

## Design System / Motion (index.css)
- Core noth.in pieces: monochrome base, `btn`/`btn-black`/`btn-outline` with shine-sweep `::after`, `reveal` (IntersectionObserver fade/slide), `hero-item`, marquee keyframes, `search-flash`, cursor styles, `link-underline`, navigation rules, `prefers-reduced-motion` overrides (all animation durations → ~0, `.mask-line`/`.mech-char` reset visible, hidden mouse-glow).
- **New animation utilities (already added):** `mask-line-wrap`/`mask-line` (name reveal), `typing-caret`, `text-shimmer`, `mouse-glow`, `marquee-mask`/`marquee-pause`, `aurora` (blobs), `mech-char` (char stagger), `float-soft`, `bounce-down`, `border-glow`, `terminal-line` (uses inline `--d` delay). `magnetic` effect is NOT a CSS class — it's driven by JS (see CustomCursor).

## Component Map (`client/src/components/`)
- `Navbar.jsx` — hide on scroll-down / show on scroll-up, accent active-link underline, animated hamburger→X, mobile reveal menu. Links: works→`projects`, studio→`about`, plus home(logo)/skills/contact. Logo has `data-magnetic`.
- `Hero.jsx` — WebGL background video (HeroVideo), mouse-parallax `.mouse-glow`, staggered `mask-line` name reveal (`Junaid`/accent italic `Mansoori`), JS typing role rotator, mock animated Terminal card (lg+), bottom tech marquee (edge fade + hover pause), `data-magnetic` CTAs. Content at `relative z-10` over the video.
- `HeroVideo.jsx` — fullscreen WebGL video shader with mouse torsion/warp + grayscale; see ⚠️ section above.
- `About.jsx` — studio section.
- `Skills.jsx` + `data/skillsGallery.js` + `CircularGallery.jsx` — WebGL CircularGallery preserved (careful with dobry font handling).
- `Services.jsx` — "We design :" list.
- `Experience.jsx` / `Education.jsx` — timeline sections.
- `Projects.jsx` — works list; rows have `data-cursor="explore"`, hover left-accent bar + bg tint; filter + detail modal preserved (use `openProject`).
- `Contact.jsx` — form → `/api/contact` + WhatsApp (via `handleWhatsApp`); email/phone/WhatsApp preserved.
- `Footer.jsx`, `GithubCta.jsx`, `CtaBanner.jsx`, `WhatsAppFloat.jsx`, `HighlightEffect.jsx`, `Portal.jsx`, `Skeleton.jsx` (monochrome skeletons), `SearchModal.jsx` (monochrome).
- `Marquee.jsx` — edge fade, hover pause, `reverse` prop; renders repeated items with accent `✦` markers.
- `Preloader.jsx` — cinematic exit: mech-revealed `JM.` monogram + caret, accent progress bar, 000→100 counter, then blur/scale fade (`onDone`).
- `PageLoader.jsx` — replaces Preloader after load.
- `CustomCursor.jsx` — dot+ring; `explore` label on `[data-cursor="explore"]`; **global magnetic pull** for `[data-magnetic]` (capture listeners). Disabled for `hover:none` / reduced motion.
- `Background.jsx` — fixed aurora blobs (accent/fuchsia/cyan) + noise grain.
- `context/ThemeContext.jsx` — default theme **dark**, persists via localStorage.
- `context/SearchContext.jsx` — Ctrl+K search.
- `hooks/useReveal.js` — reveal observer.
- `App.jsx` — section order, Preloader→PageLoader→content flow, `useReveal([loaded, tick])` with tick bumps `[50,250,700]` to catch lazy-section reveals, Marquee rows (second one has `reverse`), CustomCursor.

## Section IDs (used by `data/searchIndex.js` — DO NOT rename)
`home, about, skills, experience, services, projects, education, contact`

## Public assets (`client/public/`)
- `favicon.svg`, `Junaid_Mansoori_Resume.pdf`

## Verified Working
- `npm run build` passes (~5s, 187 modules).
- Dev server serves `/src/App.jsx` and `/src/index.css` (200, CSS compiles ~56KB, no Tailwind/PostCSS warnings). All components mentioned above transform cleanly through Vite.

## Animation Work Status (done on top of noth.in redesign)
- ✅ Buttons `data-magnetic` + global handler in CustomCursor.
- ✅ Preloader cinematic exit (monogram/bar/counter/blur fade).
- ✅ Generic Marquee edge masks, hover pause, reverse.
- ✅ Navbar hide-on-scroll + underline + hamburger.
- ✅ Background aurora blobs.
- ✅ Projects hover accents.
- ✅ Fix: `var(--shimmer-b)` was undefined on name span → now literal `text-accent`.

## Next Move / Open Items
- [ ] Optionally add the same `mask-line` name-reveal to the About section title.
- [ ] Tone knob: aurora opacity, accent word choice (`Mansoori`), hero marquee speed.
- [ ] Verify server runs (`npm run dev` at root) if touching `/api/contact`.
- [ ] Remember: `magnetic` is JS-based; don't reintroduce a `.magnetic` CSS class blindly.

## Known Gotchas
- `.float-soft` animation transform overrides `.reveal`'s `translateY` on the same element (opacity transition still works).
- Tailwind scan needs `content` globs covering `./src/**/*.{js,jsx}` in `client/tailwind.config.js`.
- Redundant `scroll-behavior: smooth` also exists in `App.css` (harmless).
- Do NOT regenerate/analyze the whole repo next time — read this file + grep only the target component.
