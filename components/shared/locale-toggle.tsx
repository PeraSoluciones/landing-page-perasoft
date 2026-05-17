"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Languages } from "lucide-react";

export function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={switchLocale}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent transition-colors text-xs font-mono font-bold"
      aria-label={`Switch to ${locale === "en" ? "Spanish" : "English"}`}
      title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <Languages className="h-4 w-4" />
    </button>
  );
}