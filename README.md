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
| `npm run format` | format the code with Prettier |
| `npm run format:check` | check formatting without writing |
| `npm run check:bundle` | fail if the built JavaScript exceeds the size budget |
| `npm run preview` | serve the production build locally |

## Deployment

Every push to `main` is built and deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Specs

The project is spec-driven. See [`spec/`](./spec/README.md).
