import { setRequestLocale } from "next-intl/server";
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale} />
      <Navbar />
      <CommandPalette />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Pablo Aucapiña.{" "}
            {locale === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
          <p className="mt-1">
            {locale === "es"
              ? "Construido con Next.js, TypeScript y ☕"
              : "Built with Next.js, TypeScript & ☕"}
          </p>
        </div>
      </footer>
    </>
  );
}