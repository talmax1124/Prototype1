// Notion Integration Service
class NotionService {
    constructor() {
        // Backend API URL
        this.backendUrl = 'http://localhost:3001/api';
        this.demoMode = false; // Use backend API
        
        // Initialize demo storage as fallback
        this.initializeDemoStorage();
    }

    initializeDemoStorage() {
        // Create demo storage in localStorage as fallback
        const dbTypes = ['applications', 'feedback', 'buttonClicks', 'pageViews'];
        dbTypes.forEach(dbType => {
            const key = `demo_notion_${dbType}`;
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify([]));
            }
        });
    }

    async callBackendAPI(endpoint, data) {
        try {
            const response = await fetch(`${this.backendUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Data successfully sent to backend:', result);
            return result;
        } catch (error) {
            console.error('Error calling backend API:', error);
            // Fallback to demo storage
            return this.appendToDemoStorage('fallback', data);
        }
    }

    appendToDemoStorage(databaseKey, data) {
        try {
            const key = `demo_notion_${databaseKey}`;
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            existing.push({
                id: `demo_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
                created_time: new Date().toISOString(),
                properties: data
            });
            localStorage.setItem(key, JSON.stringify(existing));
            
            console.log(`[DEMO MODE] Data saved locally for Notion ${databaseKey}:`, data);
            console.log(`[DEMO MODE] Total records for ${databaseKey}:`, existing.length);
            
            return { success: true, demo: true, recordCount: existing.length };
        } catch (error) {
            console.error('Error saving to demo storage:', error);
            return { success: false, error: error.message };
        }
    }

    async logJobApplication(applicationData) {
        const data = {
            name: applicationData.name,
            email: applicationData.email,
            phone: applicationData.phone || '',
            jobTitle: applicationData.jobTitle,
            company: applicationData.company,
            jobId: applicationData.jobId,
            coverLetter: applicationData.coverLetter || ''
        };

        return await this.callBackendAPI('/job-application', data);
    }

    async logFeedback(feedbackData) {
        const data = {
            type: feedbackData.type,
            message: feedbackData.message,
            email: feedbackData.email || '',
            url: window.location.href
        };

        return await this.callBackendAPI('/feedback', data);
    }

    async logButtonClick(buttonData) {
        const data = {
            buttonType: buttonData.buttonType,
            buttonText: buttonData.buttonText,
            targetValue: buttonData.targetValue || '',
            section: buttonData.section || '',
            url: window.location.href
        };

        return await this.callBackendAPI('/button-click', data);
    }

    async logPageView(pageData) {
        const data = {
            page: pageData.page,
            section: pageData.section || '',
            referrer: document.referrer || '',
            url: window.location.href
        };

        return await this.callBackendAPI('/page-view', data);
    }

    // Method to export demo data (for testing purposes)
    exportDemoData() {
        const data = {};
        Object.keys(this.databases).forEach(dbType => {
            const key = `demo_notion_${dbType}`;
            data[dbType] = JSON.parse(localStorage.getItem(key) || '[]');
        });
        
        console.log('Demo data export:', data);
        return data;
    }

    // Method to clear demo data
    clearDemoData() {
        Object.keys(this.databases).forEach(dbType => {
            const key = `demo_notion_${dbType}`;
            localStorage.removeItem(key);
        });
        this.initializeDemoStorage();
        console.log('Demo data cleared and reinitialized');
    }

    // Get summary of collected data
    getDataSummary() {
        const summary = {};
        Object.keys(this.databases).forEach(dbType => {
            const key = `demo_notion_${dbType}`;
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            summary[dbType] = {
                recordCount: data.length,
                lastUpdated: data.length > 0 ? data[data.length - 1].created_time : null
            };
        });
        
        console.log('Data summary:', summary);
        return summary;
    }
}

// Initialize the service
const notionService = new NotionService();

// Add console helper methods for debugging
window.exportDemoData = () => notionService.exportDemoData();
window.clearDemoData = () => notionService.clearDemoData();
window.getDataSummary = () => notionService.getDataSummary();

// Log initialization
document.addEventListener('DOMContentLoaded', function() {
    if (notionService.demoMode) {
        console.log('Notion service initialized in DEMO MODE');
        console.log('Use exportDemoData() in console to see collected data');
        console.log('Use getDataSummary() to see data summary');
        console.log('Use clearDemoData() to reset all data');
    }
});