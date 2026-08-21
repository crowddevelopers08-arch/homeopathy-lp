"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export default function GoogleConversionTracker() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-18360214394/z5jiCMWPnuUcEPr6GrrJE",
      });
    }
  }, []);

  return null;
}