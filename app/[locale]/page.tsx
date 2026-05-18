import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Navbar } from "@/components/shared/navbar";
import { CommandPalette } from "@/components/shared/command-palette";
import { JsonLd } from "@/components/shared/json-ld";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("footer");

  return (
    <>
      <JsonLd locale={locale} />
      <Navbar />
      <CommandPalette />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Education />
        <Contact />
      </main>
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
    </>
  );
}