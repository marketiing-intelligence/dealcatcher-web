"use client";

import { useEffect } from "react";
import Script from "next/script";

interface MetaPixelProps {
  pixelId: string;
}

/**
 * Meta Pixel component for client-side tracking
 * Tracks PageView automatically and provides fbq() for custom events
 *
 * Usage in layout.tsx:
 * {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
 *   <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
 * )}
 */
export function MetaPixel({ pixelId }: MetaPixelProps) {
  useEffect(() => {
    // Initialize pixel and track PageView after script loads
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("init", pixelId);
      (window as any).fbq("track", "PageView");
    }
  }, [pixelId]);

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

/**
 * Type-safe wrapper for fbq() calls
 * Use this in your components to track custom events
 *
 * Example:
 * trackMetaEvent('Lead', { content_name: 'Contact Form' });
 */
export function trackMetaEvent(
  eventName: string,
  parameters?: Record<string, any>
) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, parameters);
  }
}

/**
 * Track custom conversion event
 * Use for actions like button clicks, form interactions
 *
 * Example:
 * trackMetaCustomEvent('CalculatorUsed', { value: 500 });
 */
export function trackMetaCustomEvent(
  eventName: string,
  parameters?: Record<string, any>
) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("trackCustom", eventName, parameters);
  }
}
