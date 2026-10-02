# silverina.dev

Personal website for Silverina.

## Development

```sh
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | local dev server |
| `npm run build` | typecheck and production build into `dist/` |
| `npm run lint` | ESLint |
| `npm test` | unit tests (Vitest) |
| `npm run test:watch` | unit tests in watch mode |
| `npm run test:e2e` | build, then browser checks (Playwright + axe) |
| `npm run format` | format the code with Prettier |
| `npm run format:check` | check formatting without writing |
| `npm run check:bundle` | fail if the built JavaScript exceeds the size budget |
| `npm run generate:icons` | rebuild the favicon set in `public/` from the font |
| `npm run generate:og` | rebuild the social preview image `public/og.png` |
| `npm run preview` | serve the production build locally |

Browser checks need Chromium once: `npx playwright install chromium`.

## Deployment

Every push to `main` is built and deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Specs

The project is spec-driven. See [`spec/`](./spec/README.md).
