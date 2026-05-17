import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Aucapiña · Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in AI-augmented workflows, Next.js, TypeScript & cloud-native architecture.",
  },
  robots: { index: true, follow: true },
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen antialiased`}
      >
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