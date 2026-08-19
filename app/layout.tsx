import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Hanken_Grotesk, Raleway } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/SiteNavbar";

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
    <html lang="en" className={`${hankenGrotesk.variable} ${raleway.variable}`}>
      <body className="min-h-screen bg-[#fdf8f8] font-hanken-grotesk text-[#1c1b1b] antialiased">
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}
