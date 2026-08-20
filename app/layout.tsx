import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Hanken_Grotesk, Raleway } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/SiteNavbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FloatingActions } from "@/components/FloatingActions";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Decorium — Architectural Surfaces & Material Studio",
    template: "%s | Decorium",
  },
  description: "Direct-quarry natural stones, monolithic porcelain surfaces, artisan bathware, and knurled hardware by Decorium.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${hankenGrotesk.variable} ${raleway.variable}`}>
      <body className="min-h-screen bg-[#fdf8f8] dark:bg-[#121212] font-hanken-grotesk text-[#1c1b1b] dark:text-[#f4f0ef] antialiased selection:bg-[#1c1b1b] selection:text-[#fdf8f8] dark:selection:bg-[#f4f0ef] dark:selection:text-[#121212]">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('decorium-theme');
                  var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          <SiteNavbar />
          {children}
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
