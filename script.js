 // Configuration
        const PHONE_NUMBER = '2250700000000';
        
        // Message templates for different contexts
        const whatsappMessages = {
            // General Quotes
            'hero_quote': "Hello, I would like to request a construction quote.",
            'nav_quote': "Hello, I would like to request a free quote for a construction project.",
            'mobile_quote': "Hello, I am interested in your construction services and would like a quote.",
            'cta_main': "Hello, I would like to discuss a construction project.",
            'contact_main': "Hello, I would like to get in touch regarding your services.",
            'footer_quick': "Hello, I have a question about your construction services.",
            'floating_btn': "Hello, I would like more information about Horizon BTP.",
            
            // Services
            'service_civil': "Hello, I am interested in your Civil Engineering services.",
            'service_road': "Hello, I am interested in your Road Construction services.",
            'service_building': "Hello, I am interested in your Building Construction services.",
            'service_infra': "Hello, I am interested in your Infrastructure Development services.",
            'service_industrial': "Hello, I am interested in your Industrial Construction services.",
            'service_management': "Hello, I am interested in your Project Management services.",
            
            // Projects
            'project_cocotiers': "Hello, I would like to discuss the 'Les Cocotiers' residential project.",
            'project_highway': "Hello, I would like to discuss the 'Abidjan-Yamoussoukro Highway' project.",
            'project_bridge': "Hello, I would like to discuss the 'Ebrie Lagoon Bridge' project.",
            'project_hotel': "Hello, I would like to discuss the 'Riviera 5-Star Hotel' project."
        };

        // Dynamic WhatsApp Function
        function openWhatsApp(contextKey) {
            const message = whatsappMessages[contextKey] || "Hello, I would like to contact Horizon BTP.";
            const encodedMessage = encodeURIComponent(message);
            const url = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
            window.open(url, '_blank');
        }

        // Event Delegation for WhatsApp buttons
        document.body.addEventListener('click', function(e) {
            const button = e.target.closest('[data-whatsapp-context]');
            if (button) {
                const context = button.getAttribute('data-whatsapp-context');
                openWhatsApp(context);
            }
        });

        // UI Logic (Navbar, Scroll, Mobile Menu, Animations)
        const navbar = document.getElementById('navbar');
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileClose = document.getElementById('mobile-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = mobileMenu.querySelectorAll('a');
        
        let lastScroll = 0;
        function handleScroll() {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                navbar.classList.add('bg-navy-900/95', 'backdrop-blur-lg', 'shadow-lg');
            } else {
                navbar.classList.remove('bg-navy-900/95', 'backdrop-blur-lg', 'shadow-lg');
            }
            lastScroll = currentScroll;
        }
        window.addEventListener('scroll', handleScroll);

        function openMobileMenu() {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }

        mobileToggle.addEventListener('click', openMobileMenu);
        mobileClose.addEventListener('click', closeMobileMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

        // Scroll Reveal
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-container');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));

        // Counter Animation
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            updateCounter();
        }

        const statsContainer = document.getElementById('stats-container');
        let counterAnimated = false;
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterAnimated) {
                    counterAnimated = true;
                    document.querySelectorAll('.counter').forEach(counter => animateCounter(counter));
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsContainer);

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });

        // Initial reveal for hero elements
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                document.querySelectorAll('.hero-bg .reveal').forEach(el => el.classList.add('visible'));
            }, 100);
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
        });