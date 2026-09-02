# Mohammad Junaid Mansoori — Portfolio (MERN)

A premium, futuristic, glassmorphism-based personal portfolio built with the **MERN stack** (MongoDB, Express, React, Node.js) + **Tailwind CSS**.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, react-icons, axios, ogl (WebGL)
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Contact form:** Stores submissions in MongoDB + forwards email via NodeMailer

## Features

- Sticky glassmorphism navbar with active-section indicator
- Dark / Light mode toggle (persisted via localStorage)
- Responsive mobile-first design with animated hamburger menu
- Futuristic animated background (gradient orbs + grid)
- Scroll-reveal animations (Intersection Observer, reduced-motion aware)
- Interactive project filtering + detail modal
- Skill categories, services, honest fresher experience, education timeline
- Working contact form with validation, success/error states
- Live debounced site search (Ctrl+K) with section navigation + highlight flash
- WhatsApp quick-contact + prefilled form-to-WhatsApp
- Downloadable resume (client/public/Junaid_Mansoori_Resume.pdf)
- Skeleton loading states (projects, skills, services, contact, initial page load)
- Interactive WebGL skills showcase (reactbits "CircularGallery" built on `ogl`)
- SEO meta tags, favicon, accessibility (semantic HTML, labels, focus states)

## Getting Started

### 1. Install dependencies

From the project root:

```bash
npm run install-all
```

This installs root, server, and client dependencies.

### 2. Configure the backend

Create `server/.env` (see `server/.env.example`):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Make sure MongoDB is running locally (or point `MONGODB_URI` elsewhere).

### 3. Run both servers (dev)

```bash
npm run dev
```

- Client: http://localhost:3000
- API: http://localhost:5000

### 4. Build the client for production

```bash
npm run build
```

Output is in `client/dist`.

## Project Structure

```
portfolio/
├── server/            # Express + MongoDB API
│   ├── index.js
│   ├── models/Contact.js
│   └── routes/contact.js
└── client/            # React + Vite + Tailwind
    └── src/
        ├── components/   # Section components
        ├── context/      # Theme
        └── hooks/        # Scroll reveal
```

## Note on Content

All personal info, projects, skills, education, contact details, and the GitHub link reflect the provided details only. No fake companies, testimonials, statistics, social profiles, or live-demo URLs are invented.

## React Performance Optimizations

- **Code splitting** — below-the-fold sections (`Projects`, `Education`, `GithubCta`, `CtaBanner`, `Contact`), the `SearchModal`, and the WebGL skills showcase (`CircularGallery` + `ogl`) are `React.lazy` loaded into separate chunks. Main bundle ~198 KB.
- **`React.memo`** — static sections (Hero, About, Skills, Experience, Services, Education, Footer, Contact) skip unnecessary re-renders.
- **`useCallback` / `useMemo`** — stable handlers and memoized filtered data, search index, and context values.
- **React Portals** — modals (project detail, search) render into `document.body` to avoid stacking-context issues.
- **`useTransition`** — project filtering stays responsive under load.
- **Suspense skeleton fallbacks** — a rounded pulse placeholder shows while lazy chunks load.
- **Visibility-aware WebGL** — the skills showcase mounts/destroys via `IntersectionObserver` so it never runs its animation loop or a GPU context while off-screen.
