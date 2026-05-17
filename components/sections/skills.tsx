import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";

const SKILL_KEYS = [
  { nameKey: "0", itemKeys: ["0", "1", "2", "3", "4", "5", "6", "7"] },
  { nameKey: "1", itemKeys: ["0", "1", "2", "3", "4", "5", "6", "7"] },
  { nameKey: "2", itemKeys: ["0", "1", "2", "3", "4", "5"] },
  { nameKey: "3", itemKeys: ["0", "1", "2", "3", "4"] },
  { nameKey: "4", itemKeys: ["0", "1", "2", "3", "4"] },
] as const;

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: "◆",
  Backend: "◇",
  Infrastructure: "△",
  Databases: "□",
  "AI-Assisted": "★",
  "Infraestructura": "△",
  "Bases de Datos": "□",
  "Asistido por IA": "★",
};

export function Skills() {
  const t = useTranslations("skills");

  const categories = SKILL_KEYS.map((cat) => ({
    name: t(`categories.${cat.nameKey}.name` as any),
    items: cat.itemKeys.map((key) => t(`categories.${cat.nameKey}.items.${key}` as any)),
  }));

  return (
    <section id="skills" className="py-20 px-6 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionHeading tKey="skills.title" />
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-emerald-500">
                    {CATEGORY_ICONS[cat.name] || "●"}
                  </span>
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, j) => (
                    <Badge
                      key={j}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}