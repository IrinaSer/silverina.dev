# Git workflow

**Status:** Accepted

**Strategy:** lightweight GitHub Flow / trunk-based development.

## Branches

```text
main
feat/*
fix/*
chore/*
```

Branch names are lowercase kebab-case and describe the change: `feat/homepage-hero`, `fix/mobile-spacing`, `chore/pages-deploy`.

## Rules

- `main` must always be deployable.
- No `develop` branch.
- No classic `release/*` or `hotfix/*` branches.
- Feature branches are short-lived: one slice of a spec, merged within a day or two.
- Every change reaches `main` through a Pull Request. Direct pushes are rejected by a repository ruleset, for the owner too.
- Production deployment happens automatically after every change to `main`.

## Protection of `main`

The `Protect main` ruleset (repository settings → Rules) enforces the rules above: pull requests only, required `build` and `title` checks, squash merge only, no force pushes, no branch deletion. It has no bypass list.

## Pull requests

- A PR references the spec and slice it implements, for example `spec/001-homepage.md, slice 2`.
- The PR title follows the commit convention below; the `title` check enforces it.
- The `build` and `title` checks must pass before a PR can be merged. `build` covers formatting, lint, types, unit tests, the build, the bundle budget and browser checks (see [002](./002-ci-quality-gates.md)).
- PRs are squash-merged, the only merge method the ruleset allows, so `main` keeps one commit per change and the PR title becomes that commit.
- The branch is deleted after merge.

## Commit convention

Close to [Conventional Commits](https://www.conventionalcommits.org/): `<type>: <summary>`, imperative mood, lowercase, no trailing period.

| Type | Use for |
| --- | --- |
| `feat` | user-visible functionality or content |
| `fix` | bug fixes |
| `style` | visual refinements without behaviour changes |
| `refactor` | code restructuring without behaviour changes |
| `docs` | specs and documentation |
| `chore` | tooling, configuration, CI, dependencies |

Examples:

```text
feat: add homepage hero
feat: add Hushfeed project
fix: improve mobile spacing
style: refine typography
refactor: extract project data
docs: add homepage spec
chore: configure GitHub Pages
```

## Deployment

```text
merge into main → GitHub Actions → checks → build → GitHub Pages → silverina.dev
```

A failing check on `main` blocks the deploy; the site stays on the previous version. Build artifacts are never committed or uploaded by hand.
