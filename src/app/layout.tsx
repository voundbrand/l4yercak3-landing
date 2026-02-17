import type { Metadata } from "next";

import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/client-providers";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { LanguageProvider } from "@/components/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Not critical for initial render
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true, // Critical for the main heading
});

export const metadata: Metadata = {
  title: {
    template: "%s | l4yercak3",
    default: "l4yercak3",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  description: "AI employees that learn your business. Live in 15 minutes. Free to start.",
  keywords: ["AI agent", "AI employee", "customer service AI", "WhatsApp agent", "CRM", "l4yercak3"],
  authors: [{ name: "l4yercak3" }],
  creator: "l4yercak3",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://l4yercak3.com",
    title: "l4yercak3 - AI Employees for Your Business",
    description: "AI employees that learn your business. Live in 15 minutes. Free to start.",
    siteName: "l4yercak3",
  },
  twitter: {
    card: "summary_large_image",
    title: "l4yercak3 - AI Employees for Your Business",
    description: "AI employees that learn your business. Live in 15 minutes. Free to start.",
    creator: "@l4yercak3",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ClientProviders>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ClientProviders>
        <PerformanceMonitor />
      </body>
    </html>
  );
}
