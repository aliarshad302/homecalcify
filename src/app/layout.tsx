import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { jsonLd, organizationSchema, SITE_NAME, SITE_URL } from "@/lib/schema";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HomeCalcify — Home Improvement Calculators That Pros Trust",
    template: "%s | HomeCalcify",
  },
  description:
    "Free, accurate home improvement calculators for concrete, roofing, flooring, paint, and more. Estimate materials, bags, and cost in seconds.",
  alternates: { canonical: "/" },
  keywords: [
    "home improvement calculator",
    "construction calculator",
    "material estimator",
    "cost calculator",
  ],
  openGraph: { siteName: SITE_NAME, type: "website", url: SITE_URL },
  twitter: {
    card: "summary_large_image",
    title: "HomeCalcify — Home Improvement Calculators",
    description:
      "Free, accurate calculators for concrete, roofing, flooring, paint, and more. Estimate materials and cost in seconds.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // AdSense ownership verification (renders <meta name="google-adsense-account">).
  other: { "google-adsense-account": "ca-pub-9239647072635918" },
  // Google Search Console ownership verification.
  verification: { google: "LcyZNUNTY0RjDXwiOKP0MJyFlCY7zmLwRZb9ByUysSA" },
};

// Google AdSense publisher ID. Public value — safe to ship in the client bundle.
const ADSENSE_CLIENT = "ca-pub-9239647072635918";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(...organizationSchema()) }}
        />
        {/* Google AdSense — loaded in <head> so it's in the static HTML for
            ownership verification and ad serving. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
