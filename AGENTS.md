# Project Rules for AI Development

## Mission

Build and maintain this website as a production-quality commercial web project for a non-technical owner. Make technical decisions proactively, keep the user flow simple, and verify work before handing it back.

## Framework Rules

- This project uses Next.js App Router, TypeScript, React, and Tailwind CSS.
- Before changing framework-specific code, inspect local package docs or existing project files when behavior is uncertain.
- Prefer Server Components unless client-side state, browser APIs, or interaction require `"use client"`.

## Code Standards

- Keep components small, named clearly, and placed near the feature they support.
- Use accessible HTML, semantic structure, keyboard-friendly controls, and responsive layouts.
- Avoid unused dependencies, unused files, generated clutter, and unrelated refactors.
- Use Prettier and ESLint formatting. Do not hand-format around the configured tools.

## Design Standards

- Build the actual usable page or tool first; do not create a marketing placeholder unless requested.
- Keep visual design polished, modern, and suitable for international business websites.
- Use clear spacing, readable typography, strong contrast, and mobile-first responsive behavior.
- Do not let text overlap, overflow buttons, or depend on viewport-scaled font sizes.
- Use real images or generated bitmap assets when a page needs visual credibility.

## File Management

- Source code lives under `src/`.
- App routes live under `src/app/`.
- Reusable UI components should live under `src/components/` when needed.
- Static assets live under `public/`.
- Environment examples belong in `.env.example`; never commit real `.env` secrets.

## Change Principles

- Read the existing files before editing.
- Keep changes focused on the user's request.
- Preserve user edits and do not reset or delete unrelated work.
- Use established project patterns before introducing new ones.
- When a dependency or framework behavior is uncertain, inspect local docs or package files first.

## Testing Flow

Before final delivery after code changes, run:

```bash
npm run lint
npm run typecheck
npm run build
```

For UI work, also start the dev server and verify the page renders locally.

## Git Rules

- Commit only working, verified changes.
- Use short English commit messages, for example `Build homepage hero`.
- Keep `main` synced with `origin/main`.
- After meaningful changes, push to GitHub unless the user asks not to.
