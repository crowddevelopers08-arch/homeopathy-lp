# "Purchased" conversion tracking — both thank-you pages

Mirrors the WordPress/GTM plugin setup (Event name `Purchased`, trigger = visit
to the thank-you URL, Meta event type = `Purchase`) — but done natively in the
Next.js app so there is no plugin and no per-URL trigger to maintain.

## Files

| File | Role |
|---|---|
| `components/PurchaseTracking.tsx` | Client component. On mount it fires the conversion once. |
| `app/thank-you/page.tsx` | Renders `<PurchaseTracking item="Online Homeopathy Consultation" />`. |
| `app/anxiety/thank-you/page.tsx` | Renders `<PurchaseTracking item="Anxiety Homeopathy Consultation" />`. |
| `components/BookingModal.tsx` / `components/anxiety-lp/BookingModal.tsx` | After the payment is **verified**, save `{value, currency, transactionId, orderId, item}` to `sessionStorage["bh_purchase"]`, then redirect to the thank-you page. |

## How it works — step by step

1. **Visitor pays.** Razorpay Checkout `handler` runs → `POST /api/razorpay/verify`
   confirms the signature + payment status server-side.
2. **Purchase data is stashed.** On success the BookingModal writes to
   `sessionStorage`:
   ```json
   { "value": 199, "currency": "INR",
     "transactionId": "pay_XXX", "orderId": "order_XXX",
     "item": "Online Homeopathy Consultation" }
   ```
   Then it does a full-page redirect to `/thank-you` (or `/anxiety/thank-you`).
   A full document load — not client-side navigation — so GTM, the Meta Pixel
   and Google Ads all re-initialise and see a fresh page view.
3. **Thank-you page mounts** → `<PurchaseTracking>` runs its `useEffect` once:
   - **Reads** `sessionStorage["bh_purchase"]`. If it's missing (e.g. someone
     opens the URL directly), it falls back to the ₹199 list price with no
     transaction id.
   - **De-dupe guard.** It records the transaction id in
     `sessionStorage["bh_purchase_fired"]` and deletes `bh_purchase`. If the
     visitor refreshes or hits back/forward, the id already matches → it does
     nothing. (No transaction id → fires once per browser session.)
   - **Channel 1 — GTM data layer:**
     ```js
     window.dataLayer.push({
       event: "Purchased",
       Purchased: {
         value, currency, transaction_id, order_id,
         items: [{ item_name, price: value, quantity: 1 }],
       },
     });
     ```
     This is the "custom parameters object" your plugin screenshot refers to.
     GTM sees a **Custom Event** named `Purchased` and can fire any tag off it.
   - **Channel 2 — Meta Pixel (direct):**
     ```js
     fbq("track", "Purchase",
         { value, currency, content_name, content_type: "product" },
         { eventID: transactionId });
     ```
     The Pixel base code is already loaded in `app/layout.tsx`, so this needs
     **no GTM tag**. `eventID` lets Meta de-duplicate if you later add a
     server-side Conversions API `Purchase` with the same id.

## What you still need to do in GTM (one-time)

The Meta `Purchase` already works. To also send **GA4 purchase** and/or a
**Google Ads purchase conversion**, wire them to the data-layer event:

1. **Trigger** → New → *Custom Event*
   - Event name: `Purchased`
   - Fires on: All Custom Events
2. **Variables** → New → *Data Layer Variable* for each field you need:
   `Purchased.value`, `Purchased.currency`, `Purchased.transaction_id`,
   `Purchased.items`
3. **Tag — GA4 event** (if GA4 is in this container)
   - Event name: `purchase`
   - Parameters: `value` = `{{Purchased.value}}`, `currency` =
     `{{Purchased.currency}}`, `transaction_id` = `{{Purchased.transaction_id}}`,
     `items` = `{{Purchased.items}}`
   - Trigger: the `Purchased` trigger above
4. **Tag — Google Ads Conversion** (optional)
   - Conversion ID `AW-18360214394`, and the **purchase** conversion label from
     Google Ads → Goals → Conversions (create a new "Purchase" action if you
     don't have one).
   - Value: `{{Purchased.value}}`, Currency: `{{Purchased.currency}}`,
     Transaction ID: `{{Purchased.transaction_id}}`
   - Trigger: the `Purchased` trigger.
5. **Do NOT** add a Meta *Purchase* tag in GTM — the page already fires it. Two
   would double-count.
6. Submit / publish the container.

## Heads-up: existing Google Ads "lead" conversions on the anxiety page

`app/anxiety/thank-you/page.tsx` still fires two older Google Ads *lead*
conversions (`…/6x1sCl3gqOkcEPrG6rJE` inline, and `…/z5jiCMWPnuUcEPr6GrrJE`
via `GoogleConversionTracker`). Now that this page is only reached after a paid
booking, decide whether those should stay, be relabelled as purchase
conversions in Google Ads, or be removed. `app/thank-you/page.tsx` had no
Google Ads conversion before and still relies on GTM for it.

## Testing

- **GTM Preview** (Tag Assistant): complete a Razorpay **test** payment → on the
  thank-you page you should see the `Purchased` event in the timeline and your
  tags fired once.
- **Meta**: Events Manager → *Test Events*, or the *Meta Pixel Helper* extension
  → one `Purchase` with the right value/currency.
- Refresh the thank-you page → **nothing** should fire again.
