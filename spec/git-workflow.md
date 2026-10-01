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
- Larger changes go through a Pull Request.
- Small, safe changes may go directly to `main` while the project has a single contributor.
- Production deployment happens automatically after every change to `main`.

## Pull requests

- A PR references the spec and slice it implements, for example `spec/001-homepage.md, slice 2`.
- A PR must pass CI (typecheck, lint, build) before it is merged.
- PRs are squash-merged, so `main` keeps one commit per change; the squash commit follows the commit convention below.
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
push to main → GitHub Actions → build → GitHub Pages → silverina.dev
```

Build artifacts are never committed or uploaded by hand.
