# Notion Integration Setup Guide

This guide will help you set up Notion integration for your UNF Career Hub application.

## Prerequisites

- A Notion account
- Admin access to a Notion workspace

## Step 1: Create a Notion Integration

1. Go to [Notion Developers](https://developers.notion.com/)
2. Click "My integrations" in the top-right corner
3. Click "New integration"
4. Fill in the integration details:
   - **Name**: UNF Career Hub
   - **Logo**: Optional
   - **Associated workspace**: Select your workspace
5. Click "Submit"
6. Copy the **Integration Token** (starts with `secret_`) - you'll need this later

UNF Career Hub

## Step 2: Create Notion Databases

Create four databases in your Notion workspace with the following properties:

### Database 1: Job Applications
**Properties:**
- Name (Title)
- Email (Email)
- Phone (Phone)
- Job Title (Text)
- Company (Text)
- Job ID (Text)
- Cover Letter (Text)
- Applied Date (Date)

### Database 2: Feedback
**Properties:**
- Type (Select) - Options: Bug Report, Feature Request, Improvement Suggestion, General Feedback
- Message (Text)
- Email (Email)
- Date (Date)
- URL (URL)

### Database 3: Button Interactions
**Properties:**
- Button Type (Text)
- Button Text (Text)
- Target Value (Text)
- Section (Text)
- URL (URL)
- Date (Date)

### Database 4: Page Views
**Properties:**
- Page (Text)
- Section (Text)
- Referrer (URL)
- URL (URL)
- Date (Date)

## Step 3: Share Databases with Integration

For each database you created:

1. Click the "Share" button in the top-right corner of the database
2. Click "Invite"
3. Search for your integration name (UNF Career Hub)
4. Select it and click "Invite"
5. Make sure the integration has "Can edit" permissions

## Step 4: Get Database IDs

For each database:

1. Open the database in Notion
2. Copy the URL from your browser
3. The database ID is the 32-character string between the last `/` and the `?` (if there is one)

Example URL: `https://www.notion.so/workspace/My-Database-a1b2c3d4e5f6789012345678901234ab?v=...`
Database ID: `a1b2c3d4e5f6789012345678901234ab`

## Step 5: Update Configuration

1. Open `notion-config.js`
2. Replace the placeholder values:

```javascript
// Replace this line:
this.integrationToken = 'YOUR_NOTION_INTEGRATION_TOKEN';
// With your actual token:
this.integrationToken = 'secret_your_actual_token_here';

// Replace these lines:
this.databases = {
    applications: 'YOUR_APPLICATIONS_DATABASE_ID',
    feedback: 'YOUR_FEEDBACK_DATABASE_ID',
    buttonClicks: 'YOUR_BUTTON_CLICKS_DATABASE_ID',
    pageViews: 'YOUR_PAGE_VIEWS_DATABASE_ID'
};
// With your actual database IDs:
this.databases = {
    applications: 'a1b2c3d4e5f6789012345678901234ab',
    feedback: 'b2c3d4e5f6789012345678901234abcd',
    buttonClicks: 'c3d4e5f6789012345678901234abcdef',
    pageViews: 'd4e5f6789012345678901234abcdef12'
};
```

## Step 6: Test the Integration

1. Open your website in a browser
2. Open the browser's developer console (F12)
3. You should see: "Notion service initialized in DEMO MODE" if tokens aren't configured, or normal operation if they are
4. Try submitting feedback or applying for a job
5. Check your Notion databases to see if data appears

## Demo Mode

The integration includes a demo mode that stores data locally in browser storage when Notion credentials aren't configured. This is useful for:

- Testing the application without setting up Notion
- Development and debugging
- Demonstrating functionality

### Demo Mode Console Commands

When in demo mode, you can use these commands in the browser console:

- `exportDemoData()` - View all collected data
- `getDataSummary()` - See summary of data collection
- `clearDemoData()` - Reset all demo data

## Security Notes

- Never commit your integration token to version control
- Consider using environment variables for production deployments
- The integration token gives access to your Notion workspace - keep it secure
- Review Notion's security best practices

## Troubleshooting

### "Unauthorized" Error
- Check that your integration token is correct
- Ensure the databases are shared with your integration

### "Object not found" Error
- Verify database IDs are correct
- Make sure databases exist and are accessible

### Data Not Appearing
- Check browser console for error messages
- Verify database properties match the expected structure
- Ensure your integration has edit permissions

### CORS Issues
If you encounter CORS errors when calling Notion's API directly from the browser, you may need to:
1. Set up a backend proxy server
2. Use serverless functions (Vercel, Netlify, etc.)
3. Consider using Notion's official JavaScript SDK in a Node.js environment

## Production Deployment

For production use:
1. Never expose your integration token in client-side code
2. Set up a backend API that handles Notion integration
3. Use environment variables for sensitive configuration
4. Implement proper error handling and retry logic
5. Consider rate limiting to respect Notion's API limits

## API Rate Limits

Notion has rate limits on their API:
- 3 requests per second average
- Burst allowance for short periods
- Monitor usage in your Notion integration dashboard

The current implementation includes basic error handling but you may want to add retry logic for production use.