// Google Apps Script backend placeholder.
// Add Google Sheets / Google Drive integration here.

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: "ShadiCard API is running"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
