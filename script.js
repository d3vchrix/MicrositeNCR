document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM Elements ---
    const navMenu = document.querySelector('.nav-menu');
    const megaMenu = document.querySelector('.mega-menu');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const appContent = document.getElementById('app-content');
    const navItems = document.querySelectorAll('.nav-item');
    let timeoutId;

    // --- 2. Mobile Accordion Logic ---
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

    // --- 3. Mega Menu Hover Logic (Desktop) ---
    if (navMenu && megaMenu) {
        navMenu.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                clearTimeout(timeoutId);
                megaMenu.classList.add('active');
            }
        });

        navMenu.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                timeoutId = setTimeout(() => {
                    if (!megaMenu.matches(':hover')) {
                        megaMenu.classList.remove('active');
                    }
                }, 150);
            }
        });

        megaMenu.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
        });

        megaMenu.addEventListener('mouseleave', () => {
            megaMenu.classList.remove('active');
        });
    }

    // --- 4. Mobile Hamburger Menu Logic ---
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Lock background scrolling when mobile menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }

            // Swap hamburger icon
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

    // --- 5. Single Page Application (SPA) Routing & Content ---
    if (appContent) {
        // Helper function to build internal pages cleanly
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

                <section class="home-features-section">
                    <div class="features-grid">
                        <a href="#" data-target="overview" class="feature-card card-blue">
                            <i class="bi bi-geo-alt card-main-icon"></i>
                            <h3>Explore NCR</h3>
                            <p>Discover the thematic clusters, tourism development areas, and tourism enterprise zones.</p>
                            <i class="bi bi-arrow-right-circle card-arrow"></i>
                        </a>
                        <a href="#" data-target="investment-portfolio" class="feature-card card-yellow">
                            <i class="bi bi-graph-up-arrow card-main-icon"></i>
                            <h3>Investment<br>Portfolio</h3>
                            <p>View priority projects and investment opportunities.</p>
                            <i class="bi bi-arrow-right-circle card-arrow"></i>
                        </a>
                        <a href="#" data-target="brand-identity" class="feature-card card-red">
                            <i class="bi bi-megaphone card-main-icon"></i>
                            <h3>Marketing &<br>Branding</h3>
                            <p>Discover our brand identity, target markets, and promotional initiatives.</p>
                            <i class="bi bi-arrow-right-circle card-arrow"></i>
                        </a>
                        <a href="#" data-target="downloads-resources" class="feature-card card-dark">
                            <i class="bi bi-download card-main-icon"></i>
                            <h3>Downloads &<br>Resources</h3>
                            <p>Access reports, maps, datasets, and supporting documents.</p>
                            <i class="bi bi-arrow-right-circle card-arrow"></i>
                        </a>
                    </div>
                </section>

                <section class="home-stats-section">
                    <div class="stats-container">
                        <div class="stat-item">
                            <i class="fa-solid fa-map text-green"></i>
                            <div class="stat-text">
                                <span class="stat-num">6</span>
                                <span class="stat-label">Thematic<br>Clusters</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fa-solid fa-map-location-dot text-blue"></i>
                            <div class="stat-text">
                                <span class="stat-num">17</span>
                                <span class="stat-label">Tourism<br>Development Areas</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fa-solid fa-handshake text-yellow"></i>
                            <div class="stat-text">
                                <span class="stat-num">180+</span>
                                <span class="stat-label">Priority<br>Projects</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fa-solid fa-leaf text-green"></i>
                            <div class="stat-text">
                                <span class="stat-label full-weight">Sustainable<br>Tourism for a<br>Resilient NCR</span>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            'overview': buildPage(
                'EXPLORE<br>OVERVIEW',
                'A comprehensive look at the National Capital Region.',
                `
                <div style="display: flex; flex-direction: column; gap: 2rem;">
                    <div>
                        <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #2544b8;">Welcome to Metro Manila</h2>
                        <p>The National Capital Region (NCR) is the vibrant heart of the Philippines. As the country's premier gateway, it offers a dynamic blend of deep historical roots and rapid modern development. From the walled city of Intramuros to the bustling business districts of Makati and BGC, the NCR provides a multifaceted tourism experience.</p>
                        <p>Our Regional Tourism Development Plan (RTDP) focuses on elevating these experiences by improving infrastructure, promoting sustainable practices, and highlighting the unique cultural tapestry of our 16 cities and 1 municipality.</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 2rem; border-radius: 12px; border-left: 5px solid #2544b8;">
                        <h3 style="font-size: 1.4rem; margin-bottom: 1rem;">Key Tourism Highlights</h3>
                        <ul style="list-style-type: disc; margin-left: 1.5rem; line-height: 1.8; color: #444;">
                            <li><strong>Cultural Heritage:</strong> Historical landmarks spanning Spanish colonial architecture to post-war memorials.</li>
                            <li><strong>MICE Hub:</strong> World-class convention centers hosting international summits and exhibitions.</li>
                            <li><strong>Entertainment & Lifestyle:</strong> Premium shopping complexes, integrated resorts, and a world-renowned culinary scene.</li>
                        </ul>
                    </div>
                </div>
                `
            ),
            'investment-portfolio': buildPage(
                'INVESTMENT<br>PORTFOLIO',
                'Discover high-value opportunities in Metro Manila.',
                `
                <div>
                    <p>Metro Manila presents unparalleled opportunities for tourism-related investments. Driven by a robust domestic market and a steady recovery in international arrivals, the NCR is primed for public-private partnerships (PPP) and private enterprise expansion.</p>
                    <h3 style="font-size: 1.5rem; margin: 2.5rem 0 1.5rem; color: #f2aa00;">Priority Investment Sectors</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                        <div style="border: 1px solid #eee; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                            <h4 style="font-weight: 800; margin-bottom: 0.5rem;"><i class="bi bi-building"></i> Hospitality Infrastructure</h4>
                            <p style="font-size: 0.95rem;">Development of 4-star and 5-star eco-friendly accommodations in emerging business districts like Quezon City and Bay Area.</p>
                        </div>
                        <div style="border: 1px solid #eee; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                            <h4 style="font-weight: 800; margin-bottom: 0.5rem;"><i class="bi bi-bus-front"></i> Smart Mobility</h4>
                            <p style="font-size: 0.95rem;">Investment in integrated tourist transport solutions, including hop-on-hop-off electric buses and river ferry upgrades.</p>
                        </div>
                        <div style="border: 1px solid #eee; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                            <h4 style="font-weight: 800; margin-bottom: 0.5rem;"><i class="bi bi-ticket-perforated"></i> Entertainment Zones</h4>
                            <p style="font-size: 0.95rem;">Creation of new Tourism Enterprise Zones (TEZs) focusing on cultural shows, theme parks, and wellness centers.</p>
                        </div>
                    </div>
                    <div style="margin-top: 3rem; background: #1a1a1a; color: white; padding: 2rem; border-radius: 12px; text-align: center;">
                        <h3 style="margin-bottom: 1rem; color: #f2aa00;">Looking to invest?</h3>
                        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">Download our comprehensive 2026-2030 Investment Prospectus.</p>
                        <button style="background: #f2aa00; color: #1a1a1a; border: none; padding: 12px 24px; font-weight: 800; border-radius: 50px; cursor: pointer;">Download Prospectus PDF</button>
                    </div>
                </div>
                `
            ),
            'brand-identity': buildPage(
                'BRAND<br>IDENTITY',
                'The creative framework behind the NCR story.',
                `
                <div>
                    <p>Our brand identity is more than just a logo; it is the visual and emotional representation of the National Capital Region. It communicates our promise to tourists and investors alike: a region that is resilient, dynamic, and deeply connected to its heritage.</p>
                    <h3 style="font-size: 1.5rem; margin: 2rem 0 1rem; color: #e63946;">Brand Pillars</h3>
                    <ul style="list-style-type: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                        <li style="display: flex; gap: 15px; align-items: flex-start;">
                            <i class="bi bi-check-circle-fill" style="color: #e63946; font-size: 1.2rem; margin-top: 2px;"></i>
                            <div><strong>Vibrant Culture:</strong> Celebrating the fusion of historical narratives with contemporary urban art and lifestyle.</div>
                        </li>
                        <li style="display: flex; gap: 15px; align-items: flex-start;">
                            <i class="bi bi-check-circle-fill" style="color: #e63946; font-size: 1.2rem; margin-top: 2px;"></i>
                            <div><strong>Seamless Connectivity:</strong> Positioning NCR as the ultimate, easy-to-navigate starting point for any Philippine adventure.</div>
                        </li>
                        <li style="display: flex; gap: 15px; align-items: flex-start;">
                            <i class="bi bi-check-circle-fill" style="color: #e63946; font-size: 1.2rem; margin-top: 2px;"></i>
                            <div><strong>Sustainable Innovation:</strong> Championing green spaces, clean waterways, and eco-conscious tourism enterprises.</div>
                        </li>
                    </ul>
                </div>
                `
            ),
            'downloads-resources': buildPage(
                'DOWNLOADS &<br>RESOURCES',
                'Access reports, maps, datasets, and supporting documents.',
                `
                <div>
                    <p>Access our repository of official publications, regional maps, and statistical data to support your research, planning, or investment in the National Capital Region.</p>
                    <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1.5rem; border: 1px solid #e0e0e0; border-radius: 8px;">
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <i class="bi bi-file-earmark-pdf" style="font-size: 2rem; color: #e63946;"></i>
                                <div>
                                    <h4 style="font-weight: 800; font-size: 1.1rem;">Full NCR RTDP Master Plan (2026-2030)</h4>
                                    <p style="font-size: 0.8rem; margin: 0; color: #888;">PDF Document • 45.2 MB</p>
                                </div>
                            </div>
                            <button style="background: #1a1a1a; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"><i class="bi bi-download"></i></button>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1.5rem; border: 1px solid #e0e0e0; border-radius: 8px;">
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <i class="bi bi-file-earmark-bar-graph" style="font-size: 2rem; color: #2a9d8f;"></i>
                                <div>
                                    <h4 style="font-weight: 800; font-size: 1.1rem;">NCR Tourism Statistics Report (Q4 2025)</h4>
                                    <p style="font-size: 0.8rem; margin: 0; color: #888;">Excel Spreadsheet • 2.1 MB</p>
                                </div>
                            </div>
                            <button style="background: #1a1a1a; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"><i class="bi bi-download"></i></button>
                        </div>
                    </div>
                </div>
                `
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
            'contact-us': buildPage(
                'CONTACT<br>US',
                'Get in touch with the NCR RTDP team.',
                `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                    <div>
                        <h3 style="margin-bottom: 1rem; color: #2544b8;">Main Office</h3>
                        <p><strong>Department of Tourism - NCR</strong><br>351 Sen. Gil Puyat Ave.<br>Makati City, Metro Manila 1200<br>Philippines</p>
                        <p style="margin-top: 1rem;"><strong>Email:</strong> info@ncr-rtdp.gov.ph<br><strong>Phone:</strong> +63 (2) 8459-5200</p>
                    </div>
                    <div style="background: #f6f7f9; padding: 2rem; border-radius: 8px;">
                        <h3 style="margin-bottom: 1rem;">Send us a message</h3>
                        <p style="font-size: 0.9rem; margin-bottom: 1rem;">Have a question about the Master Plan or investment opportunities? Let us know.</p>
                        <input type="text" placeholder="Your Name" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
                        <input type="email" placeholder="Your Email" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
                        <button style="background: #1a1a1a; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%;">Submit Inquiry</button>
                    </div>
                </div> `
            ),
            'project-background': buildPage('PROJECT<br>BACKGROUND', 'The Foundation of NCR\'s Tourism Future', '<p>Content for project background goes here.</p>'),
            'objectives': buildPage('OUR<br>OBJECTIVES', 'Strategic goals for sustainable tourism in the region.', '<p>Content for objectives goes here.</p>'),
            'tourism-vision': buildPage('TOURISM<br>VISION', 'Looking ahead: The future of Metro Manila tourism.', '<p>Content for tourism vision goes here.</p>'),
            'stakeholder-activities': buildPage('STAKEHOLDER<br>ACTIVITIES', 'Engaging communities and partners in development.', '<p>Content for stakeholder activities goes here.</p>'),
            'thematic-clusters': buildPage('THEMATIC<br>CLUSTERS', 'Categorizing the diverse experiences in the metro.', '<p>Content for thematic clusters goes here.</p>'),
            'tourism-development-areas': buildPage('DEVELOPMENT<br>AREAS', 'Focusing on high-potential zones (TDAs).', '<p>Content for tourism development areas goes here.</p>'),
            'tourism-circuits': buildPage('TOURISM<br>CIRCUITS', 'Curated routes for the ultimate traveler experience.', '<p>Content for tourism circuits goes here.</p>'),
            'tourism-enterprise-zones': buildPage('ENTERPRISE<br>ZONES', 'Designated zones for robust tourism commerce (TEZs).', '<p>Content for tourism enterprise zones goes here.</p>'),
            'interactive-map': buildPage('INTERACTIVE<br>MAP', 'Navigate and explore the NCR region dynamically.', '<p>Map component goes here.</p>'),
            'priority-projects': buildPage('PRIORITY<br>PROJECTS', 'Key initiatives driving immediate economic impact.', '<p>Content for priority projects goes here.</p>'),
            'ppp-opportunities': buildPage('PPP<br>OPPORTUNITIES', 'Public-Private Partnerships powering growth.', '<p>Content for PPP opportunities goes here.</p>'),
            'target-markets': buildPage('TARGET<br>MARKETS', 'Understanding our local and international audiences.', '<p>Content for target markets goes here.</p>'),
            'campaigns-promotions': buildPage('CAMPAIGNS &<br>PROMOTIONS', 'Marketing initiatives to elevate the destination.', '<p>Content for campaigns & promotions goes here.</p>'),
            'privacy-policy': buildPage('PRIVACY<br>POLICY', 'How we handle and protect your data.', '<p>Your privacy is important to us. This page outlines the types of personal information we receive and collect when you use the NCR RTDP website, as well as some of the steps we take to safeguard information.</p>'),
            'terms-of-use': buildPage('TERMS OF<br>USE', 'Guidelines for using the NCR RTDP portal.', '<p>By accessing this website, you agree to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>'),
            'accessibility': buildPage('ACCESSIBILITY<br>STATEMENT', 'Ensuring digital access for everyone.', '<p>The Department of Tourism is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>'),
        };

        // --- 6. Number Counting Animation Function ---
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-num');
            const animationDuration = 2000;

            counters.forEach(counter => {
                const targetText = counter.getAttribute('data-val') || counter.innerText;
                if (!counter.hasAttribute('data-val')) {
                    counter.setAttribute('data-val', targetText);
                }

                // Extract number vs symbols (like "180+")
                const targetNum = parseInt(targetText.replace(/[^0-9]/g, ''), 10);
                const suffix = targetText.replace(/[0-9]/g, '');

                // Safety check: if there is no number, don't try to animate it
                if (isNaN(targetNum)) return;

                let startTime = null;

                function updateCounter(currentTime) {
                    if (startTime === null) startTime = currentTime;

                    const progress = Math.min((currentTime - startTime) / animationDuration, 1);
                    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                    const currentNum = Math.floor(easeOutProgress * targetNum);

                    counter.innerText = currentNum + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = targetText;
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }

        // --- 7. Routing Engine ---
        function loadPage(pageId) {
            const content = pages[pageId] || pages['home'];
            appContent.innerHTML = content;
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Trigger animations if loading the home page
            if (pageId === 'home') {
                setTimeout(animateCounters, 50);
            }
        }

        // --- 8. Event Listeners for Routing ---

        // --- 8. Event Listeners for Routing ---

        // Master Click Listener (Handles both static Header/Footer links AND dynamic Card links)
        document.body.addEventListener('click', (e) => {
            // Find the closest clicked element that has a 'data-target' attribute
            // This ensures clicking an icon or text INSIDE the card still triggers the link
            const link = e.target.closest('[data-target]');

            if (link) {
                e.preventDefault();

                const targetPage = link.getAttribute('data-target');
                loadPage(targetPage);

                // Close desktop menu
                if (megaMenu && megaMenu.classList.contains('active')) {
                    megaMenu.classList.remove('active');
                }

                // Close mobile menu and restore scrolling
                if (navMenu && navMenu.classList.contains('active') && window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';

                    if (hamburgerBtn) {
                        const icon = hamburgerBtn.querySelector('i');
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });

        // Search Buttons (Mobile and Desktop)
        document.querySelectorAll('.search-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                loadPage('search');

                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';

                    if (hamburgerBtn) {
                        const icon = hamburgerBtn.querySelector('i');
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }

                setTimeout(() => {
                    const searchInput = document.querySelector('.main-search-input');
                    if (searchInput) searchInput.focus();
                }, 100);
            });
        });

        // Load the Home page by default on first visit
        loadPage('home');
    }
});