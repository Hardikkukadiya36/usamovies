import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';
const siteName = '123Movies USA';
const siteDescription = 'Watch free HD movies and TV shows online in USA. Stream latest Hollywood blockbusters, TV series, and more - no registration required!';

// SEO Keywords
const primaryKeywords = [
  '123movies', '123movies free', '123movies USA', 'free movie streaming', 'watch movies online free',
  '123movies alternative', '123movies unblocked', '123movies free streaming', '123movies watch online',
  '123movies official', '123movies new site', '123movies proxy', '123movies mirror', '123movies unblocked 2024',
  'free movies online', 'stream movies free', 'HD movies online', 'watch free movies 2024', '123movies.llc',
  'free streaming', 'no registration movies', 'HD streaming'
];

const secondaryKeywords = [
  '123movies hub', '123movies website', '123movies free movies', '123movies free tv shows',
  '123movies unblocked mirror', '123movies unblocked proxy', '123movies unblocked new site',
  '123movies unblocked github', '123movies unblocked reddit', '123movies unblocked 2024 reddit',
  '123movies unblocked 2024 github', '123movies unblocked 2024 proxy', '123movies unblocked 2024 mirror'
];

export const metadata: Metadata = {
  verification: {
    google: 'nNve0mirDxFtpeaYyprm-9aEUDceo_LWdGwQpyVRDPs',
  },
  icons: {
    icon: [
      { url: '/favicon.jpg', sizes: 'any' },
      { url: '/favicon.jpg', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.jpg', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.jpg', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.jpg' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.jpg',
        color: '#2ea043',
      },
    ],
  },
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Watch Free HD Movies & TV Shows Online`,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: [...primaryKeywords, ...secondaryKeywords],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteName} - Watch Free HD Movies & TV Shows Online`,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Watch Free HD Movies & TV Shows Online`,
    description: siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Google Analytics Measurement ID
  const GA_MEASUREMENT_ID = 'G-FZM7QWGJ7E';
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "123Movies",
              "url": "https://yourdomain.com",
              "description": "Watch free movies online in HD quality. Stream the latest Hollywood, Bollywood movies, TV shows, and web series.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://yourdomain.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
