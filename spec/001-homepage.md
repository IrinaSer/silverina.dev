# 001 — Homepage v1

**Status:** In progress
**Owner:** Irina / Silverina
**Site:** `https://silverina.dev`

## 1. Product context

`silverina.dev` is the personal website and professional identity of a frontend developer. It serves as:

1. a personal developer portfolio;
2. a showcase for original projects;
3. a central link to GitHub, LinkedIn and CV;
4. a foundation for future experiments, writing and projects.

The first version is intentionally a **single-page homepage**. It should feel like a **personal digital space**, not a traditional résumé website.

### Scope of this spec

This spec delivers a **homepage shell**: typography, layout, content and deployment. The following are separate design tasks and get their own specs later:

- visual exploration / design direction for Silverina;
- the final Hushfeed project visual;
- the final favicon and wordmark;
- polish and micro-animations.

The implementer must not try to solve them here.

## 2. Positioning

> **Silverina — frontend developer building thoughtful interfaces and useful little things.**

The site should communicate strong frontend engineering, attention to UI and visual detail, product thinking, personal taste, curiosity and experimentation.

It should **not** communicate corporate branding, "I'm a passionate developer" clichés, generic software-engineer portfolio aesthetics, or technical complexity for its own sake.

## 3. Audience

**Primary:** frontend engineering recruiters, engineering managers, frontend developers, product companies, potential collaborators.

**Secondary:** people arriving from GitHub, users of future projects such as Hushfeed, people interested in web development and design.

Within about **5 seconds** a visitor should understand that:

1. this is a frontend developer;
2. the person builds things;
3. there is a real project to explore;
4. the site has a distinct visual identity.

## 4. Visual direction

**Editorial + technical + minimal + slightly unusual.**

```text
quiet · precise · editorial · modern · warm · technical · personal · restrained
```

Avoid: generic SaaS, corporate, cyberpunk, "developer aesthetic", overly futuristic, gaming aesthetic, visual clutter.

Do **not** use:

- neon green;
- purple/blue gradients;
- terminal-window decoration;
- excessive glassmorphism;
- 3D floating objects;
- particle backgrounds;
- cursor trails;
- excessive parallax;
- huge decorative code snippets;
- fake "AI" aesthetics.

The design should feel sophisticated through **typography, spacing, composition and subtle motion**.

### 4.1 Color

A warm neutral foundation. The metaphor is **silver / paper / quiet interface**, not literal metallic decoration.

| Token | Value | Contrast on background | Use |
| --- | --- | --- | --- |
| Background | `#F4F1EB` | — | page |
| Primary text | `#1D1D1B` | ≈ 15:1 | headings, body |
| Secondary text | `#6F6D68` | ≈ 4.6:1 | metadata, labels |
| Silver accent | `#B7B5AF` | ≈ 1.8:1 | rules, decoration only |

- Secondary text passes WCAG AA only narrowly. Do not lighten it and do not place it on a darker surface.
- Silver accent must **never** carry text or be the only indicator of an interactive element or focus state.
- Additional shades may be introduced for borders, hover states or accessibility. No additional strong accent colors without a clear design reason.
- Colors are defined once as CSS custom properties.

### 4.2 Typography

Two typefaces: an editorial serif against a technical sans-serif.

| Role | Typeface | Fallback | Use |
| --- | --- | --- | --- |
| Display | Instrument Serif | `Georgia, serif` | hero heading, section headings, large project titles |
| UI / body | Geist Sans | `system-ui, sans-serif` | navigation, body copy, metadata, buttons, labels |

- Avoid excessive weights and styles. Instrument Serif ships in regular and italic only; do not synthesise bold.
- Uppercase text is produced with CSS `text-transform`, while the markup keeps natural casing, so assistive technology does not spell words out.
- Fonts are self-hosted (no third-party font requests), in `woff2`, with `font-display: swap`. The display font used in the hero is preloaded.

### 4.3 Layout

Desktop-first visual composition, fully responsive.

