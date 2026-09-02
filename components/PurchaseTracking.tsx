"use client";

import { useEffect } from "react";

// Fires the "Purchased" conversion once when a visitor lands on a thank-you
// page. Reads the amount + transaction id saved by BookingModal right after the
// payment was verified; falls back to the ₹199 list price if a visitor opens
// the page directly.
//
//  1. pushes an event onto window.dataLayer  → GTM picks it up and can fire any
//     tag you want (GA4 purchase, Google Ads conversion, etc.)
//  2. calls fbq('track', 'Purchase', …)      → the Meta Pixel already loaded in
//     layout.tsx records the Purchase, with an eventID for de-duplication.

// `window.dataLayer` / `window.gtag` are already declared in
// components/anxiety-lp/googleConversionTracker.tsx — only `fbq` is new here.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type PurchaseData = {
  value: number;
  currency: string;
  transactionId?: string;
  orderId?: string;
  item: string;
};

const STORAGE_KEY = "bh_purchase";
const FIRED_KEY = "bh_purchase_fired";
const DEFAULT_VALUE = 199;
const DEFAULT_CURRENCY = "INR";

function readPurchase(fallbackItem: string): PurchaseData {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PurchaseData>;
      return {
        value: Number(parsed.value) > 0 ? Number(parsed.value) : DEFAULT_VALUE,
        currency: parsed.currency || DEFAULT_CURRENCY,
        transactionId: parsed.transactionId,
        orderId: parsed.orderId,
        item: parsed.item || fallbackItem,
      };
    }
  } catch {
    /* private mode / blocked storage — fall through to defaults */
  }
  return { value: DEFAULT_VALUE, currency: DEFAULT_CURRENCY, item: fallbackItem };
}

function waitForFbq(cb: () => void, tries = 20) {
  if (typeof window.fbq === "function") return cb();
  if (tries <= 0) return;
  window.setTimeout(() => waitForFbq(cb, tries - 1), 200);
}

export default function PurchaseTracking({ item }: { item: string }) {
  useEffect(() => {
    const purchase = readPurchase(item);

    // De-dupe: don't re-fire on refresh / back-forward. Keyed by transaction id
    // when we have one, otherwise once per browser session.
    const fireId = purchase.transactionId || "session";
    let alreadyFired = false;
    try {
      alreadyFired = sessionStorage.getItem(FIRED_KEY) === fireId;
      sessionStorage.setItem(FIRED_KEY, fireId);
      // The one-shot payload has been consumed.
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (alreadyFired) return;

    // 1 — GTM data layer ("Purchased" custom event + parameters object)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "Purchased",
      Purchased: {
        value: purchase.value,
        currency: purchase.currency,
        transaction_id: purchase.transactionId || "",
        order_id: purchase.orderId || "",
        items: [{ item_name: purchase.item, price: purchase.value, quantity: 1 }],
      },
    });

    // 2 — Meta Pixel Purchase (pixel base code is in app/layout.tsx)
    waitForFbq(() => {
      window.fbq?.(
        "track",
        "Purchase",
        {
          value: purchase.value,
          currency: purchase.currency,
          content_name: purchase.item,
          content_type: "product",
        },
        purchase.transactionId ? { eventID: purchase.transactionId } : undefined,
      );
    });
  }, [item]);

  return null;
}
