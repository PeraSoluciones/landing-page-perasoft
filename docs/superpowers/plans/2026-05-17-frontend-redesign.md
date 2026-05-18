# Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the landing page from a competent-but-generic portfolio into a distinctive, memorable frontend with distinctive typography, atmosphere, and visual identity — while fixing technical debt (i18n, SEO, metadata).

**Architecture:** Incremental changes across 8 tasks. Each task is independently deployable. Typography swap (Task 1) is the highest-impact single change. Tasks 7-8 are quick-wins that can be done in parallel. All changes preserve existing i18n structure and dark/light mode.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, Framer Motion, next-intl, Shadcn/UI base-nova

---

## Task 1: Swap Typography — Geist → IBM Plex Mono + Inter

Replace the generic Geist font pairing with IBM Plex Mono (display/headings) + Inter (body fallback). IBM Plex Mono gives the terminal/dev portfolio a distinctive, characterful feel without being overused like JetBrains Mono.

**Files:**
- Modify: `app/[locale]/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Update font imports in layout.tsx**

Replace Geist imports with IBM Plex Sans (for body) + IBM Plex Mono (for headings/terminal). Use `next/font/google`.

```tsx
// app/[locale]/layout.tsx — replace lines 2, 10-18 with:

import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
```

Update `<body>` className:

```tsx
<body
  className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans min-h-screen antialiased`}
>
```

Remove old `geistSans`/`geistMono` constants entirely.

- [ ] **Step 2: Update CSS custom properties in globals.css**

In the `@theme inline` block, replace font references:

```css
/* Replace these two lines in @theme inline: */
--font-sans: var(--font-ibm-plex-sans);
--font-mono: var(--font-ibm-plex-mono);
--font-heading: var(--font-ibm-plex-mono);
```

This makes headings use the mono font by default (monospace headings for a dev portfolio = distinctive). Body text stays sans-serif for readability.

- [ ] **Step 3: Verify the build**

Run: `bun run build`
Expected: Build succeeds with no font-related errors.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/layout.tsx app/globals.css
git commit -m "feat: swap Geist → IBM Plex Mono+Serif for distinctive typography"
```

---

## Task 2: Add Atmospheric Background to Hero

Add a subtle gradient mesh + noise texture overlay to the hero section. This creates depth and atmosphere without being heavy — the "memorable moment" the site currently lacks.

**Files:**
- Create: `components/shared/hero-atmosphere.tsx`
- Modify: `components/sections/hero.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create HeroAtmosphere component**

Create `components/shared/hero-atmosphere.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/8 blur-[100px]" />
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Add HeroAtmosphere to hero section**

In `components/sections/hero.tsx`, add import and render:

```tsx
import { HeroAtmosphere } from "@/components/shared/hero-atmosphere";

// Inside the <section>, as first child after the opening tag:
<section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-20 overflow-hidden">
  <HeroAtmosphere />
  {/* ... rest of content unchanged ... */}
```

- [ ] **Step 3: Add gradient mesh keyframe animation in globals.css**

Add after the `.animate-blink` rule:

```css
@keyframes mesh-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.animate-mesh-drift {
  animation: mesh-drift 20s ease-in-out infinite;
}
```

Update `HeroAtmosphere` divs to use it:

```tsx
<div className="animate-mesh-drift absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-emerald-500/5 blur-[120px]" />
<div className="animate-mesh-drift absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/8 blur-[100px]" style={{ animationDelay: "-7s" }} />
```

- [ ] **Step 4: Build and verify**

Run: `bun run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add components/shared/hero-atmosphere.tsx components/sections/hero.tsx app/globals.css
git commit -m "feat: add atmospheric gradient mesh + noise to hero"
```

---

## Task 3: Add Stats Grid to About Section

Turn the plain-text About section into a more impactful layout: keep the paragraphs but add a stats row (6+ years, 10+ projects, etc.) with animated counters and emerald accents.

**Files:**
- Modify: `components/sections/about.tsx`

- [ ] **Step 1: Add stats keys to both message files**

In `messages/en.json`, inside the `"about"` object, add:

```json
"stats": [
  { "value": "6+", "label": "Years Experience" },
  { "value": "10+", "label": "Projects Delivered" },
  { "value": "5", "label": "Industries Served" },
  { "value": "2", "label": "Countries" }
]
```

In `messages/es.json`, inside the `"about"` object, add:

```json
"stats": [
  { "value": "6+", "label": "Años de Experiencia" },
  { "value": "10+", "label": "Proyectos Entregados" },
  { "value": "5", "label": "Industrias Atendidas" },
  { "value": "2", "label": "Países" }
]
```

- [ ] **Step 2: Update about.tsx with stats grid**

Replace `components/sections/about.tsx` entirely:

```tsx
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const STATS_KEYS = [
  { valueKey: "0.value", labelKey: "0.label" },
  { valueKey: "1.value", labelKey: "1.label" },
  { valueKey: "2.value", labelKey: "2.label" },
  { valueKey: "3.value", labelKey: "3.label" },
] as const;

