// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Enhanced initialization with modern features
function initializeApp() {
    // Initialize all components
    initTypewriter();
    initParticles();
    initHero3D();
    initNavigation();
    initScrollAnimations();
    initStatsCounter();
    initProjectTilt();
    initContactForm();
    initMobileMenu();
    initProjectLinks();
    initMagneticButtons();
    initScrollProgressBar();
    initProjectCardShine();
    initThemeToggle();
    initScrollTop();
    
    // New modern features
    initIntersectionObserver();
    initTouchGestures();
    initKeyboardNavigation();
    initPerformanceOptimizations();
    initAccessibilityEnhancements();
    initModernAnimations();
}

// Typewriter Effect
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    const texts = [
        'Software Developer Engineer',
        'Full-Stack Developer',
        'MERN Stack Expert',
        'AI/ML Enthusiast',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            // Typing
            typewriter.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, 2000);
            }
        } else {
            // Deleting
            typewriter.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        
        if (!isPaused) {
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }
    }
    
    // Start after initial delay
    setTimeout(typeEffect, 2000);
}

// Particle System
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        particle.style.left = startX + 'px';
        
        // Random animation duration
        const duration = Math.random() * 3 + 2; // 2-5 seconds
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 2;
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentElement) {
                particle.remove();
            }
        }, (duration + delay) * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createParticle(), Math.random() * 5000);
    }
    
    // Continuously create new particles
    setInterval(createParticle, 200);
}

// Navigation - Fixed smooth scrolling
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar.offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        let current = '';
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', debounce(updateActiveNav, 10));
    
    // Navbar background on scroll
    window.addEventListener('scroll', debounce(() => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.backdropFilter = 'blur(20px)';
    }, 10));
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Project Links - Fixed external links
function initProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const url = this.getAttribute('href');
            if (url && url !== '#') {
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
                
                setTimeout(() => {
                    window.open(url, '_blank', 'noopener,noreferrer');
                    this.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .achievement-card, .stat-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-card');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    });
    
    if (statCards.length > 0) {
        statsObserver.observe(statCards[0]);
    }
    
    function animateStats() {
        statCards.forEach(card => {
            const target = parseInt(card.getAttribute('data-target'));
            const numberElement = card.querySelector('.stat-number');
            let current = 0;
            const increment = target / 100;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                numberElement.textContent = Math.floor(current);
            }, stepTime);
        });
    }
}

// Project Card 3D Tilt Effect
function initProjectTilt() {
    const projectCards = document.querySelectorAll('[data-tilt]');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease-out';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10; // Max 10 degrees
            const rotateY = (x - centerX) / centerX * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s ease';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();

            // Clear previous error styles
            const inputs = this.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            });

            // Validation
            let isValid = true;

            if (!name) {
                showFieldError(this.querySelector('#name'), 'Name is required');
                isValid = false;
            }

            if (!email) {
                showFieldError(this.querySelector('#email'), 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showFieldError(this.querySelector('#email'), 'Enter a valid email address');
                isValid = false;
            }

            if (!subject) {
                showFieldError(this.querySelector('#subject'), 'Subject is required');
                isValid = false;
            }

            if (!message) {
                showFieldError(this.querySelector('#message'), 'Message is required');
                isValid = false;
            }

            if (!isValid) {
                showNotification('Please fix the errors and try again', 'error');
                return;
            }

            // Send form to Formspree
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showNotification(`Thank you ${name}! Your message has been sent successfully.`, 'success');
                    this.reset();
                } else {
                    showNotification('Something went wrong. Please try again later.', 'error');
                }
            })
            .catch(error => {
                console.error(error);
                showNotification('Network error. Please try again later.', 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            });
        });
    }
}

// Helper function to show field errors
function showFieldError(field, message) {
    field.style.borderColor = '#ff006e';
    field.style.boxShadow = '0 0 10px rgba(255, 0, 110, 0.3)';
    
    // Remove error state after user starts typing
    field.addEventListener('input', function() {
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        this.style.boxShadow = 'none';
    }, { once: true });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const colors = {
        success: '#39ff14',
        error: '#ff006e',
        info: '#00d4ff'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 350px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        line-height: 1.4;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    const timeout = type === 'success' ? 6000 : 4000;
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, timeout);
}

// Enhanced intersection observer for better animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const ratio = entry.intersectionRatio;
            
            if (entry.isIntersecting) {
                element.classList.add('in-view');
                
                // Staggered animation for child elements
                const children = element.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
                
                // Trigger custom animations based on element type
                if (element.classList.contains('stat-card')) {
                    triggerStatAnimation(element);
                }
                
                if (element.classList.contains('skill-item')) {
                    triggerSkillAnimation(element);
                }
                
                // Update element opacity based on intersection ratio
                element.style.opacity = Math.max(0.3, ratio);
            } else {
                element.style.opacity = Math.max(0.1, ratio);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.project-card, .achievement-card, .skill-category, .stat-card, .timeline-item, .contact-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
        el.style.transition = 'opacity 0.3s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// Enhanced touch gestures for mobile
function initTouchGestures() {
    let touchStartY = 0;
    let touchStartX = 0;
    
    // Swipe gestures for navigation
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const deltaY = touchStartY - touchEndY;
        const deltaX = touchStartX - touchEndX;
        
        // Vertical swipe for sections
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
            if (deltaY > 0) {
                // Swipe up - next section
                scrollToNextSection();
            } else {
                // Swipe down - previous section
                scrollToPreviousSection();
            }
        }
        
        // Horizontal swipe for theme toggle (right edge)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100 && touchStartX > window.innerWidth - 100) {
            const themeBtn = document.getElementById('theme-toggle');
            if (themeBtn) themeBtn.click();
        }
    }, { passive: true });
    
    // Enhanced touch feedback for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .project-card, .social-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => {
                element.style.transform = '';
            }, 150);
        }, { passive: true });
    });
}

// Enhanced keyboard navigation
function initKeyboardNavigation() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let currentFocusIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        const focusableList = Array.from(document.querySelectorAll(focusableElements));
        
        switch (e.key) {
            case 'Tab':
                // Enhanced tab navigation with visual feedback
                if (!e.shiftKey) {
                    currentFocusIndex = (currentFocusIndex + 1) % focusableList.length;
                } else {
                    currentFocusIndex = (currentFocusIndex - 1 + focusableList.length) % focusableList.length;
                }
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                scrollToNextSection();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                scrollToPreviousSection();
                break;
                
            case 'Home':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
                
            case 'End':
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;
                
            case 'Escape':
                // Close any open modals or menus
                closeAllModals();
                break;
        }
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
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
    
    // Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 16); // ~60fps
    };
    
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Accessibility enhancements
function initAccessibilityEnhancements() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const mainContent = document.querySelector('.hero');
    if (mainContent) {
        mainContent.setAttribute('id', 'main');
        mainContent.setAttribute('role', 'main');
    }
    
    // Enhanced ARIA labels
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (!section.getAttribute('aria-label')) {
            const heading = section.querySelector('h1, h2, h3');
            if (heading) {
                section.setAttribute('aria-labelledby', heading.id || `section-${index}`);
                if (!heading.id) heading.id = `section-${index}`;
            }
        }
    });
    
    // Live region for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
}

// Modern animations with better performance
function initModernAnimations() {
    // Parallax effect for hero elements
    const parallaxElements = document.querySelectorAll('.parallax');
    
    const handleParallax = debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16);
    
    window.addEventListener('scroll', handleParallax);
    
    // Smooth reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Helper functions for navigation
function scrollToNextSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();
    const nextIndex = (currentSection + 1) % sections.length;
    
    sections[nextIndex].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    announceToScreenReader(`Navigated to ${sections[nextIndex].getAttribute('aria-label') || 'next section'}`);
}

function scrollToPreviousSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();
    const prevIndex = (currentSection - 1 + sections.length) % sections.length;
    
    sections[prevIndex].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    announceToScreenReader(`Navigated to ${sections[prevIndex].getAttribute('aria-label') || 'previous section'}`);
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPos) {
            return i;
        }
    }
    return 0;
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal, .nav-menu.active');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) hamburger.classList.remove('active');
}

function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

function triggerStatAnimation(element) {
    const number = element.querySelector('.stat-number');
    const target = parseInt(element.dataset.target);
    
    if (number && !element.classList.contains('animated')) {
        element.classList.add('animated');
        animateNumber(number, 0, target, 2000);
    }
}

function triggerSkillAnimation(element) {
    if (!element.classList.contains('skill-animated')) {
        element.classList.add('skill-animated');
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = '';
        }, 300);
    }
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = end.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Enhanced debounce function with immediate option
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Enhanced throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add modern CSS classes to HTML elements
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to elements that should animate in
    const elementsToReveal = document.querySelectorAll(
        '.project-card, .achievement-card, .skill-category, .timeline-item'
    );
    elementsToReveal.forEach(el => el.classList.add('reveal'));
    
    // Add parallax class to background elements
    const backgroundElements = document.querySelectorAll(
        '.floating-shapes, .neon-grid'
    );
    backgroundElements.forEach(el => el.classList.add('parallax'));
    
    // Add interactive hover class to clickable elements
    const interactiveElements = document.querySelectorAll(
        '.btn, .nav-link, .project-card, .social-link, .contact-item'
    );
    interactiveElements.forEach(el => el.classList.add('interactive-hover'));
});

let __hero3D = { scene: null, lights: {}, objects: {}, renderer: null, camera: null };

function initHero3D() {
    try {
        if (!window.THREE) return;
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a0a, 0.008);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 60);

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const rootGroup = new THREE.Group();
        scene.add(rootGroup);

        // Lighting
        const ambient = new THREE.AmbientLight(0x1a1a1a, 1.2);
        scene.add(ambient);
        const point = new THREE.PointLight(0x00d4ff, 1.2, 300);
        point.position.set(30, 40, 50);
        scene.add(point);

        // Central geometry
        const coreGeo = new THREE.IcosahedronGeometry(12, 1);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            metalness: 0.6,
            roughness: 0.2,
            emissive: 0x0c2a33,
            emissiveIntensity: 0.7,
            envMapIntensity: 0.6,
            wireframe: false
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        rootGroup.add(core);

        // Wireframe overlay
        const wireMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.15 });
        const wire = new THREE.Mesh(coreGeo, wireMat);
        wire.scale.setScalar(1.02);
        rootGroup.add(wire);

        // Starfield
        const starCount = 2000;
        const starGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 600;      // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 600;  // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 600;  // z
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const starMat = new THREE.PointsMaterial({ color: 0x00d4ff, size: 1.5, sizeAttenuation: true, transparent: true, opacity: 0.8 });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        __hero3D = {
            scene,
            renderer,
            camera,
            lights: { ambient, point },
            objects: { rootGroup, core, wire, stars }
        };

        // Apply initial theme colors
        applyThemeToHero3D(getCurrentTheme());

        // Mouse parallax
        const mouse = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        window.addEventListener('mousemove', (e) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            mouse.x = nx;
            mouse.y = ny;
        });

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        let last = performance.now();
        function animate(now) {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;

            // Ease towards mouse
            target.x += (mouse.x - target.x) * 0.05;
            target.y += (mouse.y - target.y) * 0.05;

            const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!reduceMotion) {
                rootGroup.rotation.y += 0.15 * dt;
                rootGroup.rotation.x += 0.07 * dt;
                stars.rotation.y -= 0.02 * dt;
                stars.rotation.x += 0.01 * dt;
            }

            // Parallax
            camera.position.x = target.x * 5;
            camera.position.y = -target.y * 3;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    } catch (err) {
        console.error('initHero3D error', err);
    }
}

function applyThemeToHero3D(theme) {
    if (!__hero3D.scene) return;
    const { scene, lights, objects } = __hero3D;
    const isLight = theme === 'light';

    // Fog/background tone
    scene.fog.density = isLight ? 0.006 : 0.008;

    // Light colors
    lights.ambient.color.set(isLight ? 0xf0f0f0 : 0x1a1a1a);
    lights.point.color.set(isLight ? 0x1363df : 0x00d4ff);

    // Object materials
    if (objects.core && objects.core.material) {
        objects.core.material.color.set(isLight ? 0xffffff : 0x0a0a0a);
        objects.core.material.emissive.set(isLight ? 0x172554 : 0x0c2a33);
        objects.core.material.needsUpdate = true;
    }
    if (objects.wire && objects.wire.material) {
        objects.wire.material.color.set(isLight ? 0x1363df : 0x00d4ff);
        objects.wire.material.needsUpdate = true;
    }
    if (objects.stars && objects.stars.material) {
        objects.stars.material.color.set(isLight ? 0x1363df : 0x00d4ff);
        objects.stars.material.needsUpdate = true;
    }
}

function getCurrentTheme() {
    return document.body.getAttribute('data-theme') || 'dark';
}

function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    const icon = btn ? btn.querySelector('.theme-icon') : null;
    
    // Determine initial theme
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    
    // Apply initial theme
    applyTheme(initial);
    
    if (btn && icon) {
        // Set initial state
        updateThemeButton(btn, icon, initial);
        
        // Add click handler with improved feedback
        btn.addEventListener('click', (e) => {
            // Prevent double clicks during animation
            if (btn.classList.contains('animating')) return;
            
            btn.classList.add('animating');
            
            // Add click animation
            btn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                const current = getCurrentTheme();
                const next = current === 'light' ? 'dark' : 'light';
                
                // Apply theme changes
                applyTheme(next);
                updateThemeButton(btn, icon, next);
                localStorage.setItem('theme', next);
                applyThemeToHero3D(next);
                
                // Reset button state
                btn.style.transform = '';
                btn.classList.remove('animating');
                
                // Show subtle feedback
                showThemeChangeNotification(next);
            }, 150);
        });
        
        // Add keyboard support
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    }
}

function updateThemeButton(btn, icon, theme) {
    const isDark = theme === 'dark';
    btn.setAttribute('aria-checked', isDark.toString());
    btn.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    
    // Update icon with smooth transition
    icon.style.transform = 'scale(0)';
    setTimeout(() => {
        icon.textContent = isDark ? '☀️' : '🌙';
        icon.style.transform = 'scale(1)';
    }, 200);
}

function showThemeChangeNotification(theme) {
    // Create a subtle notification
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.textContent = `Switched to ${theme} mode`;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        color: var(--color-text);
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    });
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 2000);
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
}

function initScrollTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    const onScroll = () => {
        if (window.scrollY > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    };
    window.addEventListener('scroll', debounce(onScroll, 10));
    onScroll();
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Magnetic hover for primary buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-3d');
    buttons.forEach((btn) => {
        let rect = null;
        function onMove(e) {
            if (!rect) rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const dx = (x - cx) / cx;
            const dy = (y - cy) / cy;
            btn.style.transform = `translate3d(${dx * 6}px, ${dy * 6}px, 0) scale(1.04)`;
            btn.style.boxShadow = `${-dx * 12}px ${dy * 12}px 30px rgba(0, 212, 255, 0.25)`;
        }
        function onLeave() {
            btn.style.transform = '';
            btn.style.boxShadow = '';
            rect = null;
        }
        btn.addEventListener('mousemove', onMove);
        btn.addEventListener('mouseleave', onLeave);
    });
}

// Scroll progress bar
function initScrollProgressBar() {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    bar.style.cssText = `position:fixed;top:0;left:0;height:3px;width:0;z-index:1001;` +
        `background: linear-gradient(90deg, #00d4ff, #8338ec);box-shadow:0 0 10px rgba(0,212,255,0.5);`;
    document.body.appendChild(bar);

    function update() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
        bar.style.width = (progress * 100) + '%';
    }
    window.addEventListener('scroll', debounce(update, 10));
    update();
}

// Project card shine CSS variables update
function initProjectCardShine() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
        });
    });
}