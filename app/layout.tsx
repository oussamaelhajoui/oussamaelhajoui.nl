import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const siteUrl = "https://oussamaelhajoui.nl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Oussama El Hajoui — Software engineer",
    template: "%s | Oussama El Hajoui",
  },
  description:
    "Snelle websites en web apps met React, Angular, Java en C#. Rechtstreeks samenwerken met software engineer Oussama El Hajoui.",
  applicationName: "Oussama El Hajoui",
  authors: [{ name: "Oussama El Hajoui", url: siteUrl }],
  creator: "Oussama El Hajoui",
  publisher: "Oussama El Hajoui",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: siteUrl,
    siteName: "Oussama El Hajoui",
    title: "Oussama El Hajoui — Software engineer",
    description: "Snelle websites en web apps die helder voelen en hard werken.",
    images: [{ url: "/og.png", width: 1200, height: 628, alt: "Oussama El Hajoui — Websites en web apps die presteren" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oussama El Hajoui — Software engineer",
    description: "Snelle websites en web apps die helder voelen en hard werken.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }], shortcut: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07172f",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Oussama El Hajoui",
  url: siteUrl,
  image: `${siteUrl}/oussamaelhajoui-logo.png`,
  description: "Software engineer voor snelle websites en web apps met React, Angular, Java en C#.",
  areaServed: "Nederland",
  knowsAbout: ["Webdevelopment", "React", "Angular", "Java", "C#", "Strapi", "Tailwind CSS"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>
        <a className="skip-link" href="#main-content">Ga naar de inhoud</a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