export function About() {
  const t = useTranslations("about");
  const ts = useTranslations("about.stats");

  const stats = STATS_KEYS.map((s) => ({
    value: ts(s.valueKey as any),
    label: ts(s.labelKey as any),
  }));

  return (
    <section id="about" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionHeading tKey="about.title" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-4 text-center"
              >
                <p className="text-3xl font-bold text-emerald-500 font-mono">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed max-w-3xl">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build and verify**

Run: `bun run build`
Expected: Build succeeds, About section shows stats grid.

- [ ] **Step 4: Commit**

```bash
git add messages/en.json messages/es.json components/sections/about.tsx
git commit -m "feat: add stats grid to About section"
```

---

## Task 4: Redesign Skills Section — Animated Marquee

Replace the plain badge grid with an animated marquee of skill tags, making the section visually striking and the most memorable part of the page.

**Files:**
- Create: `components/shared/marquee.tsx`
- Modify: `components/sections/skills.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create Marquee component**

Create `components/shared/marquee.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  speed = 40,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden [--gap:0.5rem]",
        className
      )}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 items-center gap-[var(--gap)]",
            {
              "[animation:marquee_var(--marquee-duration)_linear_infinite]":
                !reverse,
              "[animation:marquee-reverse_var(--marquee-duration)_linear_infinite]":
                reverse,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
            }
          )}
          style={
            { "--marquee-duration": `${speed}s` } as React.CSSProperties
          }
        >
          {children}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add marquee keyframes to globals.css**

Add after `.animate-mesh-drift`:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - var(--gap))); }
}

@keyframes marquee-reverse {
  from { transform: translateX(calc(-100% - var(--gap))); }
  to { transform: translateX(0); }
}
```

- [ ] **Step 3: Redesign Skills section**

Replace `components/sections/skills.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Marquee } from "@/components/shared/marquee";

const SKILL_KEYS = [
  { nameKey: "0", itemKeys: ["0", "1", "2", "3", "4", "5", "6", "7"] },
  { nameKey: "1", itemKeys: ["0", "1", "2", "3", "4", "5", "6", "7"] },
  { nameKey: "2", itemKeys: ["0", "1", "2", "3", "4", "5"] },
  { nameKey: "3", itemKeys: ["0", "1", "2", "3", "4"] },
  { nameKey: "4", itemKeys: ["0", "1", "2", "3", "4"] },
] as const;

