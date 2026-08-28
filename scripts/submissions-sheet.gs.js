/* =============================================================================
   B Homeo Wellness — Google Apps Script webhook
   Receives every website submission and appends one row to the right tab.

   DEPLOY
   1. Open the target Google Sheet → Extensions → Apps Script.
   2. Paste this file's contents, save.
   3. (Optional) Project Settings → Script Properties → add
        WEBHOOK_SECRET = <same value as GOOGLE_APPS_SCRIPT_SECRET in .env>
      Leave it unset to accept unauthenticated posts.
   4. Deploy → New deployment → Web app
        Execute as: Me
        Who has access: Anyone
   5. Copy the /exec URL into .env as GOOGLE_APPS_SCRIPT_URL.
   6. After ANY edit here: Deploy → Manage deployments → Edit → New version.

   PAYLOADS (all share the same generic shape)
     /api/submissions      → sheetName "Form Leads" | "anxiety-leads"
                             row: [Timestamp, Source, Name, Phone, Email, URL, TeleCRM]
     /api/razorpay/webhook → sheetName "homeo-payments" | "anxiety-payments"
                             row: [Timestamp, Source, Name, Phone, Email, Amount,
                                   Payment Status, Payment ID, Order ID, Method, URL]

   The script is generic: it writes `headers` (once, on a new tab) and appends
   `row` to `sheetName`. No payload-specific logic is required here.
   ============================================================================ */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return _json({ success: false, error: 'No data received' });
    }

    var data = JSON.parse(e.postData.contents);

    // Optional shared-secret check.
    var required = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');
    if (required && String(data.webhookSecret || '') !== required) {
      return _json({ success: false, error: 'Unauthorized' });
    }

    var sheetName = String(data.sheetName || 'Form Leads');
    var headers = Array.isArray(data.headers) && data.headers.length
      ? data.headers
      : ['Timestamp', 'Source', 'Name', 'Phone', 'Email', 'URL', 'TeleCRM'];

    var row = Array.isArray(data.row) && data.row.length
      ? data.row
      : [
          data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          data.source || '',
          data.name || '',
          data.phone || '',
          data.email || '',
          data.pageUrl || data.url || '',
          data.telecrm || '',
        ];

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#000d44')
        .setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow(row);

    return _json({ success: true, sheet: sheetName, row: sheet.getLastRow() });
  } catch (err) {
    return _json({ success: false, error: String(err) });
  }
}

function doGet() {
  return _json({ success: true, status: 'B Homeo Wellness submissions webhook is live' });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* --- Manual test helpers (run from the Apps Script editor) ------------------ */

function _testLead() {
  doPost({ postData: { contents: JSON.stringify({
    sheetName: 'Form Leads',
    headers: ['Timestamp', 'Source', 'Name', 'Phone', 'Email', 'URL', 'TeleCRM'],
    row: [new Date().toLocaleString('en-IN'), 'Homeo-Form-Leads', 'Test Lead',
          '9876543210', 'test@example.com', 'https://example.com', 'Synced'],
  }) } });
}

function _testPayment() {
  doPost({ postData: { contents: JSON.stringify({
    sheetName: 'homeo-payments',
    headers: ['Timestamp', 'Source', 'Name', 'Phone', 'Email', 'Amount',
              'Payment Status', 'Payment ID', 'Order ID', 'Method', 'URL'],
    row: [new Date().toLocaleString('en-IN'), 'Homeo-Payment', 'Test Lead',
          '9876543210', 'test@example.com', 'INR 199.00', 'Paid',
          'pay_TEST123', 'order_TEST123', 'upi', 'https://example.com'],
  }) } });
}
