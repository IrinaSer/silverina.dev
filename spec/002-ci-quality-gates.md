# 002 — CI quality gates

**Status:** In progress
**Owner:** Irina / Silverina

## 1. Context

CI currently runs ESLint, the TypeScript check and the production build. Everything else in the acceptance criteria of [001](./001-homepage.md) was verified by hand during the QA slice: responsive widths, horizontal overflow, console errors, accessibility, bundle size, the "empty URL is not rendered" rules.

Manual checks do not survive the next change. This spec turns the ones that are cheap and deterministic into automated gates, so `main` stays deployable without a manual QA pass on every PR.

## 2. Goals

- A regression in a 001 acceptance criterion fails the PR, not production.
- CI stays fast: under 3 minutes for a PR.
- Checks are deterministic. A check that fails randomly is removed, not retried.
- Everything CI runs can be run locally with one npm script.

## 3. Gates

### 3.1 Formatting — Prettier

- `npm run format:check` fails CI on unformatted files; `npm run format` fixes them.
- Config matches the existing code style: single quotes, semicolons, 2 spaces, print width 100.
- One formatting commit for the existing code, separate from behaviour changes.

### 3.2 Bundle budget

- A small Node script, `scripts/check-bundle.mjs`, gzips the built JavaScript and fails if the total exceeds **80 kB** (the 001 budget; currently 71 kB).
- No third-party action or service. The script prints the actual size on every run.

### 3.3 Unit tests — Vitest + Testing Library

The site has almost no logic, so the suite is deliberately small. It covers only the data-driven rules from 001, which no other check can see because they depend on values in `site.ts`:

| Rule | Test |
| --- | --- |
| Contact link with an empty URL is not rendered | `CV` absent when `links.cv` is empty, present when set |
| Project without `url` is not a link | no anchor, no `View project →` |
| Project with `url` is one link | anchor wraps the block, `View project →` shown |
| Project `status` | shown when set, absent when empty |
| GitHub link | absent from header and hero when `links.github` is empty |

- No coverage threshold: with this little logic it measures nothing useful.
- No snapshot tests.

### 3.4 Browser checks — Playwright + axe

Run against the production build (`vite preview`) in Chromium only.

| Check | Assertion |
| --- | --- |
| Smoke | page loads, `h1` is visible, no console errors or warnings, no failed requests |
| Responsive | at 320, 375, 768, 1024 and 1440px the document is not wider than the viewport |
| Structure | exactly one `h1`; every in-page link points at an existing element |
| Accessibility | `@axe-core/playwright` reports no violations |
| Reduced motion | with `prefers-reduced-motion: reduce` the hero content is visible immediately |

- No screenshot comparison: font rendering differs between macOS and CI Linux, which makes such tests flaky.
- External links are not requested: third parties rate-limit CI (LinkedIn answers 999).

### 3.5 Dependency updates — Dependabot

- Weekly PRs for `npm` and `github-actions`, minor and patch updates grouped into one PR per ecosystem.
- The gates above are what make these PRs safe to merge.

### 3.6 Pull request titles

PRs are squash-merged, so the PR title becomes the commit on `main`. A separate workflow checks it against the convention in [git-workflow](./git-workflow.md):

```text
<type>: <summary>      type ∈ feat | fix | style | refactor | docs | chore
```

- Lowercase first word in the summary, no trailing period.
- Runs when a PR is opened, edited or updated, so fixing the title re-runs only this check.
- A few lines of shell in the workflow; no third-party action.
- Dependabot is configured with the `chore` prefix so its PRs pass.

### 3.7 Protected `main`

A repository ruleset on `main`:

- changes reach `main` only through a pull request;
- the CI check and the PR title check must pass before merging;
- no force pushes, no branch deletion.

Direct pushes to `main` stop working for everyone, including the owner. [git-workflow](./git-workflow.md) is updated to match.

## 4. Workflow

```text
pull request      → title · format · lint · typecheck · unit tests · build · bundle budget · browser checks
push to main      → the same, then deploy
```

- A failing gate on `main` blocks the deploy; the site stays on the previous version.
- Unit tests and static checks run before the build, browser checks after it, so cheap failures surface first.
- Playwright browsers are cached between runs.

## 5. Implementation slices

| # | Branch | Result |
| --- | --- | --- |
| 1 | `chore/prettier-bundle-budget` | Prettier with a one-off format commit, bundle budget script, Dependabot config, PR title check. |
| 2 | `chore/unit-tests` | Vitest, Testing Library, the tests in 3.3. |
| 3 | `chore/browser-checks` | Playwright, axe, the checks in 3.4, wired into the workflow. |
| 4 | `chore/protect-main` | Ruleset on `main` (repository setting, applied by the owner's approval), `git-workflow.md` updated. Done last, once every required check exists. |

## 6. Out of scope

- **Lighthouse CI.** Performance scores vary between CI runs; the bundle budget and axe cover the deterministic part. Lighthouse stays a manual check before larger releases.
- **Visual regression screenshots**, for the reason in 3.4.
- **Coverage thresholds**, cross-browser runs, preview deployments per PR, external link checking.

## 7. Acceptance criteria

- [ ] Every gate in section 3 runs on pull requests and on `main`.
- [ ] Each gate fails when its rule is deliberately broken (verified once per gate).
- [ ] A PR run takes under 3 minutes.
- [ ] `npm test` runs unit tests locally; `npm run test:e2e` runs browser checks locally.
- [ ] Dependabot opens grouped PRs.
- [ ] A PR with a non-conforming title fails the title check.
- [ ] A direct push to `main` is rejected; a PR with a failing check cannot be merged.
- [ ] `README.md` lists the new scripts.

## 8. Decisions

Answered by the owner on 2026-10-01.

| # | Topic | Decision |
| --- | --- | --- |
| 1 | Require CI before merging into `main` | Yes, through a ruleset (3.7). The "small safe changes may go directly to `main`" rule is dropped. |
| 2 | Check PR titles against the commit convention | Yes (3.6). |
| 3 | Lighthouse CI | Not added; stays a manual check before larger releases. |
