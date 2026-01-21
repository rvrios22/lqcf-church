import type { Metadata } from "next";
import {
  Fira_Sans,
  Geist,
  Geist_Mono,
  Great_Vibes,
  Inter,
} from "next/font/google";
import "./globals.css";


const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  weight: ["400", "900"],
  subsets: ["latin"],
});
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: ["400"],
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  weight: ["700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Quinta Christian Fellowship Church",
  description:
    "La Quinta Christian Fellowship Church is a non-denominational evangelical church committed to seeing redeemed, transformed individuals and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaSans.variable} ${greatVibes.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
