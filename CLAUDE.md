# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server (Vite with HMR)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run deploy     # Build and deploy to GitHub Pages (gh-pages branch)
```

## Architecture

Single-page React portfolio site built with Vite. The app is deployed to GitHub Pages, which requires the Vite base path to be `/Personal-Website/` (set in `vite.config.js`).

**Component structure:**
- `main.jsx` → `App.jsx` (root, owns all state) → `Timeline.jsx`, `Project.jsx`
- All content sections live in `App.jsx`: About, Experience, Projects, Resume, Contact
- `Timeline.jsx` and `Project.jsx` each hold their own hardcoded data arrays

**Navigation pattern:** Section refs (`aboutRef`, `experienceRef`, `projectRef`, `contactRef`) + a `showResume` boolean toggle control all navigation. `handleNavClick` clears `showResume` and scrolls to the target ref. There is no router.

**Layout:** Fixed header + fixed left sidebar + scrollable main content. The footer is conditionally hidden when `showResume` is true, replaced by an iframe PDF viewer.

**Styling:** Tailwind CSS utility classes plus per-component CSS files (`App.css`, `Timeline.css`, `Project.css`) for custom/complex styles. Global styles and Tailwind directives are in `index.css`.

**Static assets:** All images (profile photo, tech logos, project screenshots, social icons) are imported as ES modules from `src/assets/` and optimized by Vite at build time.

**Content updates:** To add/edit projects, modify the data array in `Project.jsx`. To add/edit experience or education, modify the data in `Timeline.jsx`. No external data fetching is used anywhere.


## FROM Creator: 
I am attaching below a carry on from a claude conversation I had on the application. I am planning to use this new framework/library to upgrade the repository in full total. Here is what is highlighted :

# CLAUDE.md — Project Context & Working Agreement

## Who I Am
- Beginner-to-intermediate developer transitioning from Unity/C# and Roblox/Luau
- Comfortable with object-oriented thinking, game logic, and component-based architecture
- New to TypeScript, browser APIs, and frontend tooling
- Learning by doing — explain concepts when introducing them, don't just drop code

---

## Project Goal
Upgrade my personal website using **chenglou/pretext** (`@chenglou/pretext`) as the core text layout engine.

The website should feel distinctly crafted — not a generic template. Pretext enables precise, performant text layout without DOM reflow, and I want to lean into that for visual effects, dynamic layouts, and smooth interactions that would be impossible or janky with CSS alone.

---

## What Pretext Is (Key Mental Model)
- Pure TypeScript library for multiline text measurement and layout
- Avoids `getBoundingClientRect` / DOM reflow entirely
- Uses the browser's canvas `measureText` under the hood as a font engine source of truth
- Two main usage patterns:
  - `prepare` + `layout` → get paragraph height only (cheapest)
  - `prepareWithSegments` + `layoutWithLines` / `walkLineRanges` / `layoutNextLine` → full line-by-line control
- Renders to DOM, Canvas, SVG, or WebGL
- Supports all languages, RTL, emoji, mixed bidirectional text

---

## Planned Features for the Website

### Core Pages / Sections
- **Hero / Landing** — animated text intro using canvas rendering via Pretext
- **About** — masonry or dynamic card layout with perfectly measured text containers, no layout shift
- **Projects** — grid with text that reflows cleanly and animates on resize
- **Contact** — styled form with live label overflow detection using Pretext

### Pretext-Specific Features to Build
1. **Typewriter effect on canvas** — character-by-character reveal using `layoutNextLine` iterator
2. **Shrinkwrap text containers** — use `walkLineRanges` to find the tightest width that fits text, for chat-bubble style project cards
3. **Masonry layout** — use `layout()` heights to place cards without guessing or reflow
4. **Resize-aware text** — re-layout on window resize without jank using cached `prepare()` handles
5. **SVG text art** — decorative section dividers with Pretext-laid-out text paths

---

## Tech Stack
- **TypeScript** (strict mode, but can consider how this new library can be used ot upgrade repo otherwise we focus on strict upgrades)
- **Bun** as runtime and package manager (repo already uses it)
- **@chenglou/pretext** as core dependency
- Vanilla DOM or lightweight canvas rendering — no React, no heavy framework
- CSS for base layout only; Pretext handles anything requiring measured text

---

## Code Style & Quality Standards

### TypeScript
- Strict mode always on (`"strict": true` in tsconfig)
- Explicit types on function parameters and return values — no implicit `any`
- Prefer `const` over `let`; never use `var`
- Use `type` for shapes, `interface` for extendable contracts
- Avoid `as` type casting unless genuinely necessary — explain when you use it

### General
- Small, single-responsibility functions
- Descriptive variable names — no single-letter names outside loop indices
- Comments explain *why*, not *what*
- No dead code, no commented-out blocks left in
- Errors should be handled explicitly, not silently swallowed

### File Structure (target)
```
src/
  core/          # Pretext wrappers and layout utilities
  components/    # DOM/canvas rendering components
  pages/         # Per-page entry logic
  utils/         # General helpers (debounce, resize observer, etc.)
  types/         # Shared TypeScript types
index.html
index.ts
```

---

## How to Work With Me in Terminal

- I am learning — when writing new patterns, briefly explain what and why before the code
- When I hit errors, help me understand the root cause, not just the fix
- If there are multiple valid approaches, tell me the tradeoffs before picking one
- Don't over-engineer — match complexity to the current task
- If something I ask for is the wrong approach, say so and suggest a better one
- Prefer iterative builds: get something working first, then improve it

---

## Commands (Bun)
```bash
bun install         # install dependencies
bun start           # dev server
bun run build       # production build
bun test            # run tests if present
```

---

## Current Status
- [ ] Repo cloned and dependencies installed
- [ ] React built CUrrently (we may do a gut renovation)
- [ ] Basic HTML shell created
- [ ] First Pretext integration (canvas typewriter hero)
- [ ] About section with shrinkwrap cards
- [ ] Projects masonry grid
- [ ] Contact form with overflow detection
- [ ] Deploy

---

## Resources
- Pretext repo: https://github.com/chenglou/pretext
- Live demos: https://chenglou.me/pretext/
- Pretext npm: https://www.npmjs.com/package/@chenglou/pretext