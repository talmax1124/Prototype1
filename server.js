const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Notion client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

// Middleware
app.use(cors());
app.use(express.json());

// Database IDs from environment variables
const databases = {
    applications: process.env.NOTION_APPLICATIONS_DB,
    feedback: process.env.NOTION_FEEDBACK_DB,
    buttonClicks: process.env.NOTION_BUTTON_CLICKS_DB,
    pageViews: process.env.NOTION_PAGE_VIEWS_DB
};

// Helper function to add data to Notion
async function addToNotionDatabase(databaseId, properties) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: properties
        });
        return { success: true, data: response };
    } catch (error) {
        console.error('Notion API Error:', error);
        return { success: false, error: error.message };
    }
}

// API Routes

// Job Applications
app.post('/api/job-application', async (req, res) => {
    const { name, email, phone, jobTitle, company, jobId, coverLetter } = req.body;
    
    const properties = {
        'Name': {
            title: [{ text: { content: name } }]
        },
        'Email': {
            email: email
        },
        'Phone': {
            phone_number: phone || ''
        },
        'Job Title': {
            rich_text: [{ text: { content: jobTitle } }]
        },
        'Company': {
            rich_text: [{ text: { content: company } }]
        },
        'Job ID': {
            rich_text: [{ text: { content: jobId.toString() } }]
        },
        'Cover Letter': {
            rich_text: [{ text: { content: coverLetter || '' } }]
        },
        'Applied Date': {
            date: { start: new Date().toISOString().split('T')[0] }
        }
    };

    const result = await addToNotionDatabase(databases.applications, properties);
    
    if (result.success) {
        res.json({ success: true, message: 'Application submitted successfully' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// Feedback
app.post('/api/feedback', async (req, res) => {
    const { type, message, email, url } = req.body;
    
    const properties = {
        'Type': {
            select: { name: type }
        },
        'Message': {
            rich_text: [{ text: { content: message } }]
        },
        'Email': {
            email: email || null
        },
        'Date': {
            date: { start: new Date().toISOString().split('T')[0] }
        },
        'URL': {
            url: url
        }
    };

    const result = await addToNotionDatabase(databases.feedback, properties);
    
    if (result.success) {
        res.json({ success: true, message: 'Feedback submitted successfully' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// Button Clicks
app.post('/api/button-click', async (req, res) => {
    const { buttonType, buttonText, targetValue, section, url } = req.body;
    
    const properties = {
        'Button Type': {
            rich_text: [{ text: { content: buttonType } }]
        },
        'Button Text': {
            rich_text: [{ text: { content: buttonText } }]
        },
        'Target Value': {
            rich_text: [{ text: { content: targetValue || '' } }]
        },
        'Section': {
            rich_text: [{ text: { content: section || '' } }]
        },
        'URL': {
            url: url
        },
        'Date': {
            date: { start: new Date().toISOString().split('T')[0] }
        }
    };

    const result = await addToNotionDatabase(databases.buttonClicks, properties);
    
    if (result.success) {
        res.json({ success: true, message: 'Button click logged successfully' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// Page Views
app.post('/api/page-view', async (req, res) => {
    const { page, section, referrer, url } = req.body;
    
    const properties = {
        'Page': {
            rich_text: [{ text: { content: page } }]
        },
        'Section': {
            rich_text: [{ text: { content: section || '' } }]
        },
        'Referrer': {
            url: referrer || null
        },
        'URL': {
            url: url
        },
        'Date': {
            date: { start: new Date().toISOString().split('T')[0] }
        }
    };

    const result = await addToNotionDatabase(databases.pageViews, properties);
    
    if (result.success) {
        res.json({ success: true, message: 'Page view logged successfully' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'UNF Career Hub API is running' });
});

// Start server
app.listen(port, () => {
    console.log(`UNF Career Hub API server running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/api/health`);
});