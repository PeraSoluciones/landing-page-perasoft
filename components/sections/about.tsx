import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionHeading tKey="about.title" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
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