"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import { TerminalInput } from "@/components/shared/terminal-input";
import { HeroAtmosphere } from "@/components/shared/hero-atmosphere";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <HeroAtmosphere />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="font-mono text-sm text-emerald-500 mb-2">
          {t("greeting")}
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {t("name")}
        </h1>
        <p className="mt-2 text-xl text-muted-foreground sm:text-2xl">
          {t("role")}
        </p>
        <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto sm:text-lg">
          {t("subtitle")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 w-full flex justify-center"
        >
          <TerminalInput />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="mailto:perasoluciones@gmail.com"
            className={cn(buttonVariants({ size: "lg" }), "gap-2")}
          >
            <Mail className="h-4 w-4" />
            {t("cta.email")}
          </a>
          <a
            href="https://github.com/PeraSoluciones"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
          >
            <GithubIcon className="h-4 w-4" />
            {t("cta.github")}
          </a>
          <a
            href="https://www.linkedin.com/in/pablo-aucapina/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
          >
            <LinkedinIcon className="h-4 w-4" />
            {t("cta.linkedin")}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8"
      >
        <a
          href="#about"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}