- Maximum content width: 1200–1280px.
- Generous horizontal and vertical whitespace.
- The page must not feel like a collection of cards.

Prefer large typography, open space, horizontal rules, asymmetric compositions and large project blocks over a grid of tiny cards.

## 5. Page structure

```text
Header → Hero → Selected Work → Experiments → About → Contact → Footer
```

Heading hierarchy: one `h1` (hero), one `h2` per section, `h3` for the project title.

### 5.1 Header

Minimal sticky header.

- **Left:** `SILVERINA` — text logo only, links to the top of the page.
- **Right:** `WORK` (scrolls to Selected Work), `ABOUT` (scrolls to About), `GitHub ↗` (external).

No other navigation items. On mobile the same three links stay visible in one row; no collapsible menu is built for v1. If they cannot fit at 320px without overflow, reduce spacing and type size before introducing a menu.

### 5.2 Hero

The primary visual statement of the site.

- **Heading (`h1`):** `FRONTEND` / `DEVELOPER` on two lines, large editorial typography occupying significant visual space.
- **Supporting text:** "I build thoughtful interfaces and useful little things."
- **Secondary metadata:** `TypeScript · Angular · React`, visually secondary.
- **Primary CTA:** `Explore work ↓`, scrolls to Selected Work.
- **Secondary link:** `GitHub ↗`.

Do not:

- mention years of experience;
- use "Hi, I'm Irina…";
- use "Passionate frontend developer…";
- make a technology list the primary hero message.

**Motion.** A subtle entrance sequence: header, then heading, then supporting text, then CTA. Short, smooth, non-blocking, CSS only. Content must be present in the DOM and readable without JavaScript-driven reveal. Under `prefers-reduced-motion: reduce` the page renders without entrance animations.

### 5.3 Selected Work

Section label: `SELECTED WORK`. One featured project.

```text
HUSHFEED

A quieter way to browse
the web.

Chrome Extension · Manifest V3

View project →
```

- Presented as a **large editorial feature**, not a small portfolio card.
- There is no visual area in v1: an empty placeholder is not shown. A large visual is added when real Hushfeed visuals exist, with explicit dimensions so it causes no layout shift. **Do not invent product screenshots.**
- The block feels interactive on hover and focus through restrained means: a subtle shift of the title and movement of the arrow. No excessive animation.
- **Link behaviour.** If `projects[].url` is set, the whole block is one link and shows `View project →`. If it is empty, the block is not a link, has no hover affordance and does not show `View project →`. Never invent a URL.

### 5.4 Experiments

Section label: `EXPERIMENTS`.

Intro: "Small things I make when I want to understand how something works."

A simple numbered list, not cards:

```text
01    Chrome extensions
02    UI experiments
03    Creative coding
04    Tiny tools
```

These are categories, not projects, and are **not clickable** in v1. They therefore carry no arrow and no hover affordance; an item gains `→` only when it gets a real destination. Do not fabricate projects.

### 5.5 About

Section label: `ABOUT`.

> I'm Irina, a frontend developer interested in interfaces, systems and the small details that make software feel good to use.

Concise professional metadata:

```text
Frontend Developer

TypeScript
Angular
React

Currently:
Building Hushfeed
Learning React
Making things
```

Wording may be adjusted for typography and layout, preserving the meaning.

Do not include age, exact location, health information, salary, immigration status or unrelated personal information.

### 5.6 Contact

Large typographic section near the bottom.

- **Heading:** `LET'S TALK.`
- **Email:** `hello@silverina.dev`, clearly clickable, `mailto:hello@silverina.dev`.
- **Links:** `GitHub ↗`, `LinkedIn ↗`, `CV ↗`.

A link whose URL is empty in the site data is **not rendered**. External links open in a new tab with `rel="noreferrer"`.

### 5.7 Footer

Minimal, no footer navigation.

```text
SILVERINA

© 2026
Built with React · TypeScript
```

## 6. Responsive behaviour

Must work at minimum at **320, 375, 768, 1024 and 1440px**.

