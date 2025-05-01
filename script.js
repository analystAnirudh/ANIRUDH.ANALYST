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

// Tab functionality for About section
const tabLinks = document.getElementsByClassName('tab-links');
const tabContents = document.getElementsByClassName('tab-contents');

function opentab(tabname) {
    for (tablink of tabLinks) {
        tablink.classList.remove('active-link');
    }
    for (tabcontent of tabContents) {
        tabcontent.classList.remove('active-tab');
    }
    event.currentTarget.classList.add('active-link');
    document.getElementById(tabname).classList.add('active-tab');
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

// Active nav link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-btn');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Certifications Section Functionality
function initCertifications() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    
    // Set Data Analytics as default view
    const defaultCategory = '1';
    filterCertificates(defaultCategory);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            filterCertificates(category);
        });
    });
    
    function filterCertificates(category) {
        certificateCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                // Trigger animation again when showing
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'fadeInUp 0.6s forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Certificate viewing functionality
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const certificatePath = button.getAttribute('data-certificate');
            modalImage.src = certificatePath;
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
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize certifications when the section is in view
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
        card.style.transitionDelay = `${index * 0.1}s`;
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

// Add certifications to ScrollReveal
ScrollReveal().reveal('.certificate-card', { 
    origin: 'bottom',
    interval: 100 
});

// Add leadership cards to ScrollReveal
ScrollReveal().reveal('.leadership-card', {
    origin: 'bottom',
    interval: 100

    
});


