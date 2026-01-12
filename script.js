/* ===================================
   AutoDirect Insurance - JavaScript
   Full Functionality with Infinite Scroll
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all features
    initMobileMenu();
    initScrollEffects();
    initInfiniteScroll();
    initQuoteForm();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initAnimations();
    initLocationButton();
}

// ===================================
// Mobile Menu Toggle
// ===================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : 'none';
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ===================================
// Scroll Effects (Header & Reveal)
// ===================================
function initScrollEffects() {
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Header hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        
        // Reveal elements on scroll
        revealOnScroll();
    });
}

// ===================================
// Infinite Scroll Effect
// ===================================
function initInfiniteScroll() {
    let isLoading = false;
    const insuranceProducts = document.querySelector('.insurance-products');
    
    if (!insuranceProducts) return;
    
    // Store original products
    const originalProducts = Array.from(insuranceProducts.children);
    
    window.addEventListener('scroll', function() {
        // Check if user is near bottom of page
        const scrollPosition = window.innerHeight + window.pageYOffset;
        const pageHeight = document.documentElement.scrollHeight;
        
        if (scrollPosition >= pageHeight - 500 && !isLoading) {
            isLoading = true;
            loadMoreProducts();
        }
    });
    
    function loadMoreProducts() {
        // Show loading indicator
        const loader = document.createElement('div');
        loader.className = 'loading-indicator';
        loader.innerHTML = '<div class="spinner"></div><p>Loading more insurance options...</p>';
        loader.style.cssText = 'text-align: center; padding: 2rem; color: var(--text-secondary);';
        
        const spinner = document.createElement('style');
        spinner.textContent = `
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid var(--border-color);
                border-top-color: var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinner);
        
        insuranceProducts.parentElement.appendChild(loader);
        
        // Simulate loading delay (in real app, this would be an API call)
        setTimeout(() => {
            // Clone and append products with slight variations
            originalProducts.forEach((product, index) => {
                const clone = product.cloneNode(true);
                clone.style.opacity = '0';
                clone.style.transform = 'translateY(30px)';
                insuranceProducts.appendChild(clone);
                
                // Animate in
                setTimeout(() => {
                    clone.style.transition = 'all 0.5s ease-out';
                    clone.style.opacity = '1';
                    clone.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            // Remove loader
            loader.remove();
            isLoading = false;
        }, 1500);
    }
}

// ===================================
// Scroll Reveal Animation
// ===================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// ===================================
// Quote Form Handler
// ===================================
function initQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const zipCode = document.getElementById('zipCode').value;
            const insuranceType = document.querySelector('input[name="insuranceType"]:checked').value;
            
            // Show loading state
            const submitBtn = quoteForm.querySelector('.btn-get-quote');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('Quote request submitted successfully! We\'ll contact you shortly.', 'success');
                
                // Reset form
                quoteForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Log data (in real app, send to server)
                console.log('Quote Request:', {
                    location: zipCode,
                    insuranceType: insuranceType,
                    timestamp: new Date().toISOString()
                });
            }, 2000);
        });
        
        // Add real-time validation
        const zipInput = document.getElementById('zipCode');
        if (zipInput) {
            zipInput.addEventListener('input', function() {
                if (this.value.length > 0) {
                    this.style.borderColor = 'var(--success-color)';
                } else {
                    this.style.borderColor = 'var(--border-color)';
                }
            });
        }
    }
}

// ===================================
// Contact Form Handler
// ===================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Add input validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
    }
}

// ===================================
// Input Validation
// ===================================
function validateInput(input) {
    if (input.hasAttribute('required') && !input.value.trim()) {
        input.style.borderColor = 'var(--error-color)';
        return false;
    }
    
    if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            input.style.borderColor = 'var(--error-color)';
            return false;
        }
    }
    
    if (input.type === 'tel' && input.value) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(input.value.replace(/\s/g, ''))) {
            input.style.borderColor = 'var(--warning-color)';
            return false;
        }
    }
    
    input.style.borderColor = 'var(--success-color)';
    return true;
}

// ===================================
// Location Button
// ===================================
function initLocationButton() {
    const locationBtn = document.querySelector('.btn-location');
    const zipInput = document.getElementById('zipCode');
    
    if (locationBtn && zipInput) {
        locationBtn.addEventListener('click', function() {
            if ('geolocation' in navigator) {
                locationBtn.textContent = '⏳';
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        // In real app, reverse geocode to get location name
                        zipInput.value = 'Nairobi, Kenya';
                        zipInput.style.borderColor = 'var(--success-color)';
                        locationBtn.textContent = '✓';
                        
                        setTimeout(() => {
                            locationBtn.textContent = '📍';
                        }, 2000);
                        
                        showNotification('Location detected successfully!', 'success');
                    },
                    function(error) {
                        locationBtn.textContent = '📍';
                        showNotification('Unable to detect location. Please enter manually.', 'error');
                    }
                );
            } else {
                showNotification('Geolocation is not supported by your browser.', 'error');
            }
        });
    }
}

// ===================================
// Back to Top Button
// ===================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#quote') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: 10px;
        box-shadow: var(--box-shadow-hover);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', function() {
        this.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => this.remove(), 300);
    });
}

// ===================================
// Additional Animations
// ===================================
function initAnimations() {
    // Animate insurance cards on hover
    const insuranceCards = document.querySelectorAll('.insurance-card');
    insuranceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.querySelector('input[type="radio"]').checked) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroSection.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
    
    // Counter animation for stats
    animateCounters();
}

// ===================================
// Counter Animation
// ===================================
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (number && !target.classList.contains('animated')) {
                    target.classList.add('animated');
                    animateValue(target, 0, number, 2000, text);
                }
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration, originalText) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        // Preserve the original format
        if (originalText.includes('+')) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        } else if (originalText.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ===================================
// Progressive Content Loading
// ===================================
function progressiveLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
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
}

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
    
    // Ctrl/Cmd + K for quick search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('zipCode')?.focus();
    }
});

// ===================================
// Performance Monitoring
// ===================================
if ('performance' in window) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}

// ===================================
// Service Worker Registration (PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ===================================
// Export functions for testing
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        showNotification,
        validateInput
    };
}
