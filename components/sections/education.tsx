import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GraduationCap, Award } from "lucide-react";

export function Education() {
  const t = useTranslations("education");

  const degrees = Array.from({ length: 2 }, (_, i) => ({
    degree: t(`degrees.${i}.degree`),
    institution: t(`degrees.${i}.institution`),
    period: t(`degrees.${i}.period`),
  }));

  const certs = Array.from({ length: 3 }, (_, i) => t(`certs.${i}`));

  return (
    <section id="education" className="py-20 px-6 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionHeading tKey="education.title" />
        </ScrollReveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-emerald-500" />
                {t("title").split("&")[0].trim()}
              </h3>
              <div className="space-y-4">
                {degrees.map((deg, i) => (
                  <div key={i}>
                    <p className="font-medium">{deg.degree}</p>
                    <p className="text-sm text-emerald-500">{deg.institution}</p>
                    <p className="text-xs text-muted-foreground">{deg.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-emerald-500" />
                Certifications
              </h3>
              <ul className="space-y-2">
                {certs.map((cert, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}