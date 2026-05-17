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