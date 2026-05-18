import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pablo-aucapina.dev"),
  title: "Pablo Aucapiña · Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer specializing in AI-augmented workflows, Next.js, TypeScript & cloud-native architecture.",
  keywords: [
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "AWS",
    "Quito",
    "Ecuador",
  ],
  authors: [{ name: "Pablo Aucapiña" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_EC",
    siteName: "Pablo Aucapiña",
    title: "Pablo Aucapiña · Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in AI-augmented workflows, Next.js, TypeScript & cloud-native architecture.",
    images: [
      {
        url: "/api/og?locale=en",
        width: 1200,
        height: 630,
        alt: "Pablo Aucapiña - Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Aucapiña · Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in AI-augmented workflows, Next.js, TypeScript & cloud-native architecture.",
    images: ["/api/og?locale=en"],
  },
  alternates: {
    languages: {
      en: "https://pablo-aucapina.dev/en",
      es: "https://pablo-aucapina.dev/es",
    },
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark light",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans min-h-screen antialiased`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-emerald-500 focus:px-2 focus:py-1 focus:text-white">
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}