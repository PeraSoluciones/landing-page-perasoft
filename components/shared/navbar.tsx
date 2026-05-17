"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "./theme-toggle";
import { LocaleToggle } from "./locale-toggle";
import { CommandPalette } from "./command-palette";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { User, Briefcase, Code2, FolderOpen, GraduationCap, Mail, Menu } from "lucide-react";

const NAV_ITEMS = [
  { tKey: "about", href: "#about", icon: User },
  { tKey: "experience", href: "#experience", icon: Briefcase },
  { tKey: "skills", href: "#skills", icon: Code2 },
  { tKey: "work", href: "#work", icon: FolderOpen },
  { tKey: "education", href: "#education", icon: GraduationCap },
  { tKey: "contact", href: "#contact", icon: Mail },
] as const;

export { CommandPalette };

export function Navbar() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a
          href="#"
          className="font-mono text-lg font-bold tracking-tight"
        >
          <span className="text-emerald-500">~</span>/pa
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.tKey}
              href={item.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(item.tKey as any)}
            </a>
          ))}
          <div className="ml-2 flex items-center gap-1">
            <ThemeToggle />
            <LocaleToggle />
          </div>
          <kbd className="ml-2 hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
            <span>⌘</span>K
          </kbd>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

function MobileNav() {
  const t = useTranslations("nav");

  return (
    <Sheet>
      <SheetTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex flex-col gap-4 mt-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.tKey}
              href={item.href}
              className="text-lg hover:text-emerald-500 transition-colors"
            >
              {t(item.tKey as any)}
            </a>
          ))}
          <div className="flex items-center gap-2 mt-4">
            <LocaleToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}