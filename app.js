// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

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
    const cs = getComputedStyle(document.body);
    const errorColor = cs.getPropertyValue('--secondary-color').trim() || '#ff006e';
    const neutral = getCurrentTheme() === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255, 255, 255, 0.1)';

    field.style.borderColor = errorColor;
    field.style.boxShadow = '0 0 10px rgba(255, 0, 110, 0.3)';

    // Remove error state after user starts typing
    field.addEventListener('input', function() {
        this.style.borderColor = neutral;
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

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some extra interactive effects
document.addEventListener('mousemove', function(e) {
    // Cursor glow effect
    let cursor = document.querySelector('.cursor-glow');
    if (!cursor) {
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        cursorGlow.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursorGlow);
        cursor = cursorGlow;
    }
    
    cursor.style.left = (e.clientX - 10) + 'px';
    cursor.style.top = (e.clientY - 10) + 'px';
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Remove any notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add some CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: 'Loading Portfolio...';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #00d4ff;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 10001;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});

// Add CSS for active navigation and animate-in classes
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    /* Smooth focus transitions */
    *:focus {
        outline: 2px solid #00d4ff;
        outline-offset: 2px;
    }
    
    /* Improve button accessibility */
    button:focus-visible,
    .btn:focus-visible {
        outline: 2px solid #00d4ff;
        outline-offset: 2px;
    }
`;
document.head.appendChild(additionalStyles);

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
    // Determine initial
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(initial);
    applyThemeToHero3D(initial);

    if (btn) {
        btn.setAttribute('aria-checked', initial === 'dark' ? 'true' : 'false');
        if (icon) icon.textContent = initial === 'light' ? '🌙' : '☀️';
        btn.addEventListener('click', () => {
            const next = getCurrentTheme() === 'light' ? 'dark' : 'light';
            applyTheme(next);
            if (icon) icon.textContent = next === 'light' ? '🌙' : '☀️';
            btn.setAttribute('aria-checked', next === 'dark' ? 'true' : 'false');
            localStorage.setItem('theme', next);
            applyThemeToHero3D(next);
        });
    }
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