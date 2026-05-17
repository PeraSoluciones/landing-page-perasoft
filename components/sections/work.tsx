"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const PROJECT_KEYS = [
  { idx: "0", tags: ["0", "1", "2"] },
  { idx: "1", tags: ["0", "1", "2"] },
  { idx: "2", tags: ["0", "1", "2"] },
  { idx: "3", tags: ["0", "1", "2"] },
  { idx: "4", tags: ["0", "1", "2"] },
  { idx: "5", tags: ["0", "1", "2"] },
] as const;

export function Work() {
  const t = useTranslations("work");

  const projects = PROJECT_KEYS.map((p) => ({
    name: t(`items.${p.idx}.name`),
    description: t(`items.${p.idx}.description`),
    tags: p.tags.map((j) => t(`items.${p.idx}.tags.${j}`)),
    url: t(`items.${p.idx}.url`),
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