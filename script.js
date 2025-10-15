// Sample job data
const jobListings = [
    {
        id: 1,
        title: "Software Engineering Intern",
        company: "Tech Solutions Inc.",
        location: "Jacksonville, FL",
        type: "internship",
        major: "computer-science",
        description: "Join our development team to work on cutting-edge web applications. Perfect for computer science students looking to gain real-world experience.",
        tags: ["JavaScript", "React", "Node.js", "Internship"],
        salary: "$18-22/hour",
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "Marketing Assistant",
        company: "Digital Marketing Pro",
        location: "Remote",
        type: "part-time",
        major: "business",
        description: "Support our marketing team with social media campaigns, content creation, and market research. Great opportunity for business students.",
        tags: ["Marketing", "Social Media", "Content Creation", "Remote"],
        salary: "$15-18/hour",
        posted: "1 day ago"
    },
    {
        id: 3,
        title: "Elementary Teaching Assistant",
        company: "Duval County Schools",
        location: "Jacksonville, FL",
        type: "part-time",
        major: "education",
        description: "Assist teachers in classroom management and student support. Perfect for education majors gaining classroom experience.",
        tags: ["Education", "Teaching", "Student Support", "Part-time"],
        salary: "$12-15/hour",
        posted: "3 days ago"
    },
    {
        id: 4,
        title: "Mechanical Engineering Co-op",
        company: "Aerospace Dynamics",
        location: "Orlando, FL",
        type: "internship",
        major: "engineering",
        description: "6-month co-op program working on aircraft component design and testing. Hands-on experience with CAD software and prototyping.",
        tags: ["Engineering", "CAD", "Aerospace", "Co-op"],
        salary: "$20-25/hour",
        posted: "1 week ago"
    },
    {
        id: 5,
        title: "Graphic Design Intern",
        company: "Creative Studio Jacksonville",
        location: "Jacksonville, FL",
        type: "internship",
        major: "arts",
        description: "Work with our creative team on branding projects, web design, and print materials. Build your portfolio while gaining professional experience.",
        tags: ["Design", "Photoshop", "Branding", "Creative"],
        salary: "$14-17/hour",
        posted: "4 days ago"
    },
    {
        id: 6,
        title: "Business Analyst Trainee",
        company: "Financial Services Corp",
        location: "Jacksonville, FL",
        type: "entry-level",
        major: "business",
        description: "Entry-level position analyzing business processes and supporting decision-making. Great stepping stone for recent graduates.",
        tags: ["Analytics", "Excel", "Business Process", "Entry Level"],
        salary: "$45,000-50,000/year",
        posted: "5 days ago"
    },
    {
        id: 7,
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
        id: 8,
        title: "Junior Web Developer",
        company: "StartupTech",
        location: "Remote",
        type: "entry-level",
        major: "computer-science",
        description: "Join our fast-growing startup to develop web applications. Remote-friendly position with mentorship opportunities.",
        tags: ["JavaScript", "Python", "Web Development", "Startup"],
        salary: "$50,000-60,000/year",
        posted: "1 day ago"
    },
    {
        id: 9,
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
        id: 10,
        title: "Data Science Intern",
        company: "Analytics Plus",
        location: "Tampa, FL",
        type: "internship",
        major: "computer-science",
        description: "Work with big data and machine learning algorithms. Experience with Python, R, and statistical analysis required.",
        tags: ["Data Science", "Python", "Machine Learning", "Analytics"],
        salary: "$22-26/hour",
        posted: "3 days ago"
    }
];

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

function initializeApp() {
    setupEventListeners();
    displayJobListings(jobListings);
    displayMajorCategory('all');
    updateJobCounts();
}

function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Filter functionality
    locationFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    majorFilter.addEventListener('change', applyFilters);
    
    // Quick filter buttons
    quickFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleQuickFilter(this);
        });
    });
    
    // Major tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            switchMajorTab(this);
        });
    });
    
    // Navigation smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
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
    
    jobListingsContainer.innerHTML = jobs.map(job => `
        <div class="job-card" data-job-id="${job.id}">
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

function applyToJob(jobId) {
    const job = jobListings.find(j => j.id === jobId);
    if (job) {
        alert(`Application submitted for ${job.title} at ${job.company}!\n\nIn a real application, this would redirect to the company's application portal or open an application form.`);
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