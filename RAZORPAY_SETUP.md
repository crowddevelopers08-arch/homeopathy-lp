# Razorpay Integration — B Homeo Wellness

The ₹199 consultation payment now runs on **both landing pages** after the
booking form is submitted.

| Page | Form | Lead source | Thank-you |
|---|---|---|---|
| `/` (homeo) | `components/BookingModal.tsx` | `Homeo-Form-Leads` | `/thank-you` |
| `/anxiety` | `components/anxiety-lp/BookingModal.tsx` | `Anxiety-Form-Leads` | `/anxiety/thank-you` |

Both share `/api/razorpay/create-order`, `/api/razorpay/verify`,
`/api/razorpay/webhook` and the loader `components/razorpay.ts`. The page is
identified by the `flow` field (`"homeo"` | `"anxiety"`) sent to `create-order`,
stored on the order `notes`, and read back by the webhook.

## Visitor flow

1. Visitor fills the booking form and submits.
2. `POST /api/submissions` → the **non-payment lead** is saved (Google Sheet
   `Form Leads` / `anxiety-leads` tab + local CSV + TeleCRM) — exactly as before.
3. Razorpay Checkout opens automatically for ₹199
   (`RAZORPAY_CONSULTATION_AMOUNT`, enforced server-side).
4. **Payment success** → `POST /api/razorpay/verify` (HMAC signature check +
   live payment-status check) → full page redirect to the thank-you page.
5. **Payment cancelled** (checkout closed) → the lead is already saved; the
   modal shows a *“Payment not completed — retry or we’ll call you”* panel with
   a **Retry Payment** button. A plain cancel generates no Razorpay event.
6. **Payment failed** (bank declined) → same retry panel, and Razorpay sends a
   `payment.failed` webhook.

## Webhook (`/api/razorpay/webhook`) — the reliable half

Verifies `x-razorpay-signature` against `RAZORPAY_WEBHOOK_SECRET`
(HMAC-SHA256 over the raw body, constant-time compare), then on
`payment.captured` / `payment.failed`:

- **Google Sheet** — appends a row to `homeo-payments` / `anxiety-payments`
  (Timestamp, Source, Name, Phone, Email, Amount, Payment Status, Payment ID,
  Order ID, Method, URL). Non-payment leads stay in the `*-leads` tabs, so you
  have both.
- **TeleCRM** — pushes payment status + amount + Razorpay IDs as notes onto the
  same lead (matched by phone via the `autoupdatelead` endpoint).

Always responds `200` on a verified event so Razorpay does not retry-duplicate.

## 1. Environment variables (`.env`)

```
RAZORPAY_KEY_ID=rzp_live_xxxxxxxx        # Dashboard → Account & Settings → API Keys
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx     # shown once when the key is generated
RAZORPAY_CONSULTATION_AMOUNT=199         # rupees; converted to paise on the server
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxx     # any string you choose in step 2
```

Use `rzp_test_*` keys + a test secret while testing, then swap to `rzp_live_*`.
`.env` is already git-ignored.

## 2. Razorpay Dashboard → Settings → Webhooks

1. **Add New Webhook.**
2. **URL:** `https://<your-domain>/api/razorpay/webhook`
   (production domain is `https://consultation.bhomeo.in`).
3. **Secret:** the exact string in `RAZORPAY_WEBHOOK_SECRET`.
4. **Active events:** tick **`payment.captured`** and **`payment.failed`**.
5. Save, then use *Send test webhook* → expect `200`.

## 3. Google Apps Script

The canonical script is now in `scripts/submissions-sheet.gs.js`. It is generic
— it appends `row` under `sheetName`, creating the tab + header row on first use
— so it already handles the new `*-payments` tabs with no extra code.

If your deployed script differs: paste `scripts/submissions-sheet.gs.js` into the
Sheet’s Apps Script editor, then **Deploy → Manage deployments → Edit → New
version** (the `/exec` URL stays the same). Test with `_testLead()` and
`_testPayment()` from the editor.

## Local test checklist

- [ ] Submit the form → row appears in `Form Leads` / `anxiety-leads`, lead in TeleCRM.
- [ ] Complete a Razorpay **test** payment → redirected to the thank-you page;
      row appears in `homeo-payments` / `anxiety-payments` as `Paid`.
- [ ] Close checkout without paying → retry panel shows, lead already saved.
- [ ] Use a failing test card → retry panel shows; webhook writes a `Failed` row.
