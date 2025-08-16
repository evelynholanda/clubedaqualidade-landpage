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
        
        // Enhanced touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        let isScrolling = false;
        
        if (this.track) {
            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isScrolling = false;
            }, { passive: true });
            
            this.track.addEventListener('touchmove', (e) => {
                if (!startX || !startY) return;
                
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                
                const diffX = Math.abs(currentX - startX);
                const diffY = Math.abs(currentY - startY);
                
                // Determine if user is scrolling vertically
                if (diffY > diffX) {
                    isScrolling = true;
                } else if (diffX > 10) {
                    // Prevent page scroll when swiping horizontally
                    e.preventDefault();
                }
            }, { passive: false });
            
            this.track.addEventListener('touchend', (e) => {
                if (!isScrolling) {
                    endX = e.changedTouches[0].clientX;
                    endY = e.changedTouches[0].clientY;
                    this.handleSwipe();
                }
                
                // Reset values
                startX = 0;
                startY = 0;
                endX = 0;
                endY = 0;
                isScrolling = false;
            }, { passive: true });
        }
    }
    
    handleSwipe() {
        const swipeThreshold = 50; // Threshold otimizado para mobile
        const swipeDistance = endX - startX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            // Pause auto-play on swipe
            this.pauseAutoPlay();
            
            if (swipeDistance > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
            
            // Restart auto-play after swipe with longer delay
            this.scheduleAutoPlayRestart(15000);
        }
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        
        if (this.restartTimeout) {
            clearTimeout(this.restartTimeout);
            this.restartTimeout = null;
        }
    }
    
    scheduleAutoPlayRestart(delay = 10000) {
        this.pauseAutoPlay();
        this.restartTimeout = setTimeout(() => {
            this.startAutoPlay();
        }, delay);
    }
    
    // Detect mobile devices
    isMobileDevice() {
        return window.innerWidth <= 768 || 'ontouchstart' in window;
    }
    
    startAutoPlay() {
        this.pauseAutoPlay();
        
        // Adjust autoplay speed based on device type
        const autoPlayDelay = this.isMobileDevice() ? 10000 : 8000;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, autoPlayDelay);
        
        // Only add hover events on non-mobile devices
        if (!this.isMobileDevice() && this.track) {
            this.track.addEventListener('mouseenter', () => {
                this.pauseAutoPlay();
            });
            
            this.track.addEventListener('mouseleave', () => {
                this.scheduleAutoPlayRestart(3000);
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
                    this.pauseAutoPlay();
                    
                    // Longer delay on mobile for better UX
                    const restartDelay = this.isMobileDevice() ? 15000 : 10000;
                    this.scheduleAutoPlayRestart(restartDelay);
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
    // Initialize zoom handler for mobile responsiveness
    new ZoomHandler();
    
    // Initialize hero carousel
    new HeroCarousel();
    
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
// Hero Carousel with Statistics Functionality
class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.statFloating = document.querySelector('.stat-floating');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        if (this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.showSlide(0);
        this.addStatInteractivity();
        this.startAutoPlay();
    }
    
    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        this.currentIndex = index;
    }
    
    nextSlide() {
        const next = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(next);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 6000);
    }
    
    addStatInteractivity() {
        if (!this.statFloating) return;
        
        // Efeito de clique na estatística
        this.statFloating.addEventListener('click', () => {
            this.triggerStatBurst();
        });
        
        // Efeito de hover
        this.statFloating.addEventListener('mouseenter', () => {
            this.statFloating.style.animationPlayState = 'paused';
        });
        
        this.statFloating.addEventListener('mouseleave', () => {
            this.statFloating.style.animationPlayState = 'running';
        });
        
        // Contador animado ao entrar na viewport
        this.animateCounter();
    }
    
    triggerStatBurst() {
        const statNumber = this.statFloating.querySelector('.stat-number-floating');
        if (!statNumber) return;
        
        // Adiciona classe de burst temporariamente
        this.statFloating.classList.add('stat-burst');
        
        // Remove classe após animação
        setTimeout(() => {
            this.statFloating.classList.remove('stat-burst');
        }, 600);
        
        // Cria partículas de celebração
        this.createConfetti();
    }
    
    animateCounter() {
        const statNumber = this.statFloating?.querySelector('.stat-number-floating');
        if (!statNumber) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.countUp(statNumber, 0, 75, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(this.statFloating);
    }
    
    countUp(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * this.easeOutCubic(progress));
            element.textContent = current + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    createConfetti() {
        const colors = ['#10b981', '#34d399', '#3b82f6', '#60a5fa', '#ff6b83'];
        const rect = this.statFloating.getBoundingClientRect();
        
        for (let i = 0; i < 12; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                animation: confettiFall 1.5s ease-out forwards;
            `;
            
            const randomX = (Math.random() - 0.5) * 200;
            const randomY = (Math.random() - 0.5) * 100;
            
            confetti.style.setProperty('--random-x', randomX + 'px');
            confetti.style.setProperty('--random-y', randomY + 'px');
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 1500);
        }
    }
}

// CSS para o efeito burst da estatística
const statBurstCSS = `
.stat-burst {
    animation: statExplode 0.6s ease-out !important;
}

@keyframes statExplode {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.3) rotate(5deg); }
    100% { transform: scale(1) rotate(0deg); }
}

@keyframes confettiFall {
    0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translate(var(--random-x), var(--random-y)) rotate(360deg);
        opacity: 0;
    }
}
`;

// Adiciona CSS dinâmico
const styleSheet = document.createElement('style');
styleSheet.textContent = statBurstCSS;
document.head.appendChild(styleSheet);
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

// Zoom Detection and Adjustment
class ZoomHandler {
    constructor() {
        this.currentZoom = window.devicePixelRatio || 1;
        this.isZooming = false;
        this.init();
    }
    
    init() {
        this.detectZoomChanges();
        this.optimizeForMobile();
    }
    
    detectZoomChanges() {
        // Monitor zoom via resize events
        const checkZoom = () => {
            const newZoom = window.devicePixelRatio || 1;
            if (Math.abs(this.currentZoom - newZoom) > 0.1) {
                this.currentZoom = newZoom;
                this.adjustForZoom();
            }
        };
        
        window.addEventListener('resize', Utils.debounce(checkZoom, 200), { passive: true });
        
        // iOS specific zoom detection
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            document.addEventListener('gesturestart', () => {
                this.isZooming = true;
            }, { passive: true });
            
            document.addEventListener('gestureend', () => {
                this.isZooming = false;
                setTimeout(checkZoom, 100);
            }, { passive: true });
        }
    }
    
    adjustForZoom() {
        // Ensure touch targets remain accessible
        this.ensureTouchTargets();
        
        // Recalculate carousel positions if needed
        this.recalculateCarousels();
    }
    
    ensureTouchTargets() {
        const minSize = 44; // Minimum touch target size
        const buttons = document.querySelectorAll('.buy-button, .carousel-btn, .dot');
        
        buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            if (rect.height < minSize || rect.width < minSize) {
                button.style.minHeight = `${minSize}px`;
                button.style.minWidth = `${minSize}px`;
            }
        });
    }
    
    recalculateCarousels() {
        // Trigger carousel recalculation after zoom
        const carouselTracks = document.querySelectorAll('.carousel-track');
        carouselTracks.forEach(track => {
            const event = new Event('resize');
            window.dispatchEvent(event);
        });
    }
    
    optimizeForMobile() {
        // Add zoom-specific optimizations for mobile
        if (this.isMobileDevice()) {
            document.body.classList.add('mobile-zoom-optimized');
            
            // Prevent double-tap zoom on critical elements
            const criticalElements = document.querySelectorAll('.buy-button, .product-price');
            criticalElements.forEach(element => {
                this.preventDoubleTapZoom(element);
            });
        }
    }
    
    preventDoubleTapZoom(element) {
        let lastTouchEnd = 0;
        element.addEventListener('touchend', (event) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }
    
    isMobileDevice() {
        return window.innerWidth <= 768 || 'ontouchstart' in window;
    }
}

// Export for potential use in other scripts
window.AnaEvelynSite = {
    ProductCarousel,
    AboutCarousel,
    Utils,
    ZoomHandler,
    trackButtonClick
};