import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SideDock } from "@/components/SideDock";
import { BackToTop } from "@/components/ui/BackToTop";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { profile } from "@/content/profile";
import { Analytics } from "@vercel/analytics/next";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Resolve the canonical origin: explicit env first, then the live
// production domain as the default fallback.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "https://nattapon-dev.vercel.app";

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: profile.tagline,
  applicationName: `${profile.name} · Portfolio`,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "PERN stack",
    "React",
    "PostgreSQL",
    "Prisma",
    profile.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: profile.tagline,
    url: siteUrl,
    siteName: `${profile.name} · Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phetchabun",
    addressCountry: "TH",
  },
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Multi-tenant architecture",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=(t==="dark"||t==="light")?t:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only rounded-lg bg-clay-strong px-4 py-2 text-sm font-medium text-on-clay focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <GlowBackground />
        <SideDock />
        {children}
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
