# COSMOS — Explore the Universe

A cinematic, bilingual (English / Khmer) space exploration website.
**All phases complete — visual foundation, interactive 3D, scroll storytelling.**

COSMOS shares educational information about planets, the Solar System and
space exploration through a premium, art-directed interface. It runs entirely
from static local data — no backend, database, accounts or paid services.

---

## Tech stack

| Purpose        | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | React 18 + Vite 5 (JavaScript / JSX)               |
| Routing        | React Router 6 (SPA, multiple routes)              |
| 3D             | Three.js + React Three Fiber + drei — **lazy-loaded WebGL chunk** |
| Scroll motion  | GSAP 3 + ScrollTrigger (scrubbed parallax, counters, hero drift) |
| Icons          | Lucide React                                       |
| Typography     | Space Grotesk + Inter (EN), Kantumruy Pro (KH) — self-hosted variable fonts |
| Styling        | Modern vanilla CSS (custom properties, fluid type, grid/flex) |
| Data           | Static local modules in `src/data/`                |

The Three.js viewer lives in its own chunk (`PlanetViewer-*.js`) and is
fetched only when a 3D model is about to appear on screen, so the initial
page load stays light. All motion is silenced under `prefers-reduced-motion`.

## Quick start

```bash
# 1. Install dependencies (Node 18+ required, bun also works)
npm install

# 2. Start the dev server — http://localhost:3000
npm run dev

# 3. Production build (outputs to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
```

> The dev server is configured with `strictPort: true` on port 3000
> (`vite.config.js`). Change `server.port` there if the port is taken.

## Production deployment

`npm run build` emits a fully static SPA in `dist/`. Host it anywhere static
files are served:

- **Vercel / Netlify / Cloudflare Pages** — zero config; SPA fallback for
  deep links is automatic.
- **GitHub Pages / nginx / Apache** — serve `dist/` and configure the server
  to fall back to `index.html` for unknown paths (e.g. `try_files $uri
  /index.html;`), because the app uses client-side routing.
- **S3 + CloudFront** — add an error-response rule mapping 403/404 to
  `/index.html`.

No environment variables are required.

## What each phase delivered

### Phase 1 — Visual foundation
- Cinematic homepage: Hero, Our Place in Space, Solar System explorer,
  Featured Planet (Mars), Beyond Our Solar System, footer.
- Full EN/ខ្មែរ interface with a separate dictionary per language.
- Six routes: `/`, `/planets`, `/planets/:id`, `/missions`, `/about`, `*`.
- Design system in vanilla CSS: tokens, fluid type, per-body accent glows,
  Khmer typography rules, reduced-motion handling.

### Phase 2 — Interactive 3D
- **`src/three/PlanetViewer.jsx`** — real-time WebGL model of every body:
  equirectangular surface map on a lit sphere, fresnel atmosphere halo,
  correct axial tilts (Uranus rolls on its side), procedural ice rings for
  Saturn & Uranus, orbiting star backdrop, drag-to-rotate via OrbitControls.
- Lazy-loaded chunk + texture preloading; the flat photograph stays visible
  underneath and doubles as the no-WebGL / texture-failure fallback.
- **`src/components/OrbitMap.jsx`** — animated top-down orbit map (canvas 2D)
  in the Solar System section; click/tap a world to select it (shared state
  with the thumbnail strip). Pauses off-screen, static under reduced motion.
- 9 original 1024×512 seam-blended surface textures in `src/assets/textures/`.

### Phase 3 — Scroll storytelling
- **`src/components/ScrollCinema.jsx`** — one GSAP layer per route:
  scrubbed `[data-parallax]` block parallax, hero backdrop/content drift,
  deep-field imagery easing, animated stat counters.
- **`src/components/Preloader.jsx`** — once-per-session cinematic intro
  (skipped for reduced motion).
- Soft route transitions via a keyed `.route-anim` wrapper (pure CSS).

## Project structure

