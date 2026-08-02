# Shaffedits — Creative Marketing Agency

The Shaffedits marketing website: a single-page, animated, black & white
creative-agency site built with React, TypeScript, Vite, Tailwind CSS v4, and
Motion.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** — build tool & dev server
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js` needed)
- **Motion** (`motion/react`, formerly Framer Motion) — animations
- **React Hook Form** + **Zod** — contact form validation
- **EmailJS** — sends contact form submissions straight to Gmail, no backend required
- **react-phone-input-2** — phone field with country code selector (lazy-loaded)
- **Swiper** — autoplay image carousel on portfolio cards
- **Lucide React** — icons

## Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build     # type-check + production build to /dist
npm run preview   # preview the production build locally
npm run lint       # run ESLint
```

## Environment Variables

The contact form (`src/components/sections/ContactCTA.tsx`) sends submissions
via [EmailJS](https://www.emailjs.com), which requires three keys. Copy the
example file and fill them in:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID (connected to a Gmail account) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

Without these set, the form will show its "something went wrong" error state
on submit (it fails gracefully rather than crashing).

## Project Structure

```
shaffedits/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/                 # logo images
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, Preloader (page chrome)
│   │   ├── sections/           # One component per homepage section
│   │   └── ui/                 # Reusable, generic pieces (buttons, nav link,
│   │                             spotlight card + its shared pointer provider)
│   ├── lib/
│   │   └── utils.ts            # `cn()` className helper (clsx + tailwind-merge)
│   ├── App.tsx                 # Assembles the page from section components
│   ├── main.tsx                # React entry point
│   ├── index.css               # Tailwind import + design tokens + custom keyframes
│   └── vite-env.d.ts
├── index.html                  # Vite entry HTML (meta tags, fonts, favicon)
├── .env.example
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── eslint.config.js
```

### Section components (`src/components/sections`)

Rendered top to bottom in `App.tsx`: `Hero`, `TrustMarquee`, `About`,
`Services`, `Portfolio`, `Team`, `Clientele`, `Testimonials`, `ContactCTA`.

### Reusable UI primitives (`src/components/ui`)

- **`GlowButton`** — pill CTA button with a blurred glow that intensifies on hover
- **`ArrowButton`** — circular button with a sliding arrow-swap hover effect
- **`NavLink`** — nav link with a vertical flip-reveal hover animation
- **`SpotlightCard`** + **`SpotlightProvider`** — cards with a cursor-tracking
  radial spotlight. `SpotlightProvider` is mounted once in `App.tsx` and
  drives every `SpotlightCard` on the page via a single shared
  `pointermove` listener (rather than one listener per card) for performance.
  Spotlight tracking is automatically disabled on touch/coarse-pointer
  devices, which see a static soft glow instead.

## Content Placeholders

A few pieces of content are placeholders and should be swapped for real
content before launch:

- **`Portfolio.tsx`** — ⚠️ **currently references image files that don't exist
  in the repo.** The Cloud Apparels card uses Unsplash URLs (safe), but Lspace,
  Purple Curve, Untangle, and Cricketeria point to local paths like
  `/images/lspace1.jpg` — there is no `public/images/` folder in this repo, so
  those 12 images will 404 on the live site. Before deploying, either:
  1. Add real photos to `public/images/` matching the filenames referenced in
     `src/components/sections/Portfolio.tsx`, or
  2. Temporarily swap those entries back to Unsplash placeholder URLs.
- **`Team.tsx`** — team cards show initials avatars; replace with real headshots.
- **`Clientele.tsx`** — client name marquee is text-based placeholders; replace
  with real client logos.
- **`Testimonials.tsx`** — quotes are placeholder testimonials; replace with
  real client reviews.
- **`src/components/ui/CardSticky.tsx`** — not imported or used anywhere in
  the app. Safe to delete if it was leftover from an experiment, or wire it up
  if it's part of unfinished work.

## Publishing to GitHub

This repo is already git-initialized with an initial commit. To push it to
GitHub:

1. Create a new empty repository on GitHub (no README/license/gitignore —
   this project already has those): https://github.com/new
2. Copy the repo URL it gives you, then run:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

Alternatively, using the [GitHub CLI](https://cli.github.com):

```bash
gh repo create shaffedits --public --source=. --remote=origin --push
```

Once pushed, connect the repo to Vercel or Netlify (see below) for automatic
deploys on every push to `main`.

## Deployment

The app builds to a static `dist/` folder and can be deployed anywhere that
serves static files.

### Vercel

1. Import the GitHub repo in the Vercel dashboard.
2. Framework preset: **Vite**. Build command: `npm run build`. Output
   directory: `dist`.
3. Add the three `VITE_EMAILJS_*` environment variables in Project Settings →
   Environment Variables.

### Netlify

1. Import the GitHub repo in the Netlify dashboard.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Add the three `VITE_EMAILJS_*` environment variables in Site Settings →
   Environment Variables.

### GitHub Pages / any static host

Run `npm run build` and upload the contents of `dist/` — it's a fully static
site with no server-side requirements.

## Notes on This Refactor

This project was migrated from a Lovable/TanStack Start scaffold into a plain
Vite + React SPA. See the accompanying changelog for the full list of
changes, removed dependencies, and architectural decisions.
