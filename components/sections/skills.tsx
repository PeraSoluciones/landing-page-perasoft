import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Marquee } from "@/components/shared/marquee";

const SKILL_KEYS = [
  { nameKey: "0", itemKeys: ["0", "1", "2", "3", "4", "5", "6"] },
  { nameKey: "1", itemKeys: ["0", "1", "2", "3", "4", "5", "6", "7"] },
  { nameKey: "2", itemKeys: ["0", "1", "2", "3", "4", "5"] },
  { nameKey: "3", itemKeys: ["0", "1", "2", "3", "4", "5"] },
  { nameKey: "4", itemKeys: ["0", "1", "2", "3"] },
  { nameKey: "5", itemKeys: ["0"] },
] as const;

export function Skills() {
  const t = useTranslations("skills");

  const categories = SKILL_KEYS.map((cat) => ({
    name: t(`categories.${cat.nameKey}.name` as Parameters<typeof t>[0]),
    items: cat.itemKeys.map((key) =>
      t(`categories.${cat.nameKey}.items.${key}` as Parameters<typeof t>[0])
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