```
cosmos/
├── index.html                  # SPA entry, meta, favicon
├── vite.config.js              # dev/preview on :3000, build config
└── src/
    ├── main.jsx                # React root + stylesheet imports
    ├── App.jsx                 # Router, preloader, route shell, GSAP layer
    ├── components/             # Reusable presentation components
    │   ├── Navbar.jsx          #   sticky nav + mobile drawer
    │   ├── Footer.jsx          #   branding, links, language, credits
    │   ├── Logo.jsx            #   SVG wordmark
    │   ├── LanguageSwitcher.jsx#   EN / ខ្មែរ segmented control
    │   ├── StarField.jsx       #   canvas ambient stars (reduced-motion aware)
    │   ├── LazyImage.jsx       #   aspect-ratio reserved, lazy, fallback
    │   ├── Reveal.jsx          #   scroll-entrance wrapper
    │   ├── OrbitMap.jsx        #   animated top-down orbit map (canvas)
    │   ├── ScrollCinema.jsx    #   GSAP ScrollTrigger cinematic layer
    │   ├── Preloader.jsx       #   once-per-session intro
    │   └── ScrollManager.jsx   #   hash scrolling + scroll reset per route
    ├── three/                  # WebGL island (lazy chunk)
    │   ├── PlanetViewer.jsx    #   R3F scene: sphere, atmosphere, rings, stars
    │   └── textures.js         #   equirectangular surface maps
    ├── sections/               # Homepage sections (one file per section)
    │   ├── Hero.jsx            #   cinematic hero (GSAP drift)
    │   ├── OurPlace.jsx        #   Earth feature + animated counters
    │   ├── SolarSystem.jsx     #   orbit map + Sun & 8 planets selector
    │   ├── FeaturedPlanet.jsx  #   Mars feature + interactive 3D model
    │   └── Beyond.jsx          #   deep-sky showcase (parallax rows)
    ├── pages/                  # Routed pages
    │   ├── HomePage.jsx
    │   ├── PlanetsPage.jsx
    │   ├── PlanetDetailPage.jsx   # 3D model per body + stats + neighbours
    │   ├── MissionsPage.jsx
    │   ├── AboutPage.jsx
    │   └── NotFoundPage.jsx
    ├── data/                   # Static, non-translatable facts
    │   ├── planets.js          #   stats, images, accents (Sun + 8 planets)
    │   ├── missions.js         #   timeline facts
    │   ├── beyond.js           #   deep-sky items
    │   └── nav.js              #   navigation model
    ├── i18n/                   # ALL interface copy, separated from UI
    │   ├── en.js               #   English dictionary
    │   ├── km.js               #   Khmer dictionary (key-for-key mirror)
    │   └── LanguageContext.jsx #   provider + useLanguage() hook
    ├── hooks/                  # useReducedMotion, useScrolled, usePageMeta,
    │   └──                     #   useNearView (mounts heavy UI when near)
    ├── styles/                 # Design system
    │   ├── fonts.css           #   @font-face (self-hosted woff2)
    │   ├── global.css          #   tokens, base, utilities, Khmer, a11y
    │   ├── components.css / navbar.css / hero.css
    │   ├── sections.css / pages.css / footer.css
    │   └── immersive.css       #   viewer frames, orbit map, preloader, routes
    └── assets/
        ├── fonts/              # variable woff2 (Space Grotesk, Inter, Kantumruy Pro)
        ├── images/             # optimised .webp imagery
        └── textures/           # 1024×512 equirectangular 3D surface maps
```

## Bilingual system (EN / ខ្មែរ)

- Every visible string — navigation, CTAs, headings, paragraphs, stats labels,
  page titles, 404, 3D hints, orbit-map captions — lives in `src/i18n/en.js`
  and `src/i18n/km.js` (key-for-key mirror).
- Switching language updates the **entire interface** (all routes), not just
  the navigation bar.
- The choice persists in `localStorage` (`cosmos-language`); English is the
  default.
- `<html lang>` is toggled (`en` ↔ `km`), which the CSS uses to retune
  typography for Khmer: Kantumruy Pro, larger line-height, no letter-spacing,
  no uppercase transforms — preventing clipped headings and awkward wrapping.
- Solar System figures (numbers/units) live in the data layer; unit words are
  translated in `i18n.*.units`.

## Design system

- Deep-black base (`#04050b`) with midnight-navy tints, one restrained accent
  blue (`#8ab4ff`), thin 1px borders, generous negative space.
- Fluid type via `clamp()`; sections use consistent vertical rhythm.
- Per-body accent glows are data-driven (`accent` in `src/data/planets.js`).
- Motion is purposeful: scroll entrances, scrubbed parallax, hover lifts,
  ambient star drift. `prefers-reduced-motion` disables all of it — the
  starfield paints one static frame, GSAP triggers are never created, the
  3D model stops auto-spinning (dragging still works), counters stay static.

## Accessibility & performance

- Skip-to-content link, semantic landmarks, labelled controls, visible
  `:focus-visible` rings, keyboard-operable planet selector and drawer
  (Escape closes, body scroll locks).
- The WebGL canvas is decorative to assistive tech (`role="group"` with a
  descriptive label); all information remains available as text.
- Below-the-fold images lazy-load with reserved aspect ratios (no layout
  shift) and a readable gradient fallback if a file fails.
- Three.js is code-split away from the entry bundle; the render loop stops
  whenever the viewer or orbit map is off-screen.
- Imagery is served as compressed WebP; fonts are self-hosted variable woff2.

## Adding a new planet or mission

1. Add its facts (images, stats, accent) to `src/data/planets.js` or
   `src/data/missions.js`.
2. Add the matching keys to **both** `src/i18n/en.js` and `src/i18n/km.js`
   (`bodies.<id>` for solar-system bodies).
3. Drop an optimised square `.webp` into `src/assets/images/` — and, for a
   3D model, a 2:1 equirectangular `.webp` into `src/assets/textures/`.

## Credits & attribution

- Imagery: public-domain space imagery, primarily from the **NASA** and
  **ESA** image libraries, retrieved via web image search and re-hosted
  locally as optimised WebP.
- 3D surface textures: original artworks generated for COSMOS.
- Typefaces: **Space Grotesk**, **Inter**, **Kantumruy Pro** (Google Fonts,
  SIL Open Font License).
- COSMOS is an independent educational project. It is **not** affiliated
  with, nor endorsed by, NASA, ESA or any space agency.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Vite dev server on `:3000`           |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Serve the production build on `:4173`|
| `npm run lint`    | ESLint over `src/`                   |
