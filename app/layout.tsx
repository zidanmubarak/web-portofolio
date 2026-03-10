import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ChatbotWidget } from "@/components/ChatbotWidget";

export const metadata: Metadata = {
  title: "Zidan Mubarak - AI/ML Engineer",
  description:
    "AI/ML Engineer specializing in machine learning, deep learning, and intelligent systems. Building data-driven solutions for real-world problems.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
