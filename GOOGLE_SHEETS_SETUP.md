# Google Sheets Integration Setup Guide

## Overview
This implementation tracks all user interactions and submissions to Google Sheets, including:
- Job applications
- Feedback submissions  
- Button clicks and interactions
- Page views

## Setup Instructions

### 1. Create a Google Sheets Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "UNF Career Hub Analytics" (or your preferred name)
4. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

### 2. Set up Google Sheets API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "API key"
   - Copy the API key
   - (Optional) Restrict the API key to only the Google Sheets API for security

### 3. Create Sheet Tabs
Create these tabs in your spreadsheet with the exact names:
- **Job Applications**
- **Feedback** 
- **Button Interactions**
- **Page Views**

### 4. Add Headers to Each Sheet

#### Job Applications Tab:
```
Timestamp | Name | Email | Phone | Job Title | Company | Job ID | Cover Letter | User Agent | URL
```

#### Feedback Tab:
```
Timestamp | Type | Message | Email | User Agent | URL
```

#### Button Interactions Tab:
```
Timestamp | Button Type | Button Text | Target Value | Section | URL | User Agent
```

#### Page Views Tab:
```
Timestamp | Page | Section | Referrer | URL | User Agent
```

### 5. Configure the Application
1. Open `google-sheets-config.js`
2. Replace the placeholder values:
   ```javascript
   this.apiKey = 'YOUR_ACTUAL_API_KEY_HERE';
   this.spreadsheetId = 'YOUR_ACTUAL_SPREADSHEET_ID_HERE';
   ```

### 6. Make the Spreadsheet Publicly Writable (Alternative Method)
If you prefer not to use API keys:
1. Share your spreadsheet with "Anyone with the link can edit"
2. Use Google Apps Script to create a web app endpoint
3. Modify the code to post to your web app instead

## Data Collected

### Job Applications
- Applicant contact information
- Job details they applied for
- Cover letter content
- Application timestamp and metadata

### Feedback Submissions
- Feedback type (bug, feature request, etc.)
- Message content
- Optional email for follow-up
- Submission timestamp and metadata

### Button Interactions
- Which buttons users click
- Context of the interaction
- Filters and searches performed
- Navigation patterns

### Page Views
- Page visits and navigation
- Section engagement
- Referrer information
- Session tracking data

## Privacy Notes
- All data collection follows standard web analytics practices
- No personally identifiable information is collected without explicit user consent
- Users can view what data is being collected in the browser console
- Consider adding a privacy policy explaining data collection

## Testing
1. Open the application in your browser
2. Perform various actions (apply to jobs, submit feedback, click buttons)
3. Check your Google Sheets to verify data is being recorded
4. Check browser console for any error messages

## Troubleshooting
- **Data not appearing**: Check API key and spreadsheet ID configuration
- **CORS errors**: Ensure API key is properly configured and has correct permissions
- **Sheet not found errors**: Verify sheet tab names match exactly
- **Rate limiting**: Google Sheets API has usage limits; implement proper error handling for production use

## Security Considerations
- API keys should be kept secure and not exposed in public repositories
- Consider using environment variables for sensitive configuration
- Implement proper error handling and fallback mechanisms
- Regular monitoring of API usage and costs