document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM Elements ---
    const navMenu = document.querySelector('.nav-menu');
    const megaMenu = document.querySelector('.mega-menu');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const appContent = document.getElementById('app-content');
    const navItems = document.querySelectorAll('.nav-item');
    let timeoutId;

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Only trigger accordion on mobile screens
            if (window.innerWidth <= 768) {
                const subMenu = item.nextElementSibling;
                if (subMenu && subMenu.classList.contains('mobile-sub-menu')) {
                    subMenu.classList.toggle('open');

                    // Rotate the caret icon
                    const icon = item.querySelector('i');
                    if (subMenu.classList.contains('open')) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            }
        });
    });

    // --- 2. Mega Menu Hover Logic ---
    if (navMenu && megaMenu) {
        navMenu.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            megaMenu.classList.add('active');
        });

        navMenu.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                if (!megaMenu.matches(':hover')) {
                    megaMenu.classList.remove('active');
                }
            }, 150);
        });

        megaMenu.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
        });

        megaMenu.addEventListener('mouseleave', () => {
            megaMenu.classList.remove('active');
        });
    }

    // --- 3. Mobile Hamburger Menu Logic ---
    // --- 3. Mobile Hamburger Menu Logic ---
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // NEW: Lock body scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }

            const icon = hamburgerBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 4. Single Page Application (SPA) HTML Templates ---
    if (appContent) {
        // Helper function to build the internal pages cleanly
        const buildPage = (title, subtitle, contentHtml) => `
            <main class="page-header-section">
                <div class="page-title-wrapper">
                    <div class="overline">
                        <hr class="title-line">
                        <span>NCR REGIONAL TOURISM DEVELOPMENT PLAN</span>
                    </div>
                    <h1 class="page-title">${title}</h1>
                    <p class="page-subtitle">${subtitle}</p>
                </div>
            </main>
            <div class="page-content-wrapper">
                ${contentHtml}
            </div>
        `;

        const pages = {
            'home': `
                <main class="hero-section">
                    <div class="hero-content">
                        <h2>DISCOVER<br>METRO MANILA</h2>
                    </div>
                </main>
            `,
            'project-background': buildPage(
                'PROJECT<br>BACKGROUND',
                'The Foundation of NCR\'s Tourism Future',
                '<p>This is the content for the project background page. It fades in smoothly after the title loads.</p>'
            ),
            'objectives': buildPage(
                'OUR<br>OBJECTIVES',
                'Strategic goals for sustainable tourism in the region.',
                '<p>Content for the objectives page goes here.</p>'
            ),
            'tourism-vision': buildPage(
                'TOURISM<br>VISION',
                'Looking ahead: The future of Metro Manila tourism.',
                '<p>Content for the tourism vision page goes here.</p>'
            ),
            'stakeholder-activities': buildPage(
                'STAKEHOLDER<br>ACTIVITIES',
                'Engaging communities and partners in development.',
                '<p>Content for the stakeholder activities page goes here.</p>'
            ),
            'overview': buildPage(
                'EXPLORE<br>OVERVIEW',
                'A comprehensive look at the National Capital Region.',
                '<p>Content for the explore overview page goes here.</p>'
            ),
            'thematic-clusters': buildPage(
                'THEMATIC<br>CLUSTERS',
                'Categorizing the diverse experiences in the metro.',
                '<p>Content for the thematic clusters page goes here.</p>'
            ),
            'tourism-development-areas': buildPage(
                'DEVELOPMENT<br>AREAS',
                'Focusing on high-potential zones (TDAs).',
                '<p>Content for the tourism development areas page goes here.</p>'
            ),
            'tourism-circuits': buildPage(
                'TOURISM<br>CIRCUITS',
                'Curated routes for the ultimate traveler experience.',
                '<p>Content for the tourism circuits page goes here.</p>'
            ),
            'tourism-enterprise-zones': buildPage(
                'ENTERPRISE<br>ZONES',
                'Designated zones for robust tourism commerce (TEZs).',
                '<p>Content for the tourism enterprise zones page goes here.</p>'
            ),
            'interactive-map': buildPage(
                'INTERACTIVE<br>MAP',
                'Navigate and explore the NCR region dynamically.',
                '<p>Map component goes here.</p>'
            ),
            'investment-portfolio': buildPage(
                'INVESTMENT<br>PORTFOLIO',
                'Discover high-value opportunities in Metro Manila.',
                '<p>Content for the investment portfolio page goes here.</p>'
            ),
            'priority-projects': buildPage(
                'PRIORITY<br>PROJECTS',
                'Key initiatives driving immediate economic impact.',
                '<p>Content for the priority projects page goes here.</p>'
            ),
            'ppp-opportunities': buildPage(
                'PPP<br>OPPORTUNITIES',
                'Public-Private Partnerships powering growth.',
                '<p>Content for the PPP opportunities page goes here.</p>'
            ),
            'brand-identity': buildPage(
                'BRAND<br>IDENTITY',
                'The creative framework behind the NCR story.',
                '<p>Content for the brand identity page goes here.</p>'
            ),
            'target-markets': buildPage(
                'TARGET<br>MARKETS',
                'Understanding our local and international audiences.',
                '<p>Content for the target markets page goes here.</p>'
            ),
            'campaigns-promotions': buildPage(
                'CAMPAIGNS &<br>PROMOTIONS',
                'Marketing initiatives to elevate the destination.',
                '<p>Content for the campaigns & promotions page goes here.</p>'
            ),
            'search': `
                <main class="page-header-section">
                    <div class="page-title-wrapper" style="position: relative; width: 100%;">
                        <div class="overline">
                            <hr class="title-line">
                            <span>NCR REGIONAL TOURISM DEVELOPMENT PLAN</span>
                        </div>
                        <h1 class="page-title">SEARCH PORTAL</h1>
                        <p class="page-subtitle">Find resources, data, and information across the RTDP</p>
                    </div>
                </main>
                <div class="page-content-wrapper search-page-wrapper">
                    <div class="search-input-container">
                        <i class="bi bi-search search-input-icon"></i>
                        <input type="text" class="main-search-input" placeholder="Search by keywords (e.g. 'heritage', 'investment', 'Manila Bay')...">
                    </div>
                    <p class="search-helper-text">ENTER AT LEAST 2 CHARACTERS TO START SEARCHING</p>
                </div>
            `,
        };

        // --- 5. Routing Engine ---
        function loadPage(pageId) {
            const content = pages[pageId] || pages['home'];
            appContent.innerHTML = content;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Listen for clicks on anything with a "data-target" attribute
        document.querySelectorAll('[data-target]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetPage = link.getAttribute('data-target');
                loadPage(targetPage);

                // Close desktop menu
                if (megaMenu && megaMenu.classList.contains('active')) {
                    megaMenu.classList.remove('active');
                }

                // Close mobile menu
                if (navMenu && navMenu.classList.contains('active') && window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const icon = hamburgerBtn.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });


        // Load the Home page by default on first visit
        loadPage('home');
        // Close mobile menu
        if (navMenu && navMenu.classList.contains('active') && window.innerWidth <= 768) {
            navMenu.classList.remove('active');

            // NEW: Restore background scrolling
            document.body.style.overflow = '';

            const icon = hamburgerBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }

    }

    const headerSearchBtn = document.querySelector('.search-btn');
    // Listen for clicks on ALL Search Buttons (Desktop and Mobile)
    document.querySelectorAll('.search-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage('search');

            // If clicked on mobile, automatically close the full-screen menu
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.style.overflow = ''; // Unlock background scrolling

                if (hamburgerBtn) {
                    const icon = hamburgerBtn.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }

            // Automatically focus the input field after it loads
            setTimeout(() => {
                const searchInput = document.querySelector('.main-search-input');
                if (searchInput) searchInput.focus();
            }, 100);
        });
    });
});