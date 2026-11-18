import type { Metadata, Viewport } from "next";
import { Manjari } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/cart/CartDrawer";

const manjari = Manjari({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

const siteUrl = "https://shahiana.com";

export const viewport: Viewport = {
  themeColor: "#760604",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shahiana | Est. 2026",
    template: "%s | Shahiana",
  },
  description:
    "Shahiana — Rooted in heritage, rich in tradition. Handcrafted authentic culinary delights & relishes, Est. 2026.",
  keywords: [
    "Shahiana",
    "Shahiana 2026",
    "Artisan Foods",
    "Traditional Taste",
    "Heritage Treats",
    "Gourmet Delights Bangladesh",
  ],
  authors: [{ name: "Shahiana", url: siteUrl }],
  creator: "Shahiana",
  publisher: "Shahiana",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Shahiana",
    title: "Shahiana | Est. 2026",
    description:
      "Rooted in heritage, rich in tradition. Handcrafted authentic culinary delights & relishes.",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Shahiana Est. 2026 Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahiana | Est. 2026",
    description:
      "Rooted in heritage, rich in tradition. Handcrafted authentic culinary delights & relishes.",
    images: ["/logo.png"],
    creator: "@shahiana",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "ecommerce",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Shahiana",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      description:
        "Shahiana - Handcrafted authentic culinary delights & relishes, Est. 2026.",
      sameAs: [
        "https://www.facebook.com/shahianabd",
        "https://www.instagram.com/shahianabd",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "BD",
        addressLocality: "Dhaka",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shahiana",
      description: "Authentic Culinary Delights & Heritage Store",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/main/shop?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "OnlineStore",
      "@id": `${siteUrl}/#store`,
      name: "Shahiana Store",
      url: siteUrl,
      priceRange: "৳৳",
      currenciesAccepted: "BDT",
      paymentAccepted: "Cash, Mobile Banking",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manjari.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-black">
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
