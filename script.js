// Job listings data - will be populated from API
let jobListings = [];

// Job API service
class JobService {
    constructor() {
        this.baseURL = 'https://remotive.io/api/remote-jobs';
        this.fallbackJobs = this.generateFallbackJobs();
    }

    async fetchJobs(location = 'jacksonville', limit = 50) {
        try {
            // Fetch from Remotive API (for remote jobs)
            const remoteResponse = await fetch(`${this.baseURL}?limit=${limit}`);
            if (!remoteResponse.ok) throw new Error('Remote API failed');
            
            const remoteData = await remoteResponse.json();
            const remoteJobs = this.transformRemoteJobs(remoteData.jobs || []);

            // Combine with local Jacksonville jobs
            const localJobs = this.generateJacksonvilleJobs();
            
            return [...localJobs, ...remoteJobs.slice(0, 30)];
        } catch (error) {
            console.warn('API fetch failed, using fallback data:', error);
            return this.fallbackJobs;
        }
    }

    transformRemoteJobs(jobs) {
        return jobs.map((job, index) => ({
            id: `remote_${index + 1000}`,
            title: job.title || 'Remote Position',
            company: job.company_name || 'Remote Company',
            location: 'Remote',
            type: this.inferJobType(job.title),
            major: this.inferMajor(job.title, job.description),
            description: job.description ? job.description.substring(0, 200) + '...' : 'Remote opportunity with flexible working arrangements.',
            tags: this.extractTags(job.title, job.description),
            salary: job.salary || 'Competitive',
            posted: this.formatDate(job.publication_date) || 'Recently posted',
            url: job.url
        }));
    }

    generateJacksonvilleJobs() {
        return [
            {
                id: 1,
                title: "Software Engineering Intern",
                company: "Tech Solutions Jacksonville",
                location: "Jacksonville, FL",
                type: "internship",
                major: "computer-science",
                description: "Join our development team to work on cutting-edge web applications. Perfect for computer science students looking to gain real-world experience in Jacksonville's growing tech scene.",
                tags: ["JavaScript", "React", "Node.js", "Internship"],
                salary: "$18-22/hour",
                posted: "2 days ago"
            },
            {
                id: 2,
                title: "Marketing Coordinator",
                company: "Jacksonville Digital Agency",
                location: "Jacksonville, FL",
                type: "entry-level",
                major: "business",
                description: "Support our marketing team with campaigns, content creation, and market research. Located in downtown Jacksonville with great growth opportunities.",
                tags: ["Marketing", "Social Media", "Content Creation", "Digital"],
                salary: "$35,000-42,000/year",
                posted: "1 day ago"
            },
            {
                id: 3,
                title: "Elementary Teaching Assistant",
                company: "Duval County Schools",
                location: "Jacksonville, FL",
                type: "part-time",
                major: "education",
                description: "Assist teachers in classroom management and student support. Perfect for education majors gaining classroom experience in Duval County.",
                tags: ["Education", "Teaching", "Student Support", "Part-time"],
                salary: "$12-15/hour",
                posted: "3 days ago"
            },
            {
                id: 4,
                title: "Business Analyst Trainee",
                company: "CSX Transportation",
                location: "Jacksonville, FL",
                type: "entry-level",
                major: "business",
                description: "Entry-level position analyzing business processes at CSX headquarters. Great stepping stone for recent graduates in Jacksonville.",
                tags: ["Analytics", "Excel", "Transportation", "Entry Level"],
                salary: "$48,000-55,000/year",
                posted: "5 days ago"
            },
            {
                id: 5,
                title: "Nursing Student Extern",
                company: "UF Health Jacksonville",
                location: "Jacksonville, FL",
                type: "internship",
                major: "health-sciences",
                description: "Gain hands-on clinical experience in our state-of-the-art medical facility. Perfect for nursing students in their final year.",
                tags: ["Healthcare", "Nursing", "Clinical", "Hospital"],
                salary: "$16-19/hour",
                posted: "2 days ago"
            },
            {
                id: 6,
                title: "Graphic Design Intern",
                company: "VyStar Credit Union",
                location: "Jacksonville, FL",
                type: "internship",
                major: "arts",
                description: "Work with our creative team on branding projects and marketing materials. Build your portfolio while gaining professional experience.",
                tags: ["Design", "Photoshop", "Branding", "Creative"],
                salary: "$14-17/hour",
                posted: "4 days ago"
            },
            {
                id: 7,
                title: "Public Administration Intern",
                company: "City of Jacksonville",
                location: "Jacksonville, FL",
                type: "internship",
                major: "public",
                description: "Support city planning and public policy initiatives. Ideal for students interested in government and public service.",
                tags: ["Government", "Public Policy", "Administration", "Civic"],
                salary: "$15-18/hour",
                posted: "6 days ago"
            },
            {
                id: 8,
                title: "Financial Analyst Intern",
                company: "Fidelity National Financial",
                location: "Jacksonville, FL",
                type: "internship",
                major: "business",
                description: "Gain experience in financial analysis and reporting at one of Jacksonville's major financial services companies.",
                tags: ["Finance", "Analysis", "Reporting", "Financial Services"],
                salary: "$20-24/hour",
                posted: "1 week ago"
            },
            {
                id: 9,
                title: "Mechanical Engineering Co-op",
                company: "Anheuser-Busch",
                location: "Jacksonville, FL",
                type: "internship",
                major: "engineering",
                description: "6-month co-op program working on manufacturing processes and equipment optimization at our Jacksonville brewery.",
                tags: ["Engineering", "Manufacturing", "Process Improvement", "Co-op"],
                salary: "$20-25/hour",
                posted: "1 week ago"
            },
            {
                id: 10,
                title: "Communications Specialist",
                company: "Jacksonville University",
                location: "Jacksonville, FL",
                type: "part-time",
                major: "arts",
                description: "Support university communications and marketing efforts. Great opportunity for communications or journalism students.",
                tags: ["Communications", "Marketing", "University", "Writing"],
                salary: "$15-18/hour",
                posted: "3 days ago"
            }
        ];
    }

