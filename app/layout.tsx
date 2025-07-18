import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ChatbotWidget } from "@/components/ChatbotWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zidan Mubarak - AI/ML Enthusiast & Python Developer",
  description:
    "Professional portfolio of Zidan Mubarak - Machine Learning Mentor, Python Developer, and Open Source Contributor specializing in AI solutions.",
  keywords: [
    "AI",
    "Machine Learning",
    "Python",
    "Data Science",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Zidan Mubarak" }],
  icons: {
    icon: "images/profil/favicon.png?auto=compress&cs=tinysrgb&w=100", // Anda bisa menggunakan '/icon.png' jika logo Anda dalam format PNG
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
      <body className={inter.className}>
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