- Hero typography scales fluidly with `clamp()`; the mobile layout is designed, not a shrunken desktop.
- Large project blocks become vertical.
- Navigation stays usable without horizontal overflow.
- No horizontal scrolling at any width.

## 7. Accessibility

- Semantic HTML and landmarks (`header`, `main`, `nav`, `footer`, `section` with accessible names).
- Correct heading hierarchy.
- Full keyboard navigation; in-page links move focus to their target.
- Visible focus states with at least 3:1 contrast.
- Text contrast of at least WCAG AA.
- Meaningful link text; arrows (`↗ → ↓`) are decorative and hidden from assistive technology.
- `aria` only where necessary.
- `prefers-reduced-motion` respected, including smooth scrolling.
- Meaningful `alt` for images; empty `alt` for decorative ones.

Accessibility is not traded for visual effect.

## 8. Technical constraints

### 8.1 Stack

- React, TypeScript (strict), Vite.
- CSS Modules plus global CSS custom properties. No Tailwind, no CSS-in-JS.
- Modern CSS: custom properties, `clamp()`, flex/grid, logical properties where useful, media queries.
- No state-management library, no router, no animation library.
- Runtime dependencies are limited to `react`, `react-dom` and the two font packages. Anything else needs a reason recorded in this spec.

### 8.2 Architecture

```text
src/
├── components/
│   ├── Header/
│   ├── Hero/
│   ├── SelectedWork/
│   ├── Experiments/
│   ├── About/
│   ├── Contact/
│   └── Footer/
├── data/
│   └── site.ts
├── styles/
│   ├── globals.css
│   └── variables.css
├── App.tsx
└── main.tsx
```

Keep components small. Avoid one giant `App.tsx`, premature abstractions and generic `Box` / `Container` / `Wrapper` systems.

### 8.3 Content and data

All external links and project metadata live in `src/data/site.ts` and are never hardcoded in components.

```ts
export const site = {
  name: 'Silverina',
  email: 'hello@silverina.dev',

  links: {
    github: 'https://github.com/IrinaSer',
    linkedin: 'https://www.linkedin.com/in/irina-pukhkaia/',
    cv: '',
  },

  projects: [
    {
      name: 'Hushfeed',
      description: 'A quieter way to browse the web.',
      type: 'Chrome Extension',
      technologies: ['Manifest V3'],
      url: '',
    },
  ],
};
```

An empty string means "not available yet" and the corresponding UI is omitted. In v1 this applies to the CV link and the Hushfeed project link (see Decisions).

### 8.4 SEO

- `<title>`: `Silverina — Frontend Developer`
- Meta description: "Irina is a frontend developer building thoughtful interfaces, web products and small experiments."
- Canonical: `https://silverina.dev/`
- `<html lang="en">`.
- Open Graph and Twitter card metadata. `og:image` is added only when a real image exists; until then use the `summary` card without an image.
- A simple placeholder SVG favicon; the final mark is a separate task.
- No fake structured data.

Meta tags are static in `index.html`, so they are present without JavaScript.

### 8.5 Performance

A lightweight static site, fast on mobile.

- No unnecessary dependencies, no large JS libraries.
- Optimized images; below-the-fold images lazy-loaded with explicit dimensions.
- No layout shift, including from font loading.
- Budgets: Lighthouse mobile ≥ 95 in Performance, Accessibility, Best Practices and SEO; CLS < 0.05; JavaScript ≤ 80 kB gzipped.

### 8.6 Deployment

```text
push to main → GitHub Actions → npm ci → npm run build → deploy dist/ → GitHub Pages → silverina.dev
```

- Hosting stays on GitHub Pages; the custom domain and HTTPS configuration stay intact.
- `CNAME` moves to `public/CNAME` so it is part of every build output.
- Vite `base` is `/` (custom domain at the root).
- The Pages source in the repository settings must be switched from **Deploy from a branch** to **GitHub Actions**. This is a manual step by the owner and must happen together with the merge of slice 1, otherwise Pages serves the unbuilt source.
- The workflow also runs typecheck, lint and build on pull requests, without deploying.
- Node version is pinned in `.nvmrc` and used by CI.