export function Skills() {
  const t = useTranslations("skills");

  const categories = SKILL_KEYS.map((cat) => ({
    name: t(`categories.${cat.nameKey}.name` as any),
    items: cat.itemKeys.map((key) =>
      t(`categories.${cat.nameKey}.items.${key}` as any)
    ),
  }));

  const allSkills = categories.flatMap((cat) => cat.items);

  const mid = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, mid);
  const row2 = allSkills.slice(mid);

  return (
    <section id="skills" className="py-20 px-6 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionHeading tKey="skills.title" />
        </ScrollReveal>
        <div className="mt-10 space-y-4">
          <ScrollReveal delay={0.1}>
            <Marquee speed={35}>
              {row1.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-md border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-sm font-mono text-emerald-500/90 whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </Marquee>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <Marquee reverse speed={30}>
              {row2.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-md border border-border bg-card px-3 py-1.5 text-sm font-mono text-foreground/80 whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </Marquee>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.2}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-4"
              >
                <h3 className="font-mono text-sm font-semibold text-emerald-500 mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {cat.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Build and verify**

Run: `bun run build`
Expected: Build succeeds. Skills section shows animated marquee rows.

- [ ] **Step 5: Commit**

```bash
git add components/shared/marquee.tsx components/sections/skills.tsx app/globals.css
git commit -m "feat: redesign Skills with animated marquee"
```

---

## Task 5: Enhance Work Section — Project Card Hover Effects

Add hover effects to project cards: border glow, slight scale, and a visible external link CTA. Also fix the hardcoded URL issue by reading from i18n messages.

**Files:**
- Modify: `components/sections/work.tsx`

- [ ] **Step 1: Refactor work.tsx to read URLs from i18n and add hover effects**

Replace `components/sections/work.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const PROJECT_KEYS = [
  { nameKey: "0", descKey: "0", tags: ["0", "1", "2"], urlKey: "0" },
  { nameKey: "1", descKey: "1", tags: ["0", "1", "2"], urlKey: "1" },
  { nameKey: "2", descKey: "2", tags: ["0", "1", "2"], urlKey: "2" },
  { nameKey: "3", descKey: "3", tags: ["0", "1", "2"], urlKey: "3" },
  { nameKey: "4", descKey: "4", tags: ["0", "1", "2"], urlKey: "4" },
  { nameKey: "5", descKey: "5", tags: ["0", "1", "2"], urlKey: "5" },
] as const;

export function Work() {
  const t = useTranslations("work");

  const projects = PROJECT_KEYS.map((p) => ({
    name: t(`items.${p.nameKey}.name`),
    description: t(`items.${p.descKey}.description`),
    tags: p.tags.map((j) => t(`items.${p.nameKey}.tags.${j}`)),
    url: t(`items.${p.urlKey}.url`),
  }));

  return (
    <section id="work" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionHeading tKey="work.title" />
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const hasUrl = project.url && !project.url.startsWith("work.");
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div
                  className={`group relative flex flex-col rounded-lg border border-border bg-card p-5 h-full transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] hover:-translate-y-0.5 ${
                    hasUrl ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (hasUrl) {
                      window.open(project.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="text-xs font-normal text-emerald-500 border-emerald-500/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {hasUrl && (
                    <ExternalLink className="absolute top-4 right-4 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:text-emerald-500" />
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build and verify**

Run: `bun run build`
Expected: Build succeeds. URLs read from i18n, cards have glow hover.

- [ ] **Step 3: Commit**

```bash
git add components/sections/work.tsx
git commit -m "feat: enhance Work cards with hover glow + read URLs from i18n"
```

---

## Task 6: Fix Hardcoded Strings — i18n "Present", "Certifications", Footer

Move all hardcoded English strings into i18n messages and use translation keys properly.

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/es.json`
- Modify: `components/sections/experience.tsx`
- Modify: `components/sections/education.tsx`
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Add missing i18n keys to en.json**

In `messages/en.json`, add to `experience` object:

```json
"present": "Present"
```

Add to `education` object:

```json
"certificationsLabel": "Certifications"
```

Verify `footer.rights` and `footer.builtWith` already exist (they do).

- [ ] **Step 2: Add missing i18n keys to es.json**

In `messages/es.json`, add to `experience` object:

```json
"present": "Presente"
```

Add to `education` object:

```json
"certificationsLabel": "Certificaciones"
```

- [ ] **Step 3: Fix experience.tsx — use i18n for "Present" badge**

In `components/sections/experience.tsx`, line 33-36, replace:

```tsx
<Badge variant="default" className="w-fit text-xs bg-emerald-500 hover:bg-emerald-600 text-white border-0">
  Present
</Badge>
```

With:

```tsx
<Badge variant="default" className="w-fit text-xs bg-emerald-500 hover:bg-emerald-600 text-white border-0">
  {t("present")}
</Badge>
```

- [ ] **Step 4: Fix education.tsx — use i18n for "Certifications" heading**

In `components/sections/education.tsx`, line 47, replace:

```tsx
Certifications
```

With:

```tsx
{t("certificationsLabel")}
```

- [ ] **Step 5: Fix footer in page.tsx — use i18n keys instead of inline**

In `app/[locale]/page.tsx`, add `useTranslations` and replace the footer section. Since this is a server component, use `getTranslations`:

```tsx
import { setRequestLocale, getTranslations } from "next-intl/server";
```

Then after `setRequestLocale(locale)`:

```tsx
const t = await getTranslations("footer");
```

Replace the footer block (lines 35-47):

```tsx
<footer className="border-t border-border py-8">
  <div className="mx-auto max-w-5xl px-6 flex flex-col items-center gap-3 text-sm text-muted-foreground">
    <p>
      © {new Date().getFullYear()} Pablo Aucapiña. {t("rights")}
    </p>
    <p>{t("builtWith")}</p>
    <div className="flex items-center gap-4">
      <a href="https://github.com/PeraSoluciones" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="GitHub">
        <GithubIcon className="h-4 w-4" />
      </a>
      <a href="https://www.linkedin.com/in/pablo-aucapina/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
        <LinkedinIcon className="h-4 w-4" />
      </a>
    </div>
  </div>
</footer>
```

Add imports at the top:

```tsx
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
```

- [ ] **Step 6: Remove `current` hardcoded logic from experience.tsx**

In `experience.tsx`, line 16, replace `current: i === 0,` with `current: t(`items.${i}.current`) === "true"`. But since i18n has `"current": true` (boolean), we need a different approach. Add `"presentBadge"` key to both message files under experience, and change the `current` check to use that.

Actually, the simplest fix: keep `current: i === 0` since it's structural (first item is always current), but use the i18n key for the label. No change needed to the logic, just the text.

- [ ] **Step 7: Build and verify**

Run: `bun run build`
Expected: Build succeeds. No hardcoded English strings in experience, education, or footer.

- [ ] **Step 8: Commit**

```bash
git add messages/en.json messages/es.json components/sections/experience.tsx components/sections/education.tsx app/[locale]/page.tsx
git commit -m "fix: move hardcoded strings to i18n (Present, Certifications, footer)"
```

---

## Task 7: SEO & Metadata Fixes — OG Image, metadataBase, Viewport

Configure proper OG image reference, add `metadataBase`, export `viewport` separately (Next 16 requirement), and add `alternates.languages`.

**Files:**
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Add metadataBase, openGraph.images, alternates to metadata**

In `app/[locale]/layout.tsx`, update the `metadata` export:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://pablo-aucapina.dev"),
  title: "Pablo Aucapiña · Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer specializing in AI-augmented workflows, Next.js, TypeScript & cloud-native architecture.",
  keywords: [
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "AWS",
    "Quito",
    "Ecuador",
  ],
  authors: [{ name: "Pablo Aucapiña" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_EC",
    siteName: "Pablo Aucapiña",
    title: "Pablo Aucapiña · Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in AI-augmented workflows, Next.js, TypeScript & cloud-native architecture.",
    images: [
      {
        url: "/api/og?locale=en",
        width: 1200,
        height: 630,
        alt: "Pablo Aucapiña - Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Aucapiña · Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in AI-augmented workflows, Next.js, TypeScript & cloud-native architecture.",
    images: ["/api/og?locale=en"],
  },
  alternates: {
    languages: {
      en: "https://pablo-aucapina.dev/en",
      es: "https://pablo-aucapina.dev/es",
    },
  },
  robots: { index: true, follow: true },
};
```

- [ ] **Step 2: Add viewport export (Next 16 requirement)**

Add after the metadata export:

```tsx
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark light",
};
```

Add the import:

```tsx
import type { Metadata, Viewport } from "next";
```

- [ ] **Step 3: Build and verify**

Run: `bun run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/layout.tsx
git commit -m "feat: add metadataBase, OG image, viewport, alternates for SEO"
```

---

## Task 8: Clean Up Technical Debt

Remove dead import in JsonLd, fix CommandPalette navigation (smooth scroll instead of window.location.href), and add skip-to-content link.

**Files:**
- Modify: `components/shared/json-ld.tsx`
- Modify: `components/shared/command-palette.tsx`
- Modify: `app/[locale]/page.tsx`
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Remove dead import in json-ld.tsx**

In `components/shared/json-ld.tsx`, remove line 1:

```tsx
import { useTranslations } from "next-intl";
```

The import is unused.

- [ ] **Step 2: Fix CommandPalette navigation — smooth scroll for hash links**

In `components/shared/command-palette.tsx`, replace lines 108-113:

```tsx
onSelect={() => {
  if ("href" in item && item.href) {
    window.location.href = item.href;
  } else if ("action" in item && item.action) {
    item.action();
  }
  onSelect();
}}
```

With:

```tsx
onSelect={() => {
  if ("href" in item && item.href) {
    const el = document.querySelector(item.href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  } else if ("action" in item && item.action) {
    item.action();
  }
  onSelect();
}}
```

- [ ] **Step 3: Add skip-to-content link**

In `app/[locale]/layout.tsx`, inside the `<body>` tag, before `<ThemeProvider>`:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-emerald-500 focus:px-2 focus:py-1 focus:text-white">
  Skip to content
</a>
```

- [ ] **Step 4: Add id="main-content" to main element**

In `app/[locale]/page.tsx`, change:

```tsx
<main>
```

To:

```tsx
<main id="main-content">
```

- [ ] **Step 5: Build and verify**

Run: `bun run build`
Expected: Build succeeds with no warnings about unused imports.

- [ ] **Step 6: Commit**

```bash
git add components/shared/json-ld.tsx components/shared/command-palette.tsx app/[locale]/layout.tsx app/[locale]/page.tsx
git commit -m "fix: remove dead import, smooth scroll in command palette, skip-to-content link"
```

---

## Self-Review Checklist

After completing all tasks, run:

```bash
bun run build
bun run lint
```

Verify:

- [ ] Typography is IBM Plex (Mono for headings, Sans for body)
- [ ] Hero has gradient mesh + subtle noise atmosphere
- [ ] About section shows stats grid
- [ ] Skills section has animated marquee
- [ ] Work cards have glow hover effect and read URLs from i18n
- [ ] No hardcoded English strings in experience, education, footer
- [ ] Metadata includes OG image, metadataBase, viewport, alternates
- [ ] No dead imports
- [ ] Command palette uses smooth scroll
- [ ] Skip-to-content link present