import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// TODO: replace with your real production domain once deployed
const SITE_URL = "https://consultation.bhomeo.in/";
const SITE_NAME = "B-Homeo Wellness";
const SITE_TITLE = "B-Homeo Wellness | Online Homeopathy Consultation for ADHD & Child Development";
const SITE_DESCRIPTION =
  "Personalised online homeopathy consultations for children with ADHD, speech delay, hyperactivity, and impulsive behaviour. Book a consultation with B-Homeo Wellness and get medicines delivered to your home.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "homeopathy for ADHD",
    "child speech delay treatment",
    "online homeopathy consultation",
    "hyperactivity treatment for kids",
    "B-Homeo Wellness",
    "paediatric homeopathy",
    "child development consultation India",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "Health",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // TODO: add once you register with Google Search Console / Bing Webmaster
  // verification: {
  //   google: "your-google-site-verification-code",
  // },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000d44",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full overflow-x-hidden antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              image: `${SITE_URL}/og-image.png`,
              telephone: "+91-7719996771",
              email: "admin@bhomeo.in",
              medicalSpecialty: "Homeopathy",
              areaServed: "IN",
              sameAs: [
                "https://www.facebook.com/people/BHomeo-Wellness/61591248306950/",
                "https://www.instagram.com/bhomeowellness",
                "https://www.youtube.com/channel/UCfn4k3Dpc5OuzrBASGyrbXA",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        <BackToTop />
        
        {/* Google Ads (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18360214394"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18360214394');
          `}
        </Script>
      </body>
    </html>
  );
}