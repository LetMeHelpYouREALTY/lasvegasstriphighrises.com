import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import SchemaScript from "@/components/SchemaScript";
import { generateLocalBusinessSchema } from "@/lib/gbp-schema";
import { generateWebSiteSchema, combineSchemas } from "@/lib/schema";
import { nap } from "@/lib/nap";

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get("x-domain") || "";
  const config = getDomainConfig(domain);
  return {
    metadataBase: new URL(nap.url),
    title: {
      default: `${config.neighborhood} Real Estate | ${nap.shortName}, ${nap.jobTitle} | BHHS Nevada`,
      template: `%s | ${nap.shortName} | BHHS Nevada`,
    },
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: nap.shortName }],
    openGraph: {
      title: config.heroHeadline,
      description: config.description,
      type: "website",
      url: nap.url,
      images: [
        {
          url: "/images/hero/las-vegas-homes-hero.webp",
          width: 1376,
          height: 768,
          alt: "Las Vegas Valley homes with desert mountain views",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: config.heroHeadline,
      description: config.description,
    },
    other: {
      "geo.region": "US-NV",
      "geo.placename": "Las Vegas",
      "geo.position": `${nap.geo.latitude};${nap.geo.longitude}`,
      ICBM: `${nap.geo.latitude}, ${nap.geo.longitude}`,
    },
  };
}

const globalSchema = combineSchemas(
  generateLocalBusinessSchema(),
  generateWebSiteSchema()
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <SchemaScript schema={globalSchema} id="gbp-localbusiness" />
        <link rel="preconnect" href="https://em.realscout.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <Script id="widget-tracker" strategy="afterInteractive">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <div id="main-content">{children}</div>
        <Analytics />
        <Script
          src="https://em.realscout.com/widgets/current/dist/rs-em.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
                {/* Google Tag */}
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_ID && (
          <>
            <Script
              id="google-tag"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-tag-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}');
              `}
            </Script>
          </>
        )}
{/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
