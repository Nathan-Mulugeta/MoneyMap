# Version Control Strategy

This document describes how we use Git, GitHub, and branching to collaborate on this project.

---

## Repository Hosting

- GitHub
- Default branches:
  - **main** → production-ready, deployable code.
  - **staging** → integration testing branch (used before prod releases).

---

## Branching Strategy

We follow **trunk-based development**:

- Developers create **short-lived feature branches** from `main`.
- Branch names use the format:
  - `feature/<ticket-id>-short-description`
  - `fix/<ticket-id>-short-description`
- Branches should be merged via Pull Request (PR) within 1–3 days.

---

## Pull Requests

- Required for all merges into `main` and `staging`.
- At least 1 reviewer approval required.
- All PRs must:
  - Pass CI checks (lint, test, build).
  - Have a clear, descriptive title and summary.
  - Reference related issue/ticket.

---

## Branch Protection Rules

Configured in GitHub:

- `main` branch:
  - Require PRs before merging.
  - Require at least 1 code review approval.
  - Require status checks (CI/CD) to pass.
  - Prevent force pushes & deletions.
- `staging` branch:
  - Same rules as `main`.

---

## Commit Conventions

- Use clear, descriptive commit messages:
  - Format: type(scope): short description
  - Example: `feat(expenses): add multi-currency support`
  - Example: `fix(auth): handle expired session tokens`

---

## Tags & Releases

- Semantic Versioning (SemVer): `vX.Y.Z`
- Tags created from `main` when cutting a release.
- Release notes generated via GitHub Releases.

---

## Why This Matters

- **Predictability:** Stable `main` branch ensures deploys are safe.
- **Collaboration:** Branching + PR rules enforce code reviews.
- **Traceability:** Commit conventions + PRs create a clear history.
- **Automation:** Protection rules tie into CI/CD, preventing bad code from shipping.
