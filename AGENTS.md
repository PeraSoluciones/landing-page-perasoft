# AGENTS.md — Landing Page PeraSoft

## Stack

- Next.js 16.2.6 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind v4 (via `@tailwindcss/postcss`) + Shadcn/UI **base-nova** style
- next-intl v4 for i18n (EN default, ES)
- Framer Motion for animations, next-themes for dark/light toggle
- Package manager: **bun**

## Commands

```bash
bun run dev       # dev server (Turbopack)
bun run build     # production build (also type-checks)
bun run lint      # eslint only — no separate typecheck script, `build` catches TS errors
```

## Key conventions

- **No `asChild`** — Shadcn/UI base-nova components use `@base-ui/react`, not Radix. `Button`, `Sheet.Trigger`, etc. do **not** support `asChild`. Use `buttonVariants()` + `<a>` for link buttons, or pass render props directly.
- **Middleware is `proxy.ts`** — Next.js 16 deprecated `middleware.ts`; i18n routing lives in `proxy.ts` at project root.
- **Icons** — `Github` and `Linkedin` don't exist in `lucide-react`. Use SVG components in `components/shared/icons.tsx` instead.
- **`Command` component** — Shadcn exports `CommandDialog` (not `Command.Dialog`). Use destructured imports: `{ Command, CommandDialog, CommandInput, CommandList, ... }`.
- **i18n message keys** — next-intl throws `MISSING_MESSAGE` at build time for absent keys. When adding enumerable content (skills, projects), enumerate exact keys rather than `Array.from({ length: N })` and filtering.

## Architecture

```
app/
  [locale]/layout.tsx    # ThemeProvider + NextIntlClientProvider
  [locale]/page.tsx      # Composes all sections
  api/og/route.tsx       # Edge OG image generator
  globals.css             # Shadcn tokens + emerald accent, dark-first
i18n/
  routing.ts             # defineRouting({ locales: ['en','es'] })
  request.ts             # getRequestConfig — loads messages by locale
  navigation.ts          # createNavigation — Link, redirect, etc.
proxy.ts                 # next-intl middleware (was middleware.ts)
messages/
  en.json, es.json       # All UI strings — single source of truth for content
components/
  sections/              # Page sections (hero, about, experience, skills, work, education, contact)
  shared/                # Reusable: navbar, command-palette, terminal-input, scroll-reveal, icons, theme/locale toggles
  ui/                    # Shadcn primitives — regenerate only, don't hand-edit
```

## Adding content

- Edit `messages/en.json` and `messages/es.json` together — they must have matching key structures.
- When adding new skills/projects with variable-length arrays, enumerate keys explicitly in both message files and in TSX (see `skills.tsx` for the pattern).

## Adding Shadcn components

```bash
bunx shadcn@latest add <component> -y
```

Remember: base-nova style, no Radix `asChild`.

## Deployment

Vercel — connect `PeraSoluciones/landing-page-perasoft` repo. No special env vars needed.

## Placeholder

`public/cv/Pablo_Aucapina_CV_FullStack-2026.pdf` is a 0-byte placeholder. Replace with the real CV.