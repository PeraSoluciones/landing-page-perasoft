import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin } from "lucide-react";

export function Experience() {
  const t = useTranslations("experience");

  const items = Array.from({ length: 4 }, (_, i) => ({
    role: t(`items.${i}.role`),
    company: t(`items.${i}.company`),
    period: t(`items.${i}.period`),
    location: t(`items.${i}.location`),
    description: t(`items.${i}.description`),
    current: i === 0,
  }));

  return (
    <section id="experience" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionHeading tKey="experience.title" />
        </ScrollReveal>
        <div className="mt-10 space-y-0">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative pl-8 pb-10 border-l border-border last:border-l-0 last:pb-0 group">
                <div className="absolute left-0 top-1 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-emerald-500 bg-background group-first:bg-emerald-500" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                  <h3 className="font-semibold text-lg">{item.role}</h3>
                  {item.current && (
                    <Badge variant="default" className="w-fit text-xs bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                      Present
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-emerald-500 font-medium">
                  {item.company}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{item.period}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}