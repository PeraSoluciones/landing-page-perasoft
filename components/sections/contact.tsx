import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-20 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <ScrollReveal>
          <SectionHeading tKey="contact.title" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {t("description")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:perasoluciones@gmail.com"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              <Mail className="h-4 w-4" />
              {t("cta")}
            </a>
            <a
              href="/cv/Pablo_Aucapina_CV_FullStack-2026.pdf"
              download
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
            >
              <Download className="h-4 w-4" />
              {t("download")}
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {t("location")}
            </span>
            <a
              href="https://www.linkedin.com/in/pablo-aucapina/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/PeraSoluciones"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}