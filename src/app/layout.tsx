import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "305 Studios — Web Experience Studio",
  description:
    "305 Studios builds high-quality, high-impact, visually striking websites. Led by Lova Rakotomavonandrianina.",
  keywords: ["web design", "web development", "Next.js", "frontend", "305 Studios"],
  openGraph: {
    title: "305 Studios — Web Experience Studio",
    description:
      "High quality. High impact. Visually striking. We build websites that hit different.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
