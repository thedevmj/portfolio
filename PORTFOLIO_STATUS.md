# Portfolio — Status & Structure

> Read this file first when resuming work. It documents what exists, design
> decisions, the animation work already done, blockers, and the next move —
> so you don't have to re-analyze the whole project.

## 📌 SESSION HANDOFF (last worked: 2026-09-18)
**Where we stopped:** AI Copilot upgrades (server + client):
- **Fixed "AI always returns fallback":** `.env` used `AI_API` / `AI_MODEL` /
  `AI_BASE_URL`, but `Aicontroller.js` only read `*_API_KEY` names → `apiKey` was
  always undefined. Now reads the real names and calls the configured
  OpenAI-compatible endpoint (`AI_BASE_URL` + `/chat/completions`, Bearer `AI_API`),
  then Gemini/OpenAI/Anthropic/Groq branches, then local fallback.
- **Model selection (free tier):** `.env` now `AI_MODEL=gemini-3.5-flash`
  (3.6-flash was congested with 503s). Code fallback chain:
  `[AI_MODEL || "gemini-3.5-flash", "gemini-3.6-flash", "gemini-3.1-flash-lite",
  "gemini-3.8-flash"]`, with retries (≤3) on 429/503. Free tier can hit a daily 429 —
  auto-fall to next model keeps responses flowing.
- **Richer recruiter answers:** `JUNAID_CONTEXT` now carries the full developer
  profile + project details + RESPONSE RULES (recruiter questions → detailed
  multi-paragraph answer referencing real projects, strengths & contact). The local
  `generateLocalBlueprint` got recruiter-intent detection (regex) that returns a full
  profile answer, and the mobile/AI/e-com branches now reference the real matching
  project (Wall-E, AI Resume Analyzer + MCP Analyzer, Online Book Shopping).
- **Answer formatting:** prompt + fallback answers use `- ` bullets, **bold** tech
  keywords, ALL-CAPS section headers, and short spaced paragraphs; chat bubble renders
  them via a new `FormattedText` component (bold / inline-code / bullets / headers /
  blank-line spacing).
- **Rate limiting:** server already had `express-rate-limit` (30 req / 10 min per IP)
  on `/api/ai/blueprint`; fixed the client bypass — cooldown timestamp is now
  module-scoped (`lastAiRequestAt`, 8s) so clearing chat history / reopening the chat
  cannot reset it.

**Verified:** `node --check` on `Aicontroller.js`; a live call returned a formatted,
keyword-rich recruiter answer; `npm run build` passes (Vite).

**Resume tomorrow, first thing:**
1. Ask user to re-test the AI chatbot in dev (`npm run dev` at root) after the
   free-tier quota resets (I hit a daily 429 during testing — still succeeded via the
   next model, but logs show `exceeded your current quota`).
2. If AI still feels slow: cap retries / add `AbortController` timeout to the
   custom-endpoint fetch in `buildBlueprint`.
3. Optional: tighten the server limiter (currently 30/10min) or run a response-quality
   pass on recruiter answers.

**State facts (do not re-verify, just rely on):**
- Reveals are deterministic via `getBoundingClientRect` + scroll listeners
  (`useInViewCheck` in `client/src/components/Motion.jsx`) — deliberately NOT
  `IntersectionObserver`/`whileInView`.
- `Projects.jsx` rows: each revealed per-row via `<Reveal threshold={0.95}>`.
- `Skills.jsx` sticker wall keys: `key={s + '-' + i}` (duplicate-key fix).
- AI config lives in `server/.env` (`AI_API`, `AI_MODEL`, `AI_BASE_URL`).
- Dev server on port 3000 (`cd client && npm run dev`); API on 5000.
- Main open item pending user confirmation — commit ONLY when the user asks.

## 🎨 DESIGN SYSTEM — Neo-Brutalism (current)
- Spec: `client/src/design/neo-brutalism-portfolio-design-system.md`.
- Light mode = brand: cream bg `#FFFDF5`, ink `#000`, accent `#FF6B6B`, secondary
  `#FFD93D`, muted `#C4B5FD`, hard shadows (4/8/12/16px), Space Grotesk, thick
  black borders, no rounded corners. Font loaded in `index.html`.
- Dark mode = inverted variant (`html.dark`, toggled via `ThemeContext`):
  `--neo-ink`→`#FFFDF5` (cream), `--neo-shadow`→cream, `--neo-bg`→`#151310`,
  `--neo-panel`→`#201c18`, `--neo-muted`→`#453A7D` (deep violet that holds cream text).
  Red/yellow/white stay constant.
- **Contrast golden rule:** on `bg-neo-secondary`/`bg-neo-white`/`bg-neo-accent`
  NEVER use `text-neo-ink` (it becomes cream in dark → invisible). Use constant
  `text-black`/`text-white`. `bg-neo-muted` can carry `text-neo-ink` in both modes.
- Never use Tailwind opacity modifiers on CSS-var colors (`text-neo-ink/70` →
  invalid `rgb(var(--neo-ink)/0.7)`). Use `opacity-*` utilities.
