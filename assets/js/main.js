// ===== MAIN JAVASCRIPT =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initThemeToggle();
    initTestimonialSlider();
    initContactForm();
});

// Mobile Navigation Toggle
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        // Toggle menu when hamburger icon is clicked
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Add scrolled class to header on scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Scroll Effects (Back to Top button, Scroll Animations)
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        // Scroll to top when button is clicked
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Dark/Light Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme, themeToggle);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark', themeToggle);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeToggle);
        });
    }
}

// Update theme icon based on current theme
function updateThemeIcon(theme, iconElement) {
    if (!iconElement) return;
    
    if (theme === 'dark') {
        iconElement.classList.remove('fa-moon');
        iconElement.classList.add('fa-sun');
    } else {
        iconElement.classList.remove('fa-sun');
        iconElement.classList.add('fa-moon');
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonialSlider = document.getElementById('testimonialSlider');
    const prevButton = document.getElementById('testimonialPrev');
    const nextButton = document.getElementById('testimonialNext');
    
    if (!testimonialSlider || !prevButton || !nextButton) return;
    
    // Add more testimonials dynamically
    const testimonials = [
        {
            text: "Byte-Benders transformed our legacy systems into agile, future-proof solutions.",
            author: "John Smith",
            position: "CTO, XYZ Corp",
            logo: "assets/images/clients/xyz-corp.png"
        },
        {
            text: "Their blockchain expertise helped us create a secure, transparent platform that revolutionized our industry.",
            author: "Sarah Johnson",
            position: "CEO, FinEdge",
            logo: "assets/images/clients/finedge.png"
        },
        {
            text: "The AI solution developed by Byte-Benders increased our operational efficiency by 45% within three months.",
            author: "Michael Chen",
            position: "Operations Director, LogiTech Inc.",
            logo: "assets/images/clients/logitech.png"
        }
    ];
    
    // Create testimonial HTML
    testimonials.forEach((testimonial, index) => {
        if (index === 0) return; // Skip first one as it's already in HTML
        
        const testimonialHTML = `
            <div class="testimonial-item" style="display: none;">
                <div class="testimonial-content">
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="testimonial-author">
                        <div class="author-info">
                            <h4 class="author-name">${testimonial.author}</h4>
                            <p class="author-position">${testimonial.position}</p>
                        </div>
                        <div class="company-logo">
                            <img src="${testimonial.logo}" alt="${testimonial.author}'s Company Logo">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        testimonialSlider.insertAdjacentHTML('beforeend', testimonialHTML);
    });
    
    // Get all testimonial items
    const testimonialItems = testimonialSlider.querySelectorAll('.testimonial-item');
    let currentIndex = 0;
    
    // Show first testimonial
    if (testimonialItems.length > 0) {
        testimonialItems[0].style.display = 'block';
    }
    
    // Previous button click
    prevButton.addEventListener('click', function() {
        testimonialItems[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        testimonialItems[currentIndex].style.display = 'block';
    });
    
    // Next button click
    nextButton.addEventListener('click', function() {
        testimonialItems[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        testimonialItems[currentIndex].style.display = 'block';
    });
    
    // Auto-rotate testimonials
    setInterval(function() {
        testimonialItems[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        testimonialItems[currentIndex].style.display = 'block';
    }, 5000);
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            alert(`Thank you for your message, ${name}! We will get back to you soon.`);
            contactForm.reset();
        });
    }
}