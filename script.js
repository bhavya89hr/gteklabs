// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll with enhanced effects
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        nav.style.backdropFilter = 'blur(20px)';
        
        // Change text color for better contrast
        nav.querySelectorAll('.nav-brand, .nav-link').forEach(el => {
            el.style.color = '#1e293b';
        });
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.1)';
        nav.style.boxShadow = 'none';
        nav.style.backdropFilter = 'blur(20px)';
        
        // Reset text color
        nav.querySelectorAll('.nav-brand, .nav-link').forEach(el => {
            el.style.color = 'white';
        });
    }
});

// Enhanced scroll animations with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100); // Stagger animation
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.feature-card, .use-case-card, .tool-card, .why-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Enhanced contact form handling with better UX
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[placeholder="Your Name"]').value,
        email: this.querySelector('input[placeholder="Your Email"]').value,
        projectType: this.querySelector('input[placeholder="Project Type"]').value,
        message: this.querySelector('textarea').value
    };
    
    // Enhanced validation with visual feedback
    const requiredFields = [
        { field: formData.name, element: this.querySelector('input[placeholder="Your Name"]'), message: 'Name is required' },
        { field: formData.email, element: this.querySelector('input[placeholder="Your Email"]'), message: 'Email is required' },
        { field: formData.message, element: this.querySelector('textarea'), message: 'Message is required' }
    ];
    
    let isValid = true;
    
    requiredFields.forEach(({ field, element, message }) => {
        if (!field) {
            element.style.borderColor = '#ef4444';
            element.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
            showToast(message, 'error');
            isValid = false;
        } else {
            element.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            element.style.boxShadow = 'none';
        }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
        const emailField = this.querySelector('input[placeholder="Your Email"]');
        emailField.style.borderColor = '#ef4444';
        emailField.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
        showToast('Please enter a valid email address', 'error');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Enhanced submission animation
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
    submitButton.disabled = true;
    submitButton.style.background = 'rgba(255, 255, 255, 0.3)';
    
    // Simulate API call with realistic timing
    setTimeout(() => {
        showToast('Thank you! We will get back to you soon.', 'success');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.background = '';
        
        // Add success animation
        submitButton.style.transform = 'scale(1.05)';
        setTimeout(() => {
            submitButton.style.transform = '';
        }, 200);
    }, 2000);
});

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 4000);
}

// Enhanced CTA button interactions with ripple effect
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
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
            background: rgba(255, 255, 255, 0.3);
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

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Enhanced parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Parallax for conversation demo
    const conversationDemo = document.querySelector('.conversation-demo');
    if (conversationDemo) {
        conversationDemo.style.transform = `translateY(${scrolled * -0.1}px) rotateX(${scrolled * 0.01}deg)`;
    }
});

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', function() {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Enhanced loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Handle HTML tags
                const tagEnd = text.indexOf('>', i);
                element.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        } else {
            // Add cursor blink effect
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            element.appendChild(cursor);
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                cursor.remove();
            }, 3000);
        }
    }
    
    type();
}

// Add cursor blink animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(cursorStyle);

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 30);
        }, 1000);
    }
});

// Enhanced card hover effects with 3D transform
document.querySelectorAll('.feature-card, .use-case-card, .tool-card, .why-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-12px) scale(1.03) rotateX(5deg)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(99, 102, 241, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        this.style.boxShadow = '';
    });
    
    // Add mouse move effect for subtle 3D tilt
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `translateY(-12px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Particle system for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', createParticles);

// Enhanced mobile menu (for future implementation)
const navToggle = document.createElement('button');
navToggle.className = 'nav-toggle';
navToggle.innerHTML = '☰';
navToggle.style.cssText = `
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.3s ease;
`;

navToggle.addEventListener('click', function() {
    this.style.transform = 'scale(1.1) rotate(90deg)';
    setTimeout(() => {
        this.style.transform = '';
    }, 200);
});

// Responsive menu handling
const mediaQuery = window.matchMedia('(max-width: 768px)');
function handleMobileMenu(e) {
    if (e.matches) {
        navToggle.style.display = 'block';
        document.querySelector('.nav-brand').appendChild(navToggle);
    } else {
        navToggle.style.display = 'none';
    }
}

mediaQuery.addListener(handleMobileMenu);
handleMobileMenu(mediaQuery);

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0.8';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(section);
});

// Add revealed class styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .section.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(revealStyle);

// Enhanced scroll-triggered animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Animate navigation logo
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.style.transform = `rotate(${scrolled * 0.1}deg)`;
    }
    
    // Animate section titles
    document.querySelectorAll('.section-title').forEach(title => {
        const rect = title.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
            const progress = (windowHeight - rect.top) / windowHeight;
            title.style.transform = `translateX(${(1 - progress) * 50}px)`;
            title.style.opacity = progress;
        }
    });
});

// Add performance optimization for animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(animationStyle);
}