- Tokens: `client/tailwind.config.js` (`neutral`→variables). Utilities in
  `client/src/index.css`: buttons (`.btn-neo`, `.btn-primary` text-white,
  `.btn-secondary` text-black, `.btn-outline`), `.card-lift`, `.section-pad`,
  `.container-neo`, `.section-head` label/title, `.text-stroke`, `.halftone`,
  `.grid-paper`, `.marquee-track/-mask/-pause` + top-level `@keyframes marquee`,
  `.mask-line`, `.mech-char`, `.typing-caret`, `.float-soft`, `.bounce-down`,
  `.search-highlight`, `.link-underline`, cursor styles, reduced-motion block.

## 🎞️ ANIMATION — motion (framer-motion successor) + CSS
- Dependencies: `motion` (v13) installed. GSAP still used ONLY by lazy `DotGrid`
  (Contact hero dots). Deleted WebGL/torsion (`HeroVideo`, `TorsionText`,
  `CircularGallery`, `data/skillsGallery.js`).
- `client/src/components/Motion.jsx` — shared primitives:
  - `useInViewCheck` — deterministic in-viewport detection: `getBoundingClientRect`
    + passive `scroll`/`resize`/`orientationchange` listeners + 1.2s idle check +
    5s safety interval. NOT `IntersectionObserver`, so reveals can never get stuck
    hidden (IO threshold math breaks under Windows display scaling / zoom /
    embedded iframes — this caused "Works + Tech Stack Wall missing on desktop").
  - `Reveal` — scroll-into-view fade/slide (once). Props: `as`, `delay`, `y`,
    `threshold` (0.9 = reveal when top is within 90% of viewport height).
  - `Stagger` / `StaggerItem` — container/item variants; both accept `as` so you
    can render `ul/li` validly. `Stagger` drives children via `animate="show"`
    (state-driven, run through `useInViewCheck`). `StaggerItem` has self-contained
    `hidden/show` variants, so it also works standalone with
    `initial`/`animate`/`whileInView`-style props passed through `...rest`.
  - `Float` — infinite gentle bob/rotate for decorative shapes.
  - All respect `prefers-reduced-motion` via `useReducedMotion`.
- Animations are viewport-agnostic: hero floating shapes, scroll hint, marquee,
  and all reveals now run on mobile/tablet/desktop. Hero decorations were
  previously `hidden md:block` — now always visible.
- `Projects` rows are revealed PER-ROW (`<Reveal threshold={0.95}>` per article),
  not as one batched container — a single large observer threshold can't miss
  rows on specific desktop viewports.
- `Projects` modal uses `AnimatePresence` + spring scale/fade.
- Buttons/cards keep CSS press/lift (`active:translate-*`, `card-lift`); motion
  only animates OUTER wrappers so CSS transforms don't conflict.
- Old CSS `.reveal` observer (`hooks/useReveal.js`) DELETED — motion handles all reveals.

## Stack
- Client: React 18 + Vite 5 (port **3000**, `/api` proxied to `http://localhost:5000`), Tailwind CSS 3.
- Server: separate `server/` folder (Express; `/api/contact`). Not a git repo.

## Personal Content (preserve EXACTLY — never change)
- Name: `Mohammad Junaid Mansoori`
- Title: `Full Stack Developer`
- Email: `junaidmansuri71@gmail.com`
- Phone: `9649354858` · WhatsApp: `919649354858` (also in `client/src/constants.js`)
- GitHub: `https://github.com/thedevmj`
- Resume: public `/junaidMansoori_Resume.pdf`
- Copyright: `© 2026 Mohammad Junaid Mansoori. All rights reserved.`

## Commands
- Dev (client only): `cd client && npm run dev`  (Vite, port 3000)
- Full dev (client+server): `npm run dev` (root, nodemon server + vite)
- Build: `npm run build` (root = `cd client && npm run build`).
- Vite dev server writes logs to `client/devlog.txt` when launched hidden via cmd — delete it after verifying.

## Component Map (`client/src/components/`)
- `Navbar.jsx` — hide on scroll-down / show on scroll-up, neo plain buttons with
  active accent state, animated hamburger→X, mobile full-screen menu (CSS), spring
  slide-in on mount (motion).
- `Hero.jsx` — mask-line headline reveal, floating yellow/violet shapes (`Float`,
  visible on ALL screens), red "Bold Builds" sticker, stretch badge, staggered
  CTAs, always-visible scroll hint, tech marquee (CSS, all screens).
- `About.jsx` — section-head + bio, name card, highlights grid (stagger), strengths chips.
- `Skills.jsx` — category rows (stagger) + tech-stack sticker wall (stagger).
  Wall stickers use `key={s + '-' + i}` — duplicates (Java/JavaScript/TypeScript/PHP
  appear in multiple categories) previously caused React duplicate-key console errors.
