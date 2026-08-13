import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrackingConsent } from "@/components/TrackingConsent";
import { getSiteContent } from "@/lib/strapi";
import "./globals.css";

const siteUrl = "https://oussamaelhajoui.nl";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    metadataBase: new URL(siteUrl),
    title: { default: content.seoTitle, template: `%s | ${content.siteName}` },
    description: content.seoDescription,
    applicationName: content.siteName,
    authors: [{ name: content.siteName, url: siteUrl }],
    creator: content.siteName,
    publisher: content.siteName,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      url: siteUrl,
      siteName: content.siteName,
      title: content.seoTitle,
      description: content.seoDescription,
      images: [{ url: "/og.png", width: 1200, height: 628, alt: `${content.siteName} — Websites en web apps` }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seoTitle,
      description: content.seoDescription,
      images: ["/og.png"],
    },
    robots: { index: true, follow: true },
    icons: { icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }], shortcut: "/favicon.ico" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07172f",
  colorScheme: "light",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getSiteContent();
  const trackingEnabled = content.tracking.enabled && Boolean(
    content.tracking.googleTagManagerId ||
    content.tracking.googleTagId ||
    content.tracking.metaPixelId ||
    content.tracking.tiktokPixelId ||
    content.tracking.snapPixelId,
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: content.siteName,
    url: siteUrl,
    image: `${siteUrl}/oussamaelhajoui-logo.png`,
    email: content.contact.email,
    description: content.seoDescription,
    areaServed: content.contact.location || "Nederland",
    knowsAbout: ["Webdevelopment", ...content.stack, "Strapi", "Tailwind CSS"],
  };

  return (
    <html lang="nl">
      <body>
        <a className="skip-link" href="#main-content">Ga naar de inhoud</a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer tagline={content.footerTagline} contact={content.contact} trackingEnabled={trackingEnabled} />
        <TrackingConsent tracking={content.tracking} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
