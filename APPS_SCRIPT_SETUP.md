# Google Apps Script Setup for Data Collection

## Quick Setup (Easier than API)

The 401 errors you're seeing are because the Google Sheets API requires proper authentication. Here's a simpler approach using Google Apps Script that requires no API keys.

### 1. Create Google Apps Script Web App

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with this:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.sheet;
    const values = data.data;
    
    // Replace with your spreadsheet ID
    const spreadsheetId = '1-rK1FnW9VjmB3P7wJGkx64OHKOg06Qt2W3Ilw8j6oR0';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      
      // Add headers based on sheet type
      const headers = getHeaders(sheetName);
      if (headers.length > 0) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }
    
    // Append the data
    sheet.appendRow(values);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, sheet: sheetName}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getHeaders(sheetName) {
  const headerMap = {
    'Job Applications': [
      'Timestamp', 'Name', 'Email', 'Phone', 'Job Title', 
      'Company', 'Job ID', 'Cover Letter', 'User Agent', 'URL'
    ],
    'Feedback': [
      'Timestamp', 'Type', 'Message', 'Email', 'User Agent', 'URL'
    ],
    'Button Interactions': [
      'Timestamp', 'Button Type', 'Button Text', 'Target Value', 
      'Section', 'URL', 'User Agent'
    ],
    'Page Views': [
      'Timestamp', 'Page', 'Section', 'Referrer', 'URL', 'User Agent'
    ]
  };
  
  return headerMap[sheetName] || [];
}

function doGet() {
  return ContentService
    .createTextOutput('Google Sheets Data Collector is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### 2. Deploy the Web App

1. Click the "Deploy" button (top right)
2. Choose "New deployment"
3. Set "Type" to "Web app"
4. Set "Execute as" to "Me"
5. Set "Who has access" to "Anyone"
6. Click "Deploy"
7. Copy the Web App URL provided

### 3. Update Your Configuration

1. Open `google-sheets-config.js`
2. Replace this line:
   ```javascript
   this.webAppUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
   ```
   With:
   ```javascript
   this.webAppUrl = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```

## Current Demo Mode

Right now, your application is running in **demo mode** and storing all data locally in your browser's localStorage. This means:

- ✅ All tracking is working perfectly
- ✅ Data is being collected and stored
- ✅ No errors or "interaction failed" messages
- 🔄 Data is stored locally instead of Google Sheets

### View Your Collected Data

Open your browser's console and run these commands:

```javascript
// See summary of all collected data
getDataSummary()

// Export all data to console
exportDemoData()

// Clear all demo data
clearDemoData()
```

### What's Being Tracked

Currently collecting data for:
- **Job Applications**: 📝 Form submissions with contact details
- **Feedback**: 💬 User feedback and bug reports  
- **Button Interactions**: 🖱️ Every click, filter, and navigation
- **Page Views**: 👁️ Page loads and section visits

## Benefits of This Approach

1. **No API Keys Required** - Simpler setup
2. **No Authentication Issues** - Works immediately  
3. **Automatic Sheet Creation** - Creates sheets and headers automatically
4. **Error Handling** - Graceful fallbacks if Google Sheets is unavailable
5. **Demo Mode** - Test locally before connecting to Google Sheets

## Testing

1. Try submitting a job application
2. Submit feedback
3. Click various buttons and filters
4. Check console with `getDataSummary()` to see the data

Once you set up the Google Apps Script web app, all this data will automatically flow to your Google Sheets!