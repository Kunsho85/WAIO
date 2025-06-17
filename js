/**
 * WAIO Framework JavaScript
 * AI-Optimized Interactive Components and Utilities
 * Version 1.0.0
 */

(function() {
    'use strict';

    // WAIO Framework Namespace
    const WAIO = {
        version: '1.0.0',
        config: {
            animationDuration: 300,
            debounceDelay: 150,
            intersectionThreshold: 0.1,
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        },
        components: {},
        utils: {},
        ai: {}
    };

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================

    WAIO.utils = {
        /**
         * Debounce function to limit function calls
         */
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Throttle function to limit function calls
         */
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Check if element is in viewport
         */
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        /**
         * Get CSS custom property value
         */
        getCSSVariable: function(property) {
            return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
        },

        /**
         * Set CSS custom property value
         */
        setCSSVariable: function(property, value) {
            document.documentElement.style.setProperty(property, value);
        },

        /**
         * Generate unique ID
         */
        generateId: function(prefix = 'waio') {
            return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
        },

        /**
         * Add multiple event listeners
         */
        addEventListeners: function(element, events, handler) {
            events.split(' ').forEach(event => {
                element.addEventListener(event, handler);
            });
        }
    };

    // ===================================
    // AI OPTIMIZATION UTILITIES
    // ===================================

    WAIO.ai = {
        /**
         * Analyze content priority and add AI semantic indicators
         */
        analyzeContentPriority: function() {
            // Analyze H1 elements (should be ai-critical)
            const h1Elements = document.querySelectorAll('h1');
            h1Elements.forEach(h1 => {
                if (!h1.classList.contains('ai-critical')) {
                    h1.classList.add('ai-critical');
                    console.log('WAIO AI: Added ai-critical to H1 element');
                }
            });

            // Analyze navigation elements
            const navElements = document.querySelectorAll('nav, [role="navigation"]');
            navElements.forEach(nav => {
                if (!nav.classList.contains('ai-content-navigation')) {
                    nav.classList.add('ai-content-navigation');
                }
            });

            // Analyze main content areas
            const mainElements = document.querySelectorAll('main, [role="main"]');
            mainElements.forEach(main => {
                if (!main.classList.contains('ai-high')) {
                    main.classList.add('ai-high');
                }
            });
        },

        /**
         * Generate structured data for AI consumption
         */
        generateStructuredData: function() {
            const structuredData = {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                'name': document.title,
                'description': document.querySelector('meta[name="description"]')?.content || '',
                'url': window.location.href,
                'dateModified': new Date().toISOString(),
                'inLanguage': document.documentElement.lang || 'en',
                'isAccessibleForFree': true
            };

            // Add breadcrumb data if available
            const breadcrumbs = document.querySelectorAll('[aria-label*="breadcrumb"] a, .breadcrumb a');
            if (breadcrumbs.length > 0) {
                structuredData.breadcrumb = {
                    '@type': 'BreadcrumbList',
                    'itemListElement': Array.from(breadcrumbs).map((link, index) => ({
                        '@type': 'ListItem',
                        'position': index + 1,
                        'name': link.textContent.trim(),
                        'item': link.href
                    }))
                };
            }

            return structuredData;
        },

        /**
         * Optimize content for AI readability
         */
        optimizeForAI: function() {
            // Add semantic landmarks if missing
            this.addSemanticLandmarks();
            
            // Enhance form accessibility
            this.enhanceFormAccessibility();
            
            // Add ARIA labels where needed
            this.addAriaLabels();
            
            // Optimize image alt text
            this.optimizeImageAltText();
        },

        /**
         * Add semantic landmarks
         */
        addSemanticLandmarks: function() {
            // Ensure main content has proper landmark
            const mainContent = document.querySelector('main');
            if (mainContent && !mainContent.getAttribute('role')) {
                mainContent.setAttribute('role', 'main');
            }

            // Ensure navigation has proper landmark
            const navigation = document.querySelector('nav');
            if (navigation && !navigation.getAttribute('role')) {
                navigation.setAttribute('role', 'navigation');
            }

            // Ensure footer has proper landmark
            const footer = document.querySelector('footer');
            if (footer && !footer.getAttribute('role')) {
                footer.setAttribute('role', 'contentinfo');
            }
        },

        /**
         * Enhance form accessibility for AI
         */
        enhanceFormAccessibility: function() {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                // Add form role if missing
                if (!form.getAttribute('role')) {
                    form.setAttribute('role', 'form');
                }

                // Enhance form inputs
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    const label = form.querySelector(`label[for="${input.id}"]`);
                    if (!label && !input.getAttribute('aria-label')) {
                        // Try to find associated text
                        const wrapper = input.closest('.w-form-group');
                        const labelText = wrapper?.querySelector('.w-form-label')?.textContent;
                        if (labelText) {
                            input.setAttribute('aria-label', labelText);
                        }
                    }
                });
            });
        },

        /**
         * Add ARIA labels where needed
         */
        addAriaLabels: function() {
            // Add labels to buttons without text
            const buttons = document.querySelectorAll('button:not([aria-label])');
            buttons.forEach(button => {
                if (!button.textContent.trim()) {
                    const icon = button.querySelector('svg, i, [class*="icon"]');
                    if (icon) {
                        button.setAttribute('aria-label', 'Button');
                    }
                }
            });

            // Add labels to links without text
            const links = document.querySelectorAll('a:not([aria-label])');
            links.forEach(link => {
                if (!link.textContent.trim()) {
                    const icon = link.querySelector('svg, i, [class*="icon"]');
                    if (icon) {
                        link.setAttribute('aria-label', 'Link');
                    }
                }
            });
        },

        /**
         * Optimize image alt text for AI
         */
        optimizeImageAltText: function() {
            const images = document.querySelectorAll('img:not([alt])');
            images.forEach(img => {
                // Add empty alt for decorative images
                if (img.closest('.w-decoration, [role="presentation"]')) {
                    img.setAttribute('alt', '');
                } else {
                    // Add descriptive alt based on context
                    const context = img.closest('article, section, .w-card');
                    const heading = context?.querySelector('h1, h2, h3, h4, h5, h6');
                    if (heading) {
                        img.setAttribute('alt', `Image related to ${heading.textContent.trim()}`);
                    } else {
                        img.setAttribute('alt', 'Content image');
                    }
                }
            });
        }
    };

    // ===================================
    // COMPONENT IMPLEMENTATIONS
    // ===================================

    /**
     * Navigation Component
     */
    WAIO.components.Navigation = {
        init: function() {
            const navbars = document.querySelectorAll('.w-navbar');
            navbars.forEach(navbar => this.setupNavbar(navbar));
        },

        setupNavbar: function(navbar) {
            // Mobile menu toggle functionality
            const toggle = navbar.querySelector('.w-navbar-toggle');
            const menu = navbar.querySelector('.w-navbar-menu');
            
            if (toggle && menu) {
                toggle.addEventListener('click', () => {
                    const isOpen = menu.classList.contains('is-open');
                    menu.classList.toggle('is-open');
                    toggle.setAttribute('aria-expanded', !isOpen);
                    
                    // Add mobile menu styles if not present
                    if (!isOpen) {
                        menu.style.display = 'flex';
                        menu.style.flexDirection = 'column';
                        menu.style.position = 'absolute';
                        menu.style.top = '100%';
                        menu.style.left = '0';
                        menu.style.right = '0';
                        menu.style.backgroundColor = 'white';
                        menu.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                        menu.style.padding = WAIO.utils.getCSSVariable('--w-space-md');
                    } else {
                        menu.style.display = '';
                    }
                });
            }

            // Smooth scroll for anchor links
            const links = navbar.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    /**
     * Button Component
     */
    WAIO.components.Button = {
        init: function() {
            const buttons = document.querySelectorAll('.w-button');
            buttons.forEach(button => this.setupButton(button));
        },

        setupButton: function(button) {
            // Add ripple effect for better interaction feedback
            button.addEventListener('click', (e) => {
                if (WAIO.config.prefersReducedMotion) return;

                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });

            // Add keyboard interaction
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        }
    };

    /**
     * Form Component
     */
    WAIO.components.Form = {
        init: function() {
            const forms = document.querySelectorAll('.w-form');
            forms.forEach(form => this.setupForm(form));
        },

        setupForm: function(form) {
            // Real-time validation
            const inputs = form.querySelectorAll('.w-form-input, .w-form-textarea, .w-form-select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', WAIO.utils.debounce(() => this.validateField(input), 300));
            });

            // Form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm(form)) {
                    this.submitForm(form);
                }
            });
        },

        validateField: function(field) {
            const value = field.value.trim();
            const isRequired = field.hasAttribute('required');
            const type = field.type;
            let isValid = true;
            let message = '';

            // Required field validation
            if (isRequired && !value) {
                isValid = false;
                message = 'This field is required';
            }

            // Email validation
            if (type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
            }

            // Update field state
            field.classList.toggle('is-valid', isValid && value);
            field.classList.toggle('is-invalid', !isValid);

            // Show/hide error message
            let errorElement = field.parentNode.querySelector('.w-form-error');
            if (!isValid && message) {
                if (!errorElement) {
                    errorElement = document.createElement('div');
                    errorElement.className = 'w-form-error w-text-caption';
                    errorElement.style.color = 'var(--w-color-error, #ef4444)';
                    errorElement.style.marginTop = '0.25rem';
                    field.parentNode.appendChild(errorElement);
                }
                errorElement.textContent = message;
            } else if (errorElement) {
                errorElement.remove();
            }

            return isValid;
        },

        validateForm: function(form) {
            const inputs = form.querySelectorAll('.w-form-input, .w-form-textarea, .w-form-select');
            let isFormValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isFormValid = false;
                }
            });

            return isFormValid;
        },

        submitForm: function(form) {
            // Add loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Show success message
                this.showFormMessage(form, 'Thank you! Your message has been sent.', 'success');
                form.reset();
            }, 2000);
        },

        showFormMessage: function(form, message, type = 'info') {
            const messageElement = document.createElement('div');
            messageElement.className = `w-form-message w-form-message-${type}`;
            messageElement.style.cssText = `
                padding: var(--w-space-sm);
                border-radius: var(--w-radius-md);
                margin-top: var(--w-space-md);
                background-color: ${type === 'success' ? '#10b981' : '#3b82f6'};
                color: white;
            `;
            messageElement.textContent = message;

            form.appendChild(messageElement);

            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    };

    /**
     * Card Component
     */
    WAIO.components.Card = {
        init: function() {
            const cards = document.querySelectorAll('.w-card');
            cards.forEach(card => this.setupCard(card));
        },

        setupCard: function(card) {
            // Add hover effects for elevated cards
            if (card.classList.contains('w-card-elevated')) {
                card.addEventListener('mouseenter', () => {
                    if (!WAIO.config.prefersReducedMotion) {
                        card.style.transform = 'translateY(-4px)';
                        card.style.transition = 'all var(--w-transition-normal)';
                    }
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            }

            // Make cards clickable if they contain a primary link
            const primaryLink = card.querySelector('.w-card-link, .w-button-primary');
            if (primaryLink) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    if (e.target === card || card.contains(e.target)) {
                        primaryLink.click();
                    }
                });
            }
        }
    };

    /**
     * Animation Component
     */
    WAIO.components.Animation = {
        init: function() {
            if (WAIO.config.prefersReducedMotion) return;

            this.setupScrollAnimations();
            this.setupHoverAnimations();
        },

        setupScrollAnimations: function() {
            const animatedElements = document.querySelectorAll('.w-animate-fade-in, .w-animate-slide-up');
            
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.animationPlayState = 'running';
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: WAIO.config.intersectionThreshold
                });

                animatedElements.forEach(element => {
                    element.style.animationPlayState = 'paused';
                    observer.observe(element);
                });
            }
        },

        setupHoverAnimations: function() {
            const hoverElements = document.querySelectorAll('.w-hover-scale, .w-hover-lift');
            
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    element.style.transition = 'all var(--w-transition-normal)';
                });
            });
        }
    };

    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================

    WAIO.performance = {
        /**
         * Lazy load images
         */
        lazyLoadImages: function() {
            const images = document.querySelectorAll('img[data-src]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            } else {
                // Fallback for browsers without IntersectionObserver
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                });
            }
        },

        /**
         * Preload critical resources
         */
        preloadCriticalResources: function() {
            // Preload critical CSS
            const criticalCSS = document.querySelector('link[rel="stylesheet"][data-critical]');
            if (criticalCSS) {
                criticalCSS.rel = 'preload';
                criticalCSS.as = 'style';
            }

            // Preload hero images
            const heroImages = document.querySelectorAll('.hero img, .w-hero img');
            heroImages.forEach(img => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.src || img.dataset.src;
                document.head.appendChild(link);
            });
        }
    };

    // ===================================
    // INITIALIZATION
    // ===================================

    /**
     * Initialize WAIO Framework
     */
    WAIO.init = function() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initComponents());
        } else {
            this.initComponents();
        }
    };

    /**
     * Initialize all components
     */
    WAIO.initComponents = function() {
        console.log(`WAIO Framework v${this.version} initializing...`);

        // Initialize AI optimization
        this.ai.analyzeContentPriority();
        this.ai.optimizeForAI();

        // Initialize components
        this.components.Navigation.init();
        this.components.Button.init();
        this.components.Form.init();
        this.components.Card.init();
        this.components.Animation.init();

        // Initialize performance optimizations
        this.performance.lazyLoadImages();
        this.performance.preloadCriticalResources();

        // Add CSS for ripple animation
        this.addRippleStyles();

        console.log('WAIO Framework initialized successfully');
    };

    /**
     * Add required CSS for JavaScript functionality
     */
    WAIO.addRippleStyles = function() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .w-form-input.is-valid,
            .w-form-textarea.is-valid,
            .w-form-select.is-valid {
                border-color: #10b981;
                box-shadow: 0 0 0 3px rgb(16 185 129 / 0.1);
            }
            
            .w-form-input.is-invalid,
            .w-form-textarea.is-invalid,
            .w-form-select.is-invalid {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
            }
            
            @media (max-width: 767px) {
                .w-navbar-menu.is-open {
                    display: flex !important;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // ===================================
    // PUBLIC API
    // ===================================

    // Expose WAIO to global scope
    window.WAIO = WAIO;

    // Auto-initialize
    WAIO.init();

    // Export for module systems
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = WAIO;
    }

})();