## 9. Implementation slices

Each slice is one short-lived branch and one PR, and leaves `main` deployable.

| # | Branch | Result |
| --- | --- | --- |
| 1 | `chore/vite-pages-deploy` | Vite + React + TS scaffold, lint, CI, Pages deploy. The page shows the current placeholder content. Proves the pipeline end to end before any design work. |
| 2 | `feat/design-foundation` | Tokens, fonts, global styles, `site.ts`, SEO metadata, favicon placeholder, page skeleton with landmarks. |
| 3 | `feat/header-hero` | Header, hero, entrance motion. In-page links are added by the slice that ships their target, so `main` never has a dead anchor. |
| 4 | `feat/selected-work` | Hushfeed feature block and interaction. Adds the `WORK` nav link and the `Explore work ↓` CTA. |
| 5 | `feat/experiments-about` | Experiments and About. Adds the `ABOUT` nav link. |
| 6 | `feat/contact-footer` | Contact and footer. |
| 7 | `fix/homepage-qa` | Pass through every acceptance criterion; fixes only. |

## 10. Out of scope

Blog, CMS, authentication, contact form or backend, dark mode, internationalization, admin panel, analytics, complex animation system, 3D/WebGL, full Hushfeed case study, final logo/wordmark/favicon, final Hushfeed visuals.

## 11. Acceptance criteria

### Functional

- [ ] `https://silverina.dev` loads over HTTPS after a push to `main`, with no manual steps.
- [ ] All navigation links work; unavailable links are not rendered.
- [ ] `mailto:hello@silverina.dev` works.
- [ ] No broken links, no console errors or warnings.
- [ ] No invented URLs, screenshots or projects.

### Responsive

- [ ] 320px
- [ ] 375px
- [ ] 768px
- [ ] 1024px
- [ ] 1440px
- [ ] No horizontal scroll at any of the above.

### Accessibility

- [ ] Every interactive element is reachable and operable by keyboard, in a logical order.
- [ ] Focus is always visible.
- [ ] One `h1`; headings are nested without skipped levels.
- [ ] Text contrast meets WCAG AA.
- [ ] Reduced motion disables entrance animations and smooth scrolling.
- [ ] Automated audit (axe or Lighthouse) reports no violations.

### Performance

- [ ] Budgets in 8.5 are met.
- [ ] Only the runtime dependencies listed in 8.1.
- [ ] No visible layout shift on load.

### Design

Reject the implementation if it resembles a generic SaaS landing page, a Bootstrap portfolio, a typical "developer portfolio" template, a cyberpunk portfolio or an AI-generated gradient-heavy portfolio. The site is recognisable through **typography, whitespace, composition and restrained motion**, not decorative effects.

This criterion is judged by the owner on a deployed preview.

## 12. Definition of Done

> A visitor can open `https://silverina.dev` and immediately understand that this is Silverina's personal frontend developer site, see a distinctive visual identity, discover Hushfeed as the primary project, learn a little about Irina, and contact her via `hello@silverina.dev`.

The site is fast, responsive, accessible, technically clean, deployed through GitHub Pages, and visually distinctive without relying on decorative effects.

## 13. Decisions

Answered by the owner on 2026-10-01.

| # | Topic | Decision |
| --- | --- | --- |
| 1 | GitHub | `https://github.com/IrinaSer` |
| 2 | LinkedIn | `https://www.linkedin.com/in/irina-pukhkaia/` |
| 3 | CV | Skipped for v1: `links.cv` stays empty and the `CV ↗` link is not rendered. |
| 4 | Email | The `hello@silverina.dev` mailbox exists and receives mail. |
| 5 | Hushfeed | Still in development: `url` stays empty, so the block is not a link and shows no `View project →`. |
| 6 | Typefaces | Display: Instrument Serif. UI / body: Geist Sans, fallback `system-ui, sans-serif`. |
