import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteBoot } from "@/components/layout/RouteBoot";
import { site, homeHero } from "@/data/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${homeHero.headline}`,
    template: `%s | ${site.name}`,
  },
  description: homeHero.subheadline,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    locale: "en_CA",
    images: [
      {
        url: "/images/og/cover-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — robot concept lineup (concept visualization)`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${homeHero.headline}`,
    description: homeHero.subheadline,
    images: ["/images/og/cover-1200x630.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#091321",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phoneDisplay,
  description: "BUCKBOTICS develops intelligent robotic solutions and physical AI concepts.",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postal,
    addressCountry: "CA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        {/* Boot sequence on every internal navigation — see RouteBoot. */}
        <RouteBoot />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
