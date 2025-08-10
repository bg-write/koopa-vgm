import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://koopa-video-game-music.vercel.app'),
  title: "Koopa: The Most Beloved Video Game Music Ever?",
  description: "A data-driven analysis of video game music popularity using Spotify and YouTube streaming data. Discover which VGM tracks are actually being listened to today!",
  icons: {
    icon: '/koopa-logo.png',
    shortcut: '/koopa-logo.png',
    apple: '/koopa-logo.png',
  },
  openGraph: {
    title: "Koopa: The Most Beloved Video Game Music Ever?",
    description: "A data-driven analysis of video game music popularity using Spotify and YouTube streaming data",
    type: 'website',
    images: [
      {
        url: '/koopa-logo.png',
        width: 1200,
        height: 630,
        alt: 'Koopa - Video Game Music Canon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Koopa: The Most Beloved Video Game Music Ever?",
    description: "A data-driven analysis of video game music popularity using Spotify and YouTube streaming data",
    images: ['/koopa-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <Script
          type="module"
          src="https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
