import type { Metadata } from "next";
// Updated import
// Updated import
// Updated import
// Updated import
import { Geist, Geist_Mono, Noto_Sans_TC } from "next/font/google";
// Updated import
// Updated import
// Updated import
// Updated import
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Trust Rent - Thai Rental Platform",
  description: "Fast, secure, and flexible rent payments — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansTC.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

// TODO: Review: Review: Review: Review implementation



// Last updated: 2025-11-24




// Updated: 2025-11-24








