// Gamified Scroll Progress Bar
let lastScrollPercentage = 0;
const progressDebounce = 10; // milliseconds

window.addEventListener('scroll', function() {
    const now = Date.now();
    if (now - lastScrollPercentage < progressDebounce) return;
    lastScrollPercentage = now;
    
    const scrollProgressContainer = document.querySelector('.scroll-progress-container');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const progressDot = document.querySelector('.scroll-progress-dot');
    const progressNumber = document.querySelector('.scroll-progress-number');
    
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    const roundedPercentage = Math.round(scrollPercentage);
    
    scrollProgressBar.style.width = scrollPercentage + '%';
    progressNumber.textContent = roundedPercentage;
    
    // Dynamic color change based on progress
    if (scrollPercentage < 30) {
        scrollProgressBar.style.background = 'linear-gradient(90deg, #FF6B6B, #FF8E8E)';
    } else if (scrollPercentage < 70) {
        scrollProgressBar.style.background = 'linear-gradient(90deg, #FF8E8E, #FFC3C3)';
    } else {
        scrollProgressBar.style.background = 'linear-gradient(90deg, #FFC3C3, #FFE66D)';
    }
    
    // Show/hide logic with more prominent appearance
    if (scrollTop > 100 && scrollPercentage < 98) {
        scrollProgressContainer.style.opacity = '1';
        
        // Celebration effect when reaching certain milestones
        if (roundedPercentage % 25 === 0 && roundedPercentage !== 0) {
            progressDot.style.animation = 'none';
            void progressDot.offsetWidth; // Trigger reflow
            progressDot.style.animation = 'pulse 0.5s 3';
        }
    } else {
        scrollProgressContainer.style.opacity = '0';
    }
    
    // Final push encouragement
    if (scrollPercentage > 85) {
        progressNumber.style.color = '#FFE66D';
        progressNumber.style.textShadow = '0 0 5px rgba(255, 230, 109, 0.8)';
        progressDot.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.9), 0 0 15px rgba(255, 230, 109, 1)';
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    const scrollProgressContainer = document.querySelector('.scroll-progress-container');
    setTimeout(() => {
        scrollProgressContainer.style.transition = 'opacity 0.3s ease';
    }, 1000);
});

// Dark/Light Mode Toggle
let darkModeIcon = document.querySelector('#darkMode-icon');
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
}

// Menu Toggle
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Close menu when clicking on nav links or scrolling
document.querySelectorAll('.nav-btn').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Sticky Header
window.addEventListener('scroll', () => {
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Smooth scrolling for all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-btn').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-btn').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Scroll Reveal Animation
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .education-container, .projects-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

// Typed.js Animations
const typedName = new Typed('.typed-name', {
    strings: ['Anirudh Chaudhary'],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1000,
    showCursor: false
});

const typedProfession = new Typed('.multiple-text', {
    strings: ['Data-Driven Business Analyst', 'SQL Expert', 'Power BI Specialist', 'Excel Wizard'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Certifications Section Functionality
function initCertifications() {
    // Category filter functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // Show/hide certificates based on category
            certificateCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Certificate modal functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const certificatePath = btn.dataset.certificate;
            modalImg.src = certificatePath;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize certifications when in view
const certificationsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initCertifications();
            certificationsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const certificationsSection = document.querySelector('.certifications');
if (certificationsSection) {
    certificationsObserver.observe(certificationsSection);
}

// Leadership Section Animation
function initLeadership() {
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(el => {
        const duration = parseInt(el.style.animationDuration) || 10000;
        setInterval(() => {
            el.style.animation = 'none';
            void el.offsetWidth; // Trigger reflow
            el.style.animation = `float ${duration/1000}s ease-in-out infinite`;
        }, duration);
    });

    const cards = document.querySelectorAll('.leadership-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Activate timeline animation
                    const timeline = entry.target.querySelector('.timeline-line');
                    const starItems = entry.target.querySelectorAll('.star-item');
                    
                    if (timeline) {
                        timeline.classList.add('active');
                        
                        // Animate star items sequentially
                        starItems.forEach((item, i) => {
                            setTimeout(() => {
                                item.classList.add('active');
                            }, i * 300);
                        });
                    }
                    
                    // Start counting animation for this card's metrics
                    if (entry.target.querySelector('.count-anim')) {
                        startCounting(entry.target);
                    }
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {
        observer.observe(card);
    });

    // Counting animation function
    function startCounting(card) {
        const metricValues = card.querySelectorAll('.count-anim');
        let delay = 0;
        
        metricValues.forEach(metric => {
            setTimeout(() => {
                const target = parseFloat(metric.dataset.target);
                const suffix = metric.dataset.suffix || '';
                const duration = 1500;
                let start = 0;
                const increment = target / (duration / 16);
                
                const updateCounter = () => {
                    start += increment;
                    if (start < target) {
                        if (suffix === '★') {
                            metric.textContent = start.toFixed(1) + suffix;
                        } else if (suffix === '%' || suffix === '+') {
                            metric.textContent = Math.floor(start) + suffix;
                        } else {
                            metric.textContent = Math.floor(start).toLocaleString() + suffix;
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        metric.textContent = target.toLocaleString() + suffix;
                    }
                };
                
                updateCounter();
            }, delay);
            
            delay += 300; // 0.3s delay between each metric
        });
    }
}

// Initialize leadership section when in view
const leadershipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initLeadership();
            leadershipObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const leadershipSection = document.querySelector('.leadership');
if (leadershipSection) {
    leadershipObserver.observe(leadershipSection);
}

// Testimonials Carousel
function initTestimonials() {
    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.radio-indicator');
    const container = document.querySelector('.testimonials-container');
    const cards = document.querySelectorAll('.testimonial-card');
    
    let currentIndex = 0;
    const cardCount = 4; // Original testimonials count
    let isTransitioning = false;
    let autoScrollInterval;
    
    // Initialize track width and position
    function initializeTrack() {
        const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(track).gap.replace('px', ''));
        track.style.width = `${cardWidth * (cardCount * 2)}px`;
        updateTrackPosition(false);
    }
    
    // Update track position
    function updateTrackPosition(animate = true) {
        const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(track).gap.replace('px', ''));
        if (animate) {
            track.style.transition = 'transform 0.5s ease';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update indicators
        updateIndicators();
    }
    
    // Update navigation indicators
    function updateIndicators() {
        const activeIndex = currentIndex % cardCount;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Go to specific index
    function goToIndex(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex = index;
        updateTrackPosition();
        
        setTimeout(() => {
            isTransitioning = false;
            // Check if we need to loop around
            if (currentIndex >= cardCount * 2 - 2) {
                currentIndex = cardCount;
                updateTrackPosition(false);
            } else if (currentIndex <= 0) {
                currentIndex = cardCount;
                updateTrackPosition(false);
            }
        }, 500);
    }
    
    // Go to next testimonial
    function goToNext() {
        goToIndex(currentIndex + 1);
    }
    
    // Go to previous testimonial
    function goToPrev() {
        goToIndex(currentIndex - 1);
    }
    
    // Start auto-scrolling
    function startAutoScroll() {
        autoScrollInterval = setInterval(goToNext, 6000);
    }
    
    // Stop auto-scrolling
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        goToPrev();
        startAutoScroll();
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        goToNext();
        startAutoScroll();
    });
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const targetIndex = parseInt(this.dataset.index);
            stopAutoScroll();
            goToIndex(targetIndex);
            startAutoScroll();
        });
    });
     
    // Pause on hover
    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        initializeTrack();
        updateIndicators();
    });
    
    // Initialize
    initializeTrack();
    startAutoScroll();
    
    // Handle transition end for seamless looping
    track.addEventListener('transitionend', function() {
        isTransitioning = false;
    });
}

// Initialize testimonials when in view
const testimonialsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initTestimonials();
            testimonialsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const testimonialsSection = document.querySelector('.testimonials');
if (testimonialsSection) {
    testimonialsObserver.observe(testimonialsSection);
}

// Animate skill pie charts with repeating effect
function animatePieCharts() {
    const charts = document.querySelectorAll('.chart');
    const animationDuration = 1500; // 1.5 seconds
    const delayBetweenCharts = 300; // 0.3 seconds
    const repeatInterval = 4000; // 4 seconds
    
    function animateChart(chart, index) {
        const percent = chart.getAttribute('data-percent');
        const pieFill = chart.querySelector('.pie-fill');
        const percentElement = chart.querySelector('.percent');
        
        setTimeout(() => {
            // Reset animation
            pieFill.style.setProperty('--percent', '0');
            percentElement.textContent = '0%';
            
            // Animate the pie fill
            setTimeout(() => {
                pieFill.style.setProperty('--percent', percent);
                
                // Animate the percentage number
                let start = 0;
                const end = parseInt(percent);
                const duration = animationDuration;
                const startTime = performance.now();
                
                function updateNumber(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const currentValue = Math.floor(progress * end);
                    
                    percentElement.textContent = currentValue + '%';
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    }
                }
                
                requestAnimationFrame(updateNumber);
            }, 50);
        }, index * delayBetweenCharts);
    }
    
    // Initial animation
    charts.forEach((chart, index) => {
        animateChart(chart, index);
    });
    
    // Repeat animation every 4 seconds
    setInterval(() => {
        charts.forEach((chart, index) => {
            animateChart(chart, index);
        });
    }, repeatInterval);
}

// Intersection Observer for skill charts
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animatePieCharts();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
observer.observe(skillsSection);

// Reset animations when switching dark/light mode
darkModeIcon.addEventListener('click', () => {
    // Re-animate the pie charts after mode switch
    setTimeout(() => {
        animatePieCharts();
    }, 500);
});

// Popup effect for icons
const popupIcons = document.querySelectorAll('.popup-icon');
popupIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.querySelector('i').style.transform = 'scale(1.2)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.querySelector('i').style.transform = 'scale(1)';
    });
});

// Zoom out effect for about image
const aboutImg = document.querySelector('.about-img img');
aboutImg.addEventListener('mouseenter', () => {
    aboutImg.style.transform = 'scale(0.95)';
});
aboutImg.addEventListener('mouseleave', () => {
    aboutImg.style.transform = 'scale(1)';
});

// Zoom out effect for home image
const homeImg = document.querySelector('.home-img img');
if (homeImg) {
    homeImg.addEventListener('mouseenter', () => {
        homeImg.style.transform = 'scale(0.95)';
    });
    homeImg.addEventListener('mouseleave', () => {
        homeImg.style.transform = 'scale(1)';
    });
}
// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize project card animations
    const projectCards = document.querySelectorAll('.project-card');
    
    // Set animation delay index for each card
    projectCards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });

    // Button shine effect
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'translateX(3px)';
        });
        link.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'translateX(0)';
        });
    });

    // Scroll reveal for projects
    ScrollReveal().reveal('.project-card', {
        delay: 200,
        interval: 100,
        origin: 'bottom',
        distance: '30px',
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: true
    });
});

// Add this to your existing Intersection Observer code
const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
    projectsObserver.observe(card);
});
