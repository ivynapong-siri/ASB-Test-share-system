import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/shippori-mincho/400.css";
import "@fontsource/shippori-mincho/600.css";
// Language-specific fonts
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/600.css";
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/600.css";
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/600.css";
import "@fontsource/noto-sans-thai/400.css";
import "@fontsource/noto-sans-thai/600.css";
import "./globals.css";

import { getLocale, getMessages, getTimeZone } from "next-intl/server";
// เพิ่มบรรทัดนี้ (สมมติว่าคุณสร้างไฟล์ไว้ที่ components/shared/)
import { Providers } from "@/client/provider";
import FontLoader from "@/components/shared/font-loader";
import ImagePopup from "@/components/shared/image-popup";
import ServiceWorkerRegister from "@/components/shared/service-worker-register";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import Script from "next/script";

// Export web vitals reporting
export { reportWebVitals } from "@/lib/web-vitals";

// Import local fonts from @fontsource

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [messages, locale, timezone] = await Promise.all([getMessages(), getLocale(), getTimeZone()]);

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const isDev = process.env.NODE_ENV === "development";
  const googleAPIKey = process.env.GOOGLE_MAPS_API_KEY ?? "";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Fonts are now loaded locally via @fontsource - no external requests! */}

        {/* Critical CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical above-the-fold styles */
            body {
              font-family: "Shippori Mincho", "Times New Roman", serif;
              margin: 0;
              padding: 0;
              line-height: 1.6;
            }
            
            /* Prevent layout shifts from font loading */
            .font-montserrat, .font-mono {
              font-family: "Montserrat", "Arial", sans-serif;
            }
            .font-shippori-mincho, .font-sans {
              font-family: "Shippori Mincho", "Times New Roman", serif;
            }
            
            /* Critical layout styles with CLS prevention */
            footer { 
              min-height: 300px;
              height: auto;
              background-color: hsl(216, 72.82%, 20.2%); 
              contain: layout;
              content-visibility: auto;
              will-change: auto;
            }
            .bg-primary-300 { 
              background-color: hsl(216, 72.82%, 20.2%); 
            }
            
            /* Reserve space for footer grid to prevent CLS */
            footer .grid {
              min-height: 50px;
            }
            
            /* Prevent font loading CLS in footer */
            footer * {
              font-family: "Shippori Mincho", "Times New Roman", serif;
            }
            
            /* Optimize rendering */
            * {
              box-sizing: border-box;
            }
            
            /* Prevent FOUC */
            .loading {
              opacity: 0;
              transition: opacity 0.3s ease-in-out;
            }
            .loaded {
              opacity: 1;
            }
          `,
          }}
        />

        <meta name="image-optimization" content="webp,avif" />
        <meta name="image-quality" content="75" />

        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1a365d" />
        <meta name="color-scheme" content="light" />

        {/* AsiaMedia bug report */}
        <Script id="marker-io" strategy="afterInteractive">
          {`
            window.markerConfig = {
              project: '6801fe59b2b28d96f8a6d50c',
              source: 'snippet'
            };
            !function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};
            ["show","hide","isVisible","capture","cancelCapture","unload","reload",
            "isExtensionInstalled","setReporter","clearReporter","setCustomData",
            "on","off"].forEach(function(e){n[e]=function(){
            var r=Array.prototype.slice.call(arguments);
            r.unshift(e),t.push(r)}}),e.Marker=n;
            var s=r.createElement("script");s.async=1,
            s.src="https://edge.marker.io/latest/shim.js";
            var i=r.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(s,i)}}(window,document);
          `}
        </Script>

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TGNTW9PC');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Domain verification meta tags */}
        <meta name="facebook-domain-verification" content="6a8n9hmgtkk59tdjc0udfqlmz76fa1" />
        <meta name="google-site-verification" content="o6SihMMZ0cLKqUJm3rs8fUS_HEAqYW2_PPvYlf7Wx5I" />

        {/* Resource hints for better performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preconnect to WordPress CDN for faster asset loading */}
        <link rel="preconnect" href="https://dcb9450325.nxcli.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//dcb9450325.nxcli.io" />

        {/* Preload critical resources - removed specific paths that cause 404 */}

        {/* Video optimization hints */}
        <meta name="video-optimization" content="lazy-loading,format-optimization" />
        <meta name="video-preload" content="none" />

        {/* Performance and SEO optimizations */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />

        {/* Resource loading hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=no" />

        {/* Critical resource hints */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className={cn(["antialiased", isDev && "debug-screens"])}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TGNTW9PC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <FontLoader />
        <ServiceWorkerRegister />
        <Providers messages={messages} locale={locale} timezone={timezone} googleAPIKey={googleAPIKey}>
          {children}
          <ImagePopup />
        </Providers>

        {/* Marker.io bug tracking script - load only in production and defer
        {!isDev && (
          <Script id="marker-io" strategy="lazyOnload">
            {`
          window.markerConfig = {
            project: '6801fe59b2b28d96f8a6d50c',
            source: 'snippet'
          };

          !function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","clearReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);
        `}
          </Script>
        )} */}
      </body>
    </html>
  );
}