- `Services.jsx` — grid of tone cards with corner number stickers (stagger).
- `Projects.jsx` — rows with tone backgrounds + "explore" label, filter buttons,
  `AnimatePresence` detail modal (returns `github` link). Rows have `data-cursor="explore"`.
  Each row reveals independently via `<Reveal threshold={0.95}>`.
- `Contact.jsx` — red section with black heading text, lazy `DotGrid` (gsap, dots
  only on `sm+`), info rows (stagger `ul/li`), form panel, Web3Forms + `/api/contact`,
  WhatsApp send button (`.btn-neo bg-black`).
- `Education.jsx` / `Experience.jsx` — yellow/plain sections, white cards, badges.
- `Footer.jsx` — yellow, constant black text, staggered nav/contact columns.
- `GithubCta.jsx` / `CtaBanner.jsx` / `AiFloat.jsx` (spring pop-in + hover, opens AI Copilot chat) —
  flat neo CTA cards and floating AI trigger.
- `Marquee.jsx` — edge fade, hover pause, `reverse` prop, `tone` (accent/secondary).
- `Preloader.jsx` / `PageLoader.jsx` — cinematic mech monogram + counter exit.
- `CustomCursor.jsx` — dot+ring, `explore` label, magnetic pull for `[data-magnetic]`.
- `Background.jsx` — halftone + grid-paper texture (flat, no blobs).
- `context/ThemeContext.jsx` — default theme **dark**, persists via localStorage.
- `context/SearchContext.jsx` — Ctrl+K search.
- `Motion.jsx` — shared motion primitives + `useInViewCheck` (see Animation section).
- `ai/chatbot.jsx` — AI Architecture & Recruiter Copilot: interactive prompt interface
  for blueprints and recruiter queries, integrated with `/api/ai/blueprint`. 8s
  module-scoped send cooldown (`lastAiRequestAt`), `FormattedText` renderer for
  bold/bullets/ALL-CAPS headers. Chips call `handleSendMessage` (subject to cooldown).
- `App.jsx` — section order, Preloader→PageLoader→content flow, Marquee rows
  (second has `reverse` + `tone="accent"`), lazy sections with skeletons.

## Section IDs (used by `data/searchIndex.js` — DO NOT rename)
`home, about, skills, experience, services, projects, ai, education, contact`

## Public assets (`client/public/`)
- `favicon.svg`, `junaidMansoori_Resume.pdf`

## Verified Working
- `npm run build` passes (main bundle ~340 kB / ~107 kB gzip). No Tailwind warnings;
  no invalid `rgb(var(--neo...))` artifacts in compiled CSS.
- Headless Chrome (puppeteer-core, dev server port 3000): all 5 project rows at
  `opacity: 1` AND tech-stack wall fully visible (`opacity 1`, 120 sticker divs)
  on desktop 1280×900 and mobile 390×844 — zero console errors, zero duplicate-key warnings.
- AI endpoint: `node --check` passes on `server/controller/Aicontroller.js`; live
  Gemini call (via `AI_API` + OpenAI-compatible `AI_BASE_URL`) returned formatted,
  keyword-rich recruiter answers. `generateLocalBlueprint` tested for recruiter /
  mobile / AI / e-com intents.

## Next Move / Open Items
- [ ] **User confirmation (tomorrow):** hard-refresh (Ctrl+F5) and confirm Projects
      + Tech Stack Wall now render on their desktop (IO-based visibility bug fix).
- [ ] **AI chatbot re-test:** after the free-tier Gemini quota resets, confirm live
      answers (not fallback) in dev (`npm run dev` at root); watch for daily 429s.
- [ ] If AI feels slow: cap retries / add `AbortController` timeout in `buildBlueprint`.
- [ ] Visually verify dark+light, mobile vs desktop in dev (`cd client && npm run dev`).
- [ ] Optionally animate the search modal open/close (currently CSS).
- [ ] Verify server runs (`npm run dev` at root) if touching `/api/contact`.

## Known Gotchas
- `@keyframes marquee` must stay top-level in `index.css` — Tailwind only emits
  keyframes when a matching `animate-*` utility is used.
- Motion sets inline transforms — keep CSS hover/press transforms on an INNER
  element or via `whileHover`/`whileTap`, never both on the same node.
- Reveals use `useInViewCheck` (getBoundingClientRect + scroll listeners), NOT
  `whileInView`/`IntersectionObserver` — IO thresholds can silently fail on
  Windows display scaling / zoom / embedded previews (see Animation section).
- `Stagger`/`Reveal` accept `threshold` (0–1 viewport fraction); pass a high value
  like `0.95` for tall elements so they trigger as soon as they enter the viewport.
- `StaggerItem` cubes: when used as chips, avoid `hover:-translate-*` on the motion
  node; use `whileHover={{ y: -4 }}` instead.
- Tailwind scan needs `content` globs covering `./src/**/*.{js,jsx}` in `client/tailwind.config.js`.
- Do NOT regenerate/analyze the whole repo next time — read this file + grep only the target component.