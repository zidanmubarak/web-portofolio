import "./globals.css";
import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n/provider";
import { en } from "@/lib/i18n/copy-en";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  keywords: [
    "AI",
    "Machine Learning",
    "Python",
    "Data Science",
    "Deep Learning",
    "Portfolio",
  ],
  authors: [{ name: "Zidan Mubarak" }],
  icons: {
    icon: "/images/profil/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
