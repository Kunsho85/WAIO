/**
 * WAIO Framework JavaScript
 * Version: 1.0.0
 * AI-Optimized Webflow Framework Components
 */

(function() {
  'use strict';

  // WAIO Namespace
  const WAIO = window.WAIO || {};
  
  // Configuration
  const config = {
    debug: false,
    aiOptimization: true,
    performanceMonitoring: true,
    accessibilityEnhancement: true
  };

  // Utility Functions
  const utils = {
    // Debounce function for performance
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

    // Throttle function for scroll events
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

    // Check if element is in viewport
    isInViewport: function(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    // Get element's offset from top of document
    getOffset: function(element) {
      let offsetTop = 0;
      while(element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
      }
      return offsetTop;
    },

    // Log debug messages
    log: function(message, type = 'info') {
      if (config.debug) {
        console[type](`[WAIO] ${message}`);
      }
    }
  };

  // AI Optimization Module
  const aiOptimization = {
    init: function() {
      if (!config.aiOptimization) return;
      
      this.enhanceSemanticStructure();
      this.addStructuredData();
      this.optimizeContentClassification();
      this.setupAIReadability();
      
      utils.log('AI Optimization initialized');
    },

    enhanceSemanticStructure: function() {
      // Add semantic landmarks
      const navigation = document.querySelectorAll('[data-ai-content="navigation"]');
      navigation.forEach(nav => {
        if (!nav.getAttribute('role')) {
          nav.setAttribute('role', 'navigation');
        }
        if (!nav.getAttribute('aria-label')) {
          nav.setAttribute('aria-label', 'Main navigation');
        }
      });

      // Enhance article structure
      const articles = document.querySelectorAll('[data-ai-content="article"]');
      articles.forEach(article => {
        if (!article.getAttribute('itemscope')) {
          article.setAttribute('itemscope', '');
          article.setAttribute('itemtype', 'https://schema.org/Article');
        }
      });

      // Add main content landmark
      const main = document.querySelector('main') || document.querySelector('[role="main"]');
      if (main && !main.getAttribute('role')) {
        main.setAttribute('role', 'main');
      }
    },

    addStructuredData: function() {
      // Auto-generate basic structured data
      const articles = document.querySelectorAll('[data-ai-content="article"]');
      articles.forEach(article => {
        const title = article.querySelector('h1, h2, .waio-heading-1, .waio-heading-2');
        const description = article.querySelector('p, .waio-text-base');
        
        if (title && description) {
          const structuredData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title.textContent.trim(),
            "description": description.textContent.trim().substring(0, 160)
          };
          
          // Add to head if not exists
          if (!document.querySelector(`script[type="application/ld+json"]`)) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
          }
        }
      });
    },

    optimizeContentClassification: function() {
      // Auto-classify content types
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        if (!heading.getAttribute('data-ai-priority')) {
          const level = parseInt(heading.tagName.charAt(1));
          const priority = level <= 2 ? 'high' : level <= 4 ? 'medium' : 'low';
          heading.setAttribute('data-ai-priority', priority);
        }
      });

      // Classify navigation elements
      const navLinks = document.querySelectorAll('nav a, .waio-nav-link');
      navLinks.forEach(link => {
        if (!link.getAttribute('data-ai-content')) {
          link.setAttribute('data-ai-content', 'navigation');
        }
      });
    },

    setupAIReadability: function() {
      // Add reading time estimation
      const articles = document.querySelectorAll('[data-ai-content="article"]');
      articles.forEach(article => {
        const text = article.textContent || article.innerText;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
        
        article.setAttribute('data-reading-time', readingTime);
        article.setAttribute('data-word-count', wordCount);
      });
    }
  };

  // Accessibility Enhancement Module
  const accessibility = {
    init: function() {
      if (!config.accessibilityEnhancement) return;
      
      this.enhanceKeyboardNavigation();
      this.addAriaLabels();
      this.setupFocusManagement();
      this.enhanceFormAccessibility();
      
      utils.log('Accessibility enhancements initialized');
    },

    enhanceKeyboardNavigation: function() {
      // Add keyboard support to interactive elements
      const interactiveElements = document.querySelectorAll('.waio-button, .waio-card, [data-clickable]');
      interactiveElements.forEach(element => {
        if (!element.getAttribute('tabindex') && element.tagName !== 'BUTTON' && element.tagName !== 'A') {
          element.setAttribute('tabindex', '0');
        }
        
        element.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
          }
        });
      });
    },

    addAriaLabels: function() {
      // Add ARIA labels to buttons without text
      const buttons = document.querySelectorAll('.waio-button');
      buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
          const icon = button.querySelector('svg, img, i');
          if (icon) {
            button.setAttribute('aria-label', 'Button');
          }
        }
      });

      // Add ARIA labels to form controls
      const inputs = document.querySelectorAll('.waio-input, .waio-textarea, .waio-select');
      inputs.forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (!label && !input.getAttribute('aria-label')) {
          const placeholder = input.getAttribute('placeholder');
          if (placeholder) {
            input.setAttribute('aria-label', placeholder);
          }
        }
      });
    },

    setupFocusManagement: function() {
      // Add focus visible class for better focus indicators
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
      });

      document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
      });

      // Skip to main content link
      if (!document.querySelector('.skip-to-main')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-main';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
          position: absolute;
          top: -40px;
          left: 6px;
          background: var(--waio-color-primary);
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 1000;
          transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
          this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
          this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
      }
    },

    enhanceFormAccessibility: function() {
      // Add form validation messages
      const forms = document.querySelectorAll('.waio-form, form');
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.setAttribute('aria-invalid', 'true');
            
            // Create or update error message
            let errorMsg = document.getElementById(`${this.id}-error`);
            if (!errorMsg) {
              errorMsg = document.createElement('div');
              errorMsg.id = `${this.id}-error`;
              errorMsg.className = 'waio-form-error';
              errorMsg.setAttribute('role', 'alert');
              errorMsg.style.cssText = 'color: var(--waio-color-error); font-size: var(--waio-text-sm); margin-top: var(--waio-space-xs);';
              this.parentNode.appendChild(errorMsg);
            }
            
            errorMsg.textContent = this.validationMessage;
            this.setAttribute('aria-describedby', errorMsg.id);
          });
          
          input.addEventListener('input', function() {
            if (this.checkValidity()) {
              this.setAttribute('aria-invalid', 'false');
              const errorMsg = document.getElementById(`${this.id}-error`);
              if (errorMsg) {
                errorMsg.remove();
              }
            }
          });
        });
      });
    }
  };

  // Component System
  const components = {
    init: function() {
      this.initButtons();
      this.initCards();
      this.initNavigation();
      this.initForms();
      this.initModals();
      
      utils.log('Components initialized');
    },

    initButtons: function() {
      const buttons = document.querySelectorAll('.waio-button');
      buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
          `;
          
          this.style.position = 'relative';
          this.style.overflow = 'hidden';
          this.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });
    },

    initCards: function() {
      const cards = document.querySelectorAll('.waio-card');
      cards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
        });
      });
    },

    initNavigation: function() {
      // Mobile navigation toggle
      const navToggles = document.querySelectorAll('[data-nav-toggle]');
      navToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
          const targetId = this.getAttribute('data-nav-toggle');
          const target = document.getElementById(targetId);
          
          if (target) {
            const isOpen = target.classList.contains('open');
            target.classList.toggle('open', !isOpen);
            this.setAttribute('aria-expanded', !isOpen);
            
            // Update icon if present
            const icon = this.querySelector('svg, i');
            if (icon) {
              icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            }
          }
        });
      });

      // Smooth scroll for anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href').substring(1);
          const target = document.getElementById(targetId);
          
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    },

    initForms: function() {
      // Enhanced form validation
      const forms = document.querySelectorAll('.waio-form');
      forms.forEach(form => {
        form.addEventListener('submit', function(e) {
          const inputs = this.querySelectorAll('input, textarea, select');
          let isValid = true;
          
          inputs.forEach(input => {
            if (!input.checkValidity()) {
              isValid = false;
              input.focus();
              return false;
            }
          });
          
          if (!isValid) {
            e.preventDefault();
          }
        });
      });

      // Auto-resize textareas
      const textareas = document.querySelectorAll('.waio-textarea');
      textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
          this.style.height = 'auto';
          this.style.height = this.scrollHeight + 'px';
        });
      });
    },

    initModals: function() {
      // Modal functionality
      const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
      modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
          e.preventDefault();
          const modalId = this.getAttribute('data-modal-trigger');
          const modal = document.getElementById(modalId);
          
          if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            
            // Focus first focusable element
            const focusable = modal.querySelector('button, input, textarea, select, a');
            if (focusable) {
              focusable.focus();
            }
          }
        });
      });

      // Close modal functionality
      const modalCloses = document.querySelectorAll('[data-modal-close]');
      modalCloses.forEach(close => {
        close.addEventListener('click', function() {
          const modal = this.closest('.waio-modal');
          if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
          }
        });
      });

      // Close modal on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          const openModal = document.querySelector('.waio-modal.open');
          if (openModal) {
            openModal.classList.remove('open');
            document.body.style.overflow = '';
          }
        }
      });
    }
  };

  // Performance Monitoring
  const performance = {
    init: function() {
      if (!config.performanceMonitoring) return;
      
      this.monitorCoreWebVitals();
      this.trackLoadingPerformance();
      
      utils.log('Performance monitoring initialized');
    },

    monitorCoreWebVitals: function() {
      // Monitor Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          utils.log(`LCP: ${lastEntry.startTime}ms`, 'info');
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }

      // Monitor Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          utils.log(`CLS: ${clsValue}`, 'info');
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    },

    trackLoadingPerformance: function() {
      window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        utils.log(`Page load time: ${loadTime}ms`, 'info');
        
        // Track resource loading
        const resources = performance.getEntriesByType('resource');
        const cssResources = resources.filter(r => r.name.includes('.css'));
        const jsResources = resources.filter(r => r.name.includes('.js'));
        
        utils.log(`CSS resources: ${cssResources.length}`, 'info');
        utils.log(`JS resources: ${jsResources.length}`, 'info');
      });
    }
  };

  // Lazy Loading
  const lazyLoading = {
    init: function() {
      this.setupImageLazyLoading();
      this.setupContentLazyLoading();
      
      utils.log('Lazy loading initialized');
    },

    setupImageLazyLoading: function() {
      const images = document.querySelectorAll('img[data-src]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          });
        });

        images.forEach(img => imageObserver.observe(img));
      } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
          img.src = img.dataset.src;
        });
      }
    },

    setupContentLazyLoading: function() {
      const lazyContent = document.querySelectorAll('[data-lazy-load]');
      
      if ('IntersectionObserver' in window) {
        const contentObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const element = entry.target;
              element.classList.add('loaded');
              contentObserver.unobserve(element);
            }
          });
        });

        lazyContent.forEach(content => contentObserver.observe(content));
      }
    }
  };

  // Animation System
  const animations = {
    init: function() {
      this.setupScrollAnimations();
      this.setupHoverAnimations();
      
      utils.log('Animations initialized');
    },

    setupScrollAnimations: function() {
      const animatedElements = document.querySelectorAll('[data-animate]');
      
      if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const element = entry.target;
              const animationType = element.dataset.animate;
              element.classList.add(`animate-${animationType}`);
              animationObserver.unobserve(element);
            }
          });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => animationObserver.observe(element));
      }
    },

    setupHoverAnimations: function() {
      // Add CSS for animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Initialize WAIO Framework
  function init() {
    utils.log('WAIO Framework initializing...');
    
    // Initialize modules
    aiOptimization.init();
    accessibility.init();
    components.init();
    performance.init();
    lazyLoading.init();
    animations.init();
    
    // Mark framework as ready
    WAIO.ready = true;
    document.body.classList.add('waio-ready');
    
    // Dispatch ready event
    window.dispatchEvent(new CustomEvent('WAIOReady', {
      detail: { version: '1.0.0' }
    }));
    
    utils.log('WAIO Framework ready!');
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose WAIO to global scope
  window.WAIO = Object.assign(WAIO, {
    utils,
    aiOptimization,
    accessibility,
    components,
    performance,
    lazyLoading,
    animations,
    config,
    version: '1.0.0'
  });

})();

