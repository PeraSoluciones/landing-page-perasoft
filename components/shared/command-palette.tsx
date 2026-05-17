"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useTheme } from "next-themes";
import { User, Briefcase, Code2, FolderOpen, GraduationCap, Mail, Download, Sun, Moon, Languages } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandPaletteInner onSelect={() => setOpen(false)} />
    </CommandDialog>
  );
}

const NAV_ITEMS = [
  { tKey: "about", href: "#about", icon: User },
  { tKey: "experience", href: "#experience", icon: Briefcase },
  { tKey: "skills", href: "#skills", icon: Code2 },
  { tKey: "work", href: "#work", icon: FolderOpen },
  { tKey: "education", href: "#education", icon: GraduationCap },
  { tKey: "contact", href: "#contact", icon: Mail },
] as const;

function CommandPaletteInner({ onSelect }: { onSelect: () => void }) {
  const t = useTranslations("commandPalette");
  const ct = useTranslations("commandPalette.commands");
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = NAV_ITEMS.map((item) => ({
    label: ct(item.tKey as any),
    href: item.href,
    icon: item.icon,
    group: t("sections.navigation"),
  }));

  const actions = [
    {
      label: ct("downloadCV"),
      action: () => window.open("/cv/Pablo_Aucapina_CV_FullStack-2026.pdf", "_blank"),
      icon: Download,
      group: t("sections.actions"),
    },
    {
      label: ct("toggleTheme"),
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
      icon: theme === "dark" ? Sun : Moon,
      group: t("sections.actions"),
    },
    {
      label: ct("switchLang"),
      action: () => router.replace(pathname, { locale: locale === "en" ? "es" : "en" }),
      icon: Languages,
      group: t("sections.actions"),
    },
  ];

  const socials = [
    {
      label: ct("github"),
      action: () => window.open("https://github.com/PeraSoluciones", "_blank"),
      icon: GithubIcon,
      group: t("sections.social"),
    },
    {
      label: ct("linkedin"),
      action: () => window.open("https://www.linkedin.com/in/pablo-aucapina/", "_blank"),
      icon: LinkedinIcon,
      group: t("sections.social"),
    },
  ];

  const allItems = [...navItems, ...actions, ...socials];

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder={t("placeholder")} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Array.from(new Set(allItems.map((i) => i.group))).map((group) => (
          <CommandGroup key={group} heading={group}>
            {allItems
              .filter((i) => i.group === group)
              .map((item, idx) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={`${group}-${idx}`}
                    onSelect={() => {
                      if ("href" in item && item.href) {
                        window.location.href = item.href;
                      } else if ("action" in item && item.action) {
                        item.action();
                      }
                      onSelect();
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </CommandItem>
                );
              })}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
}