    generateFallbackJobs() {
        return this.generateJacksonvilleJobs();
    }

    inferJobType(title) {
        const titleLower = title.toLowerCase();
        if (titleLower.includes('intern') || titleLower.includes('co-op') || titleLower.includes('extern')) return 'internship';
        if (titleLower.includes('entry') || titleLower.includes('junior') || titleLower.includes('trainee')) return 'entry-level';
        if (titleLower.includes('part-time') || titleLower.includes('part time')) return 'part-time';
        return 'full-time';
    }

    inferMajor(title, description = '') {
        const text = (title + ' ' + description).toLowerCase();
        if (text.includes('software') || text.includes('developer') || text.includes('programming') || text.includes('coding')) return 'computer-science';
        if (text.includes('business') || text.includes('marketing') || text.includes('finance') || text.includes('analyst')) return 'business';
        if (text.includes('engineering') || text.includes('engineer')) return 'engineering';
        if (text.includes('teaching') || text.includes('education') || text.includes('tutor')) return 'education';
        if (text.includes('health') || text.includes('medical') || text.includes('nurse') || text.includes('clinical')) return 'health-sciences';
        if (text.includes('design') || text.includes('creative') || text.includes('art') || text.includes('communication')) return 'arts';
        if (text.includes('public') || text.includes('government') || text.includes('policy') || text.includes('administration')) return 'public';
        return 'business';
    }

    extractTags(title, description = '') {
        const text = (title + ' ' + description).toLowerCase();
        const tags = [];
        
        const techTags = ['javascript', 'python', 'react', 'node.js', 'java', 'sql', 'html', 'css'];
        const businessTags = ['marketing', 'analytics', 'excel', 'finance', 'sales'];
        const generalTags = ['remote', 'internship', 'entry level', 'part-time', 'full-time'];
        
        [...techTags, ...businessTags, ...generalTags].forEach(tag => {
            if (text.includes(tag.toLowerCase())) {
                tags.push(tag.charAt(0).toUpperCase() + tag.slice(1));
            }
        });
        
        return tags.length > 0 ? tags.slice(0, 4) : ['Opportunity'];
    }

    formatDate(dateString) {
        if (!dateString) return null;
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) return '1 day ago';
            if (diffDays < 7) return `${diffDays} days ago`;
            if (diffDays < 14) return '1 week ago';
            return `${Math.ceil(diffDays / 7)} weeks ago`;
        } catch {
            return 'Recently posted';
        }
    }
}

// Initialize job service
const jobService = new JobService();

// Major categories data
const majorCategories = {
    "all": {
        title: "All Majors",
        description: "Explore opportunities across all academic disciplines",
        majors: [
            { name: "Business Administration", icon: "fas fa-briefcase", jobs: 45 },
            { name: "Computer Science", icon: "fas fa-laptop-code", jobs: 38 },
            { name: "Engineering", icon: "fas fa-cogs", jobs: 32 },
            { name: "Education", icon: "fas fa-chalkboard-teacher", jobs: 28 },
            { name: "Health Sciences", icon: "fas fa-user-md", jobs: 25 },
            { name: "Arts & Letters", icon: "fas fa-palette", jobs: 22 },
            { name: "Public Service", icon: "fas fa-balance-scale", jobs: 18 }
        ]
    },
    "business": {
        title: "Business",
        description: "Opportunities in business, finance, marketing, and management",
        majors: [
            { name: "Business Administration", icon: "fas fa-briefcase", jobs: 28 },
            { name: "Marketing", icon: "fas fa-chart-line", jobs: 15 },
            { name: "Finance", icon: "fas fa-dollar-sign", jobs: 12 },
            { name: "Management", icon: "fas fa-users-cog", jobs: 10 },
            { name: "Accounting", icon: "fas fa-calculator", jobs: 8 }
        ]
    },
    "computer-science": {
        title: "Computer Science",
        description: "Technology and software development opportunities",
        majors: [
            { name: "Software Engineering", icon: "fas fa-code", jobs: 22 },
            { name: "Web Development", icon: "fas fa-globe", jobs: 18 },
            { name: "Data Science", icon: "fas fa-database", jobs: 15 },
            { name: "Cybersecurity", icon: "fas fa-shield-alt", jobs: 12 },
            { name: "Mobile Development", icon: "fas fa-mobile-alt", jobs: 8 }
        ]
    },
    "engineering": {
        title: "Engineering",
        description: "Engineering positions across multiple disciplines",
        majors: [
            { name: "Mechanical Engineering", icon: "fas fa-cogs", jobs: 15 },
            { name: "Civil Engineering", icon: "fas fa-road", jobs: 12 },
            { name: "Electrical Engineering", icon: "fas fa-bolt", jobs: 10 },
            { name: "Industrial Engineering", icon: "fas fa-industry", jobs: 8 },
            { name: "Environmental Engineering", icon: "fas fa-leaf", jobs: 6 }
        ]
    },
    "education": {
        title: "Education",
        description: "Teaching and educational support opportunities",
        majors: [
            { name: "Elementary Education", icon: "fas fa-child", jobs: 12 },
            { name: "Secondary Education", icon: "fas fa-graduation-cap", jobs: 10 },
            { name: "Special Education", icon: "fas fa-heart", jobs: 8 },
            { name: "Educational Leadership", icon: "fas fa-user-tie", jobs: 6 },
            { name: "School Counseling", icon: "fas fa-comments", jobs: 5 }
        ]
    },
    "health-sciences": {
        title: "Health Sciences",
        description: "Healthcare and medical field opportunities",
        majors: [
            { name: "Nursing", icon: "fas fa-user-nurse", jobs: 15 },
            { name: "Health Administration", icon: "fas fa-hospital", jobs: 8 },
            { name: "Physical Therapy", icon: "fas fa-dumbbell", jobs: 6 },
            { name: "Public Health", icon: "fas fa-globe-americas", jobs: 5 },
            { name: "Medical Technology", icon: "fas fa-microscope", jobs: 4 }
        ]
    },
    "arts": {
        title: "Arts & Letters",
        description: "Creative and liberal arts opportunities",
        majors: [
            { name: "Graphic Design", icon: "fas fa-paint-brush", jobs: 10 },
            { name: "Communications", icon: "fas fa-microphone", jobs: 8 },
            { name: "English Literature", icon: "fas fa-book", jobs: 6 },
            { name: "Fine Arts", icon: "fas fa-palette", jobs: 5 },
            { name: "Journalism", icon: "fas fa-newspaper", jobs: 4 }
        ]
    },
    "public": {
        title: "Public Service",
        description: "Government and public sector opportunities",
        majors: [
            { name: "Public Administration", icon: "fas fa-landmark", jobs: 8 },
            { name: "Criminal Justice", icon: "fas fa-balance-scale", jobs: 6 },
            { name: "Political Science", icon: "fas fa-vote-yea", jobs: 5 },
            { name: "Social Work", icon: "fas fa-hands-helping", jobs: 4 },
            { name: "Urban Planning", icon: "fas fa-city", jobs: 3 }
        ]
    }
};

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const searchInput = document.getElementById('job-search');
const searchBtn = document.getElementById('search-btn');
const jobListingsContainer = document.getElementById('job-listings');
const locationFilter = document.getElementById('location-filter');
const typeFilter = document.getElementById('type-filter');
const majorFilter = document.getElementById('major-filter');
const quickFilterBtns = document.querySelectorAll('.filter-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const majorsContent = document.getElementById('majors-content');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    setupEventListeners();
    
    // Track page view
    if (typeof notionService !== 'undefined') {
        notionService.logPageView({
            page: 'home',
            section: 'initialization'
        }).catch(error => {
            console.error('Failed to log page view to Notion:', error);
        });
    }
    
    // Show loading state
    jobListingsContainer.innerHTML = '<div class="loading">Loading job opportunities...</div>';
    
    try {
        // Fetch actual jobs
        jobListings = await jobService.fetchJobs('jacksonville');
        displayJobListings(jobListings);
    } catch (error) {
        console.error('Failed to load jobs:', error);
        // Use fallback data if fetch fails
        jobListings = jobService.fallbackJobs;
        displayJobListings(jobListings);
    }
    
    displayMajorCategory('all');
    updateJobCounts();
}

function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        trackButtonClick('menu', 'Mobile Hamburger', '', 'navigation');
        toggleMobileMenu();
    });
    
    // Search functionality
    searchBtn.addEventListener('click', function() {
        trackButtonClick('search', 'Search Button', searchInput.value, 'search');
        performSearch();
    });
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            trackButtonClick('search', 'Search Enter Key', searchInput.value, 'search');
            performSearch();
        }
    });
    
    // Filter functionality
    locationFilter.addEventListener('change', function() {
        trackButtonClick('filter', 'Location Filter', this.value, 'filters');
        applyFilters();
    });
    typeFilter.addEventListener('change', function() {
        trackButtonClick('filter', 'Type Filter', this.value, 'filters');
        applyFilters();
    });
    majorFilter.addEventListener('change', function() {
        trackButtonClick('filter', 'Major Filter', this.value, 'filters');
        applyFilters();
    });
    
    // Quick filter buttons
    quickFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            trackButtonClick('quick-filter', this.textContent, this.dataset.type, 'quick-filters');
            toggleQuickFilter(this);
        });
    });
    
    // Major tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            trackButtonClick('tab', this.textContent, this.dataset.tab, 'majors');
            switchMajorTab(this);
        });
    });
    
    // Navigation smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            trackButtonClick('navigation', this.textContent, targetId, 'navigation');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                setActiveNavLink(this);
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Scroll spy for navigation
    window.addEventListener('scroll', updateActiveNavOnScroll);
    
    // Feedback chat bubble
    setupFeedbackListeners();
    
    // Sorting functionality
    setupSortingListeners();
    
    // Scroll to top button
    setupScrollToTop();
}

function setupFeedbackListeners() {
    const feedbackToggle = document.getElementById('feedback-toggle');
    const feedbackPanel = document.getElementById('feedback-panel');
    const feedbackClose = document.getElementById('feedback-close');
    const feedbackForm = document.getElementById('feedback-form');
    
    if (feedbackToggle) {
        feedbackToggle.addEventListener('click', function() {
            trackButtonClick('feedback', 'Feedback Toggle', feedbackPanel.classList.contains('active') ? 'close' : 'open', 'feedback');
            feedbackPanel.classList.toggle('active');
        });
    }
    
    if (feedbackClose) {
        feedbackClose.addEventListener('click', function() {
            trackButtonClick('feedback', 'Feedback Close', 'close', 'feedback');
            feedbackPanel.classList.remove('active');
        });
    }
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            trackButtonClick('feedback', 'Feedback Submit', 'submit', 'feedback');
            submitFeedback();
        });
    }
    
    // Close feedback panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.feedback-bubble')) {
            feedbackPanel.classList.remove('active');
        }
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') {
        displayJobListings(jobListings);
        return;
    }
    
    const filteredJobs = jobListings.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    displayJobListings(filteredJobs);
}

function applyFilters() {
    const locationValue = locationFilter.value;
    const typeValue = typeFilter.value;
    const majorValue = majorFilter.value;
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    let filteredJobs = jobListings;
    
    // Apply search filter
    if (searchTerm) {
        filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    // Apply location filter
    if (locationValue) {
        filteredJobs = filteredJobs.filter(job => {
            if (locationValue === 'remote') return job.location.toLowerCase().includes('remote');
            if (locationValue === 'jacksonville') return job.location.toLowerCase().includes('jacksonville');
            if (locationValue === 'florida') return job.location.toLowerCase().includes('fl');
            return true;
        });
    }
    
    // Apply type filter
    if (typeValue) {
        filteredJobs = filteredJobs.filter(job => job.type === typeValue);
    }
    
    // Apply major filter
    if (majorValue) {
        filteredJobs = filteredJobs.filter(job => job.major === majorValue);
    }
    
    displayJobListings(filteredJobs);
}

function toggleQuickFilter(btn) {
    const filterType = btn.dataset.type;
    
    // Toggle active state
    btn.classList.toggle('active');
    
    // Update type filter dropdown
    if (btn.classList.contains('active')) {
        typeFilter.value = filterType;
    } else {
        typeFilter.value = '';
    }
    
    // Remove active class from other quick filter buttons
    quickFilterBtns.forEach(otherBtn => {
        if (otherBtn !== btn) {
            otherBtn.classList.remove('active');
        }
    });
    
    applyFilters();
}

function displayJobListings(jobs) {
    // Update results header
    updateResultsHeader(jobs);
    
    if (jobs.length === 0) {
        jobListingsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No jobs found</h3>
                <p>Try adjusting your search criteria or filters</p>
            </div>
        `;
        return;
    }
    
    jobListingsContainer.innerHTML = jobs.map((job, index) => `
        <div class="job-card" data-job-id="${job.id}" style="animation-delay: ${index * 0.1}s">
            <h3>${job.title}</h3>
            <div class="job-company">${job.company}</div>
            <div class="job-location">
                <i class="fas fa-map-marker-alt"></i>
                ${job.location}
            </div>
            <div class="job-description">${job.description}</div>
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
            </div>
            <div class="job-details">
                <strong>Salary:</strong> ${job.salary} | <strong>Posted:</strong> ${job.posted}
            </div>
            <button class="apply-btn" onclick="applyToJob(${job.id})">
                <i class="fas fa-paper-plane"></i> Apply Now
            </button>
        </div>
    `).join('');
}

function updateResultsHeader(jobs) {
    const resultsHeader = document.getElementById('results-header');
    const resultsCount = document.getElementById('results-count');
    
    if (jobs.length > 0) {
        resultsHeader.style.display = 'flex';
        resultsCount.textContent = `Showing ${jobs.length} job${jobs.length === 1 ? '' : 's'}`;
    } else {
        resultsHeader.style.display = 'none';
    }
}

function applyToJob(jobId) {
    const job = jobListings.find(j => j.id == jobId);
    if (job) {
        // Track apply button click
        trackButtonClick('apply', 'Apply Now', `${job.title} at ${job.company}`, 'job-listings');
        
        if (job.url) {
            // Open external job URL in new tab
            window.open(job.url, '_blank');
        } else {
            // Show application modal or redirect to application form
            showApplicationModal(job);
        }
    }
}

function trackButtonClick(buttonType, buttonText, targetValue, section) {
    const buttonData = {
        buttonType,
        buttonText,
        targetValue,
        section
    };
    
    // Log to Notion
    if (typeof notionService !== 'undefined') {
        notionService.logButtonClick(buttonData).catch(error => {
            console.error('Failed to log button click to Notion:', error);
        });
    }
    
    // Also log to console for debugging
    console.log('Button clicked:', buttonData);
}

function showApplicationModal(job) {
    const modal = document.createElement('div');
    modal.className = 'application-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Apply for ${job.title}</h3>
                <button class="close-modal" onclick="closeApplicationModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <form id="application-form">
                    <div class="form-group">
                        <label for="applicant-name">Full Name:</label>
                        <input type="text" id="applicant-name" required>
                    </div>
                    <div class="form-group">
                        <label for="applicant-email">Email:</label>
                        <input type="email" id="applicant-email" required>
                    </div>
                    <div class="form-group">
                        <label for="applicant-phone">Phone:</label>
                        <input type="tel" id="applicant-phone">
                    </div>
                    <div class="form-group">
                        <label for="cover-letter">Cover Letter:</label>
                        <textarea id="cover-letter" rows="4" placeholder="Tell us why you're interested in this position..."></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" onclick="closeApplicationModal()">Cancel</button>
                        <button type="submit">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('application-form').addEventListener('submit', function(e) {
        e.preventDefault();
        submitApplication(job);
    });
}

function submitApplication(job) {
    const formData = {
        name: document.getElementById('applicant-name').value,
        email: document.getElementById('applicant-email').value,
        phone: document.getElementById('applicant-phone').value,
        coverLetter: document.getElementById('cover-letter').value,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company
    };
    
    // Log to Notion
    if (typeof notionService !== 'undefined') {
        notionService.logJobApplication(formData).catch(error => {
            console.error('Failed to log application to Notion:', error);
        });
    }
    
    // Also log to console for debugging
    console.log('Application submitted:', formData);
    
    closeApplicationModal();
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-notification';
    successMsg.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h4>Application Submitted!</h4>
            <p>Your application for ${job.title} at ${job.company} has been submitted successfully.</p>
        </div>
    `;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        document.body.removeChild(successMsg);
    }, 5000);
}

function closeApplicationModal() {
    const modal = document.querySelector('.application-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

function switchMajorTab(btn) {
    const tabId = btn.dataset.tab;
    
    // Update active tab button
    tabBtns.forEach(tab => tab.classList.remove('active'));
    btn.classList.add('active');
    
    // Display major category content
    displayMajorCategory(tabId);
}

function displayMajorCategory(categoryId) {
    const category = majorCategories[categoryId];
    if (!category) return;
    
    majorsContent.innerHTML = `
        <div class="major-category active">
            <h3>${category.title}</h3>
            <p style="text-align: center; margin-bottom: 2rem; color: #666;">${category.description}</p>
            <div class="major-grid">
                ${category.majors.map(major => `
                    <div class="major-card" onclick="filterByMajor('${major.name.toLowerCase().replace(/\s+/g, '-')}')">
                        <i class="${major.icon}"></i>
                        <h4>${major.name}</h4>
                        <p>Explore career opportunities in ${major.name.toLowerCase()}</p>
                        <div class="major-jobs-count">${major.jobs} opportunities</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function filterByMajor(majorSlug) {
    // Map major slugs to filter values
    const majorMap = {
        'business-administration': 'business',
        'marketing': 'business',
        'finance': 'business',
        'management': 'business',
        'accounting': 'business',
        'software-engineering': 'computer-science',
        'web-development': 'computer-science',
        'data-science': 'computer-science',
        'cybersecurity': 'computer-science',
        'mobile-development': 'computer-science',
        'mechanical-engineering': 'engineering',
        'civil-engineering': 'engineering',
        'electrical-engineering': 'engineering',
        'industrial-engineering': 'engineering',
        'environmental-engineering': 'engineering',
        'elementary-education': 'education',
        'secondary-education': 'education',
        'special-education': 'education',
        'educational-leadership': 'education',
        'school-counseling': 'education',
        'nursing': 'health-sciences',
        'health-administration': 'health-sciences',
        'physical-therapy': 'health-sciences',
        'public-health': 'health-sciences',
        'medical-technology': 'health-sciences',
        'graphic-design': 'arts',
        'communications': 'arts',
        'english-literature': 'arts',
        'fine-arts': 'arts',
        'journalism': 'arts',
        'public-administration': 'public',
        'criminal-justice': 'public',
        'political-science': 'public',
        'social-work': 'public',
        'urban-planning': 'public'
    };
    
    const filterValue = majorMap[majorSlug] || '';
    majorFilter.value = filterValue;
    
    // Scroll to jobs section and apply filter
    document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        applyFilters();
    }, 500);
}

function updateJobCounts() {
    // Update job counts in major categories based on actual job listings
    Object.keys(majorCategories).forEach(categoryKey => {
        const category = majorCategories[categoryKey];
        category.majors.forEach(major => {
            // This is a simplified count - in a real app, you'd count actual jobs
            const count = Math.floor(Math.random() * 30) + 5;
            major.jobs = count;
        });
    });
}

function setActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= bottom) {
            const correspondingLink = document.querySelector(`a[href="#${id}"]`);
            if (correspondingLink) {
                setActiveNavLink(correspondingLink);
            }
        }
    });
}

// Add some dynamic behavior for better UX
window.addEventListener('load', function() {
    // Add a subtle loading animation
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Initialize job cards with animation-ready styles
const style = document.createElement('style');
style.textContent = `
    .job-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(style);

// Feedback submission functionality
function submitFeedback() {
    const feedbackType = document.getElementById('feedback-type').value;
    const feedbackMessage = document.getElementById('feedback-message').value;
    const feedbackEmail = document.getElementById('feedback-email').value;
    
    if (!feedbackType || !feedbackMessage) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const feedbackData = {
        type: feedbackType,
        message: feedbackMessage,
        email: feedbackEmail,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };
    
    // Log to Notion
    if (typeof notionService !== 'undefined') {
        notionService.logFeedback(feedbackData).catch(error => {
            console.error('Failed to log feedback to Notion:', error);
        });
    }
    
    // Also log to console for debugging
    console.log('Feedback submitted:', feedbackData);
    
    // In a real application, you would send this to your backend
    // fetch('/api/feedback', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(feedbackData)
    // });
    
    // Show success message
    showFeedbackSuccess();
    
    // Clear form
    document.getElementById('feedback-form').reset();
}

function showFeedbackSuccess() {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackSuccess = document.getElementById('feedback-success');
    
    // Hide form and show success message
    feedbackForm.style.display = 'none';
    feedbackSuccess.style.display = 'block';
    
    // Reset after 3 seconds
    setTimeout(() => {
        feedbackForm.style.display = 'block';
        feedbackSuccess.style.display = 'none';
        
        // Close feedback panel
        document.getElementById('feedback-panel').classList.remove('active');
    }, 3000);
}

// Sorting functionality
function setupSortingListeners() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortJobs(this.value);
        });
    }
}

function sortJobs(sortBy) {
    let sortedJobs = [...jobListings];
    
    switch (sortBy) {
        case 'title':
            sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'company':
            sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
            break;
        case 'salary':
            sortedJobs.sort((a, b) => {
                // Extract numeric values from salary strings for comparison
                const getSalaryValue = (salary) => {
                    const match = salary.match(/\d+/);
                    return match ? parseInt(match[0]) : 0;
                };
                return getSalaryValue(b.salary) - getSalaryValue(a.salary);
            });
            break;
        case 'posted':
        default:
            sortedJobs.sort((a, b) => {
                // Parse posted dates and sort by recency
                const getDateValue = (posted) => {
                    if (posted.includes('day')) return parseInt(posted.match(/\d+/)?.[0] || '0');
                    if (posted.includes('week')) return parseInt(posted.match(/\d+/)?.[0] || '0') * 7;
                    return 0;
                };
                return getDateValue(a.posted) - getDateValue(b.posted);
            });
            break;
    }
    
    // Apply current filters to sorted jobs
    applyFiltersToJobs(sortedJobs);
}

function applyFiltersToJobs(jobs) {
    const locationValue = locationFilter.value;
    const typeValue = typeFilter.value;
    const majorValue = majorFilter.value;
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    let filteredJobs = jobs;
    
    // Apply search filter
    if (searchTerm) {
        filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    // Apply location filter
    if (locationValue) {
        filteredJobs = filteredJobs.filter(job => {
            if (locationValue === 'remote') return job.location.toLowerCase().includes('remote');
            if (locationValue === 'jacksonville') return job.location.toLowerCase().includes('jacksonville');
            if (locationValue === 'florida') return job.location.toLowerCase().includes('fl');
            return true;
        });
    }
    
    // Apply type filter
    if (typeValue) {
        filteredJobs = filteredJobs.filter(job => job.type === typeValue);
    }
    
    // Apply major filter
    if (majorValue) {
        filteredJobs = filteredJobs.filter(job => job.major === majorValue);
    }
    
    displayJobListings(filteredJobs);
}

// Scroll to top functionality
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Handle click
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}