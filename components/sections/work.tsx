import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export function Work() {
  const t = useTranslations("work");

  const projects = Array.from({ length: 6 }, (_, i) => ({
    name: t(`items.${i}.name`),
    description: t(`items.${i}.description`),
    tags: Array.from({ length: 3 }, (_, j) => t(`items.${i}.tags.${j}`)).filter(
      (tag) => !tag.startsWith("work.items")
    ),
    url:
      i === 0
        ? "https://contigo-chi.vercel.app/"
        : i === 1
          ? "https://app.universe-id.com/"
          : i === 2
            ? "https://automotorescumanda.com"
            : i === 3
              ? "https://manpergps.com"
              : i === 4
                ? "https://zootarqui.com"
                : "",
  }));

  return (
    <section id="work" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionHeading tKey="work.title" />
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="group relative flex flex-col rounded-lg border border-border bg-card p-5 h-full hover:border-emerald-500/50 transition-colors">
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
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 text-muted-foreground hover:text-emerald-500 transition-colors"
                    aria-label={`Visit ${project.name}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}