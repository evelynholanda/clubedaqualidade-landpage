// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling for anchor links
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

// Product Carousel Functionality
class ProductCarousel {
    constructor(config = {}) {
        this.track = document.getElementById(config.trackId || 'carouselTrack');
        this.prevBtn = document.getElementById(config.prevBtnId || 'prevBtn');
        this.nextBtn = document.getElementById(config.nextBtnId || 'nextBtn');
        this.dotsContainer = document.getElementById(config.dotsId || 'carouselDots');
        this.counter = document.getElementById(config.counterId || 'carouselCounter');
        
        if (!this.track) return;
        
        this.cards = this.track.querySelectorAll('.product-card');
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.autoPlayInterval = null;
        this.restartTimeout = null;
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.updateCarousel();
        this.bindEvents();
        this.startAutoPlay();
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        for (let i = 0; i < this.totalCards; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir para produto ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                this.goToSlide(i);
            });
            
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateCarousel() {
        if (!this.track) return;
        
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update counter
        if (this.counter) {
            this.counter.textContent = `${this.currentIndex + 1} / ${this.totalCards}`;
        }
        
        // Update dots
        const dots = this.dotsContainer?.querySelectorAll('.dot');
        if (dots) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
        
        // Update buttons
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.totalCards - 1;
        }
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalCards) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }
    
    nextSlide() {
        if (this.currentIndex < this.totalCards - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back to first
        }
        this.updateCarousel();
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.totalCards - 1; // Loop to last
        }
        this.updateCarousel();
    }
    
    bindEvents() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        if (this.track) {
            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            this.track.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                this.handleSwipe();
            });
        }
    }
    
    handleSwipe() {
        const swipeThreshold = 30; // Mais sensível no mobile
        const swipeDistance = startX - endX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            // Pause auto-play on swipe
            clearInterval(this.autoPlayInterval);
            
            if (swipeDistance > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
            
            // Restart auto-play after swipe
            if (this.restartTimeout) {
                clearTimeout(this.restartTimeout);
            }
            this.restartTimeout = setTimeout(() => {
                this.startAutoPlay();
            }, 12000); // Mais tempo após swipe
        }
    }
    
    startAutoPlay() {
        // Primeiro, sempre limpa qualquer interval existente
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        
        // Limpa qualquer timeout de restart pendente
        if (this.restartTimeout) {
            clearTimeout(this.restartTimeout);
            this.restartTimeout = null;
        }
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 8000); // Change slide every 8 seconds
        
        // Pause autoplay on hover and interaction
        if (this.track) {
            this.track.addEventListener('mouseenter', () => {
                clearInterval(this.autoPlayInterval);
            });
            
            this.track.addEventListener('mouseleave', () => {
                // Wait 3 seconds before restarting auto-play
                if (this.restartTimeout) {
                    clearTimeout(this.restartTimeout);
                }
                this.restartTimeout = setTimeout(() => {
                    this.startAutoPlay();
                }, 3000);
            });
        }
        
        // Pause on button clicks
        this.pauseAutoPlayOnInteraction();
    }
    
    pauseAutoPlayOnInteraction() {
        // Pause auto-play when user interacts with controls
        const interactionElements = [this.prevBtn, this.nextBtn, ...this.dotsContainer?.querySelectorAll('.dot') || []];
        
        interactionElements.forEach(element => {
            if (element) {
                element.addEventListener('click', () => {
                    clearInterval(this.autoPlayInterval);
                    this.autoPlayInterval = null;
                    
                    // Restart after 10 seconds of no interaction
                    if (this.restartTimeout) {
                        clearTimeout(this.restartTimeout);
                    }
                    this.restartTimeout = setTimeout(() => {
                        this.startAutoPlay();
                    }, 10000);
                });
            }
        });
    }
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit, .achievement, .testimonial');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Header scroll effect
function headerScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            // Hide header on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

// Button click analytics (placeholder for future implementation)
function trackButtonClick(buttonText, productName = '') {
    // This function can be used to track button clicks for analytics
    console.log(`Button clicked: ${buttonText}`, productName ? `Product: ${productName}` : '');
    
    // Example: Google Analytics event tracking
    // gtag('event', 'click', {
    //     event_category: 'Button',
    //     event_label: buttonText,
    //     value: productName
    // });
}

// Add click tracking to buy buttons
function addButtonTracking() {
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const productCard = this.closest('.product-card');
            const productName = productCard?.querySelector('.product-title')?.textContent || 'Unknown Product';
            trackButtonClick('Buy Now', productName);
        });
    });
    
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            trackButtonClick(this.textContent.trim());
        });
    });
}

// Form validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Loading state management
function showLoading(element) {
    const originalText = element.textContent;
    element.textContent = 'Carregando...';
    element.disabled = true;
    
    return originalText;
}

function hideLoading(element, originalText) {
    element.textContent = originalText;
    element.disabled = false;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousels
    new ProductCarousel({
        trackId: 'ebooksCarouselTrack',
        prevBtnId: 'ebooksPrevBtn',
        nextBtnId: 'ebooksNextBtn',
        dotsId: 'ebooksCarouselDots',
        counterId: 'ebooksCarouselCounter'
    });
    
    new ProductCarousel({
        trackId: 'agentsCarouselTrack',
        prevBtnId: 'agentsPrevBtn',
        nextBtnId: 'agentsNextBtn',
        dotsId: 'agentsCarouselDots',
        counterId: 'agentsCarouselCounter'
    });
    
    new ProductCarousel({
        trackId: 'coursesCarouselTrack',
        prevBtnId: 'coursesPrevBtn',
        nextBtnId: 'coursesNextBtn',
        dotsId: 'coursesCarouselDots',
        counterId: 'coursesCarouselCounter'
    });
    
    new ProductCarousel({
        trackId: 'aiMentoringCarouselTrack',
        prevBtnId: 'aiMentoringPrevBtn',
        nextBtnId: 'aiMentoringNextBtn',
        dotsId: 'aiMentoringCarouselDots',
        counterId: 'aiMentoringCarouselCounter'
    });
    
    new AboutCarousel();
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Initialize header scroll effect
    headerScrollEffect();
    
    // Add button click tracking
    addButtonTracking();
    
    // Add loading states to external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const originalText = showLoading(this);
            
            // Restore button after 2 seconds
            setTimeout(() => {
                hideLoading(this, originalText);
            }, 2000);
        });
    });
});
const heroSlides = document.querySelectorAll('#heroCarousel .hero-slide');
let heroIndex = 0;

function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.style.display = i === index ? 'grid' : 'none';
    });
}

function cycleHero() {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    showHeroSlide(heroIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    showHeroSlide(heroIndex);
    setInterval(cycleHero, 5500);
});
// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
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
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Utility functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
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
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Format currency
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
};

// About Carousel Functionality
class AboutCarousel {
    constructor() {
        this.carousel = document.getElementById('aboutCarousel');
        this.slides = this.carousel?.querySelectorAll('.about-slide');
        this.prevBtn = document.getElementById('aboutPrevBtn');
        this.nextBtn = document.getElementById('aboutNextBtn');
        this.dots = document.querySelectorAll('.about-dot');
        this.currentIndex = 0;
        
        if (this.carousel) {
            this.init();
        }
    }
    
    init() {
        this.showSlide(0);
        this.bindEvents();
    }
    
    showSlide(index) {
        this.slides?.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        
        this.dots?.forEach((dot, i) => {
            if (i === index) {
                dot.style.background = 'var(--primary-green)';
                dot.classList.add('active');
            } else {
                dot.style.background = 'var(--medium-gray)';
                dot.classList.remove('active');
            }
        });
        
        this.currentIndex = index;
    }
    
    nextSlide() {
        const next = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    }
    
    bindEvents() {
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        
        this.dots?.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });
    }
}

// Export for potential use in other scripts
window.AnaEvelynSite = {
    ProductCarousel,
    AboutCarousel,
    Utils,
    trackButtonClick
};