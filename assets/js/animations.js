// ===== ANIMATIONS JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initTechBackground();
    initScrollAnimations();
});

// Animated Tech Background
function initTechBackground() {
    const techBackground = document.getElementById('techBackground');
    if (!techBackground) return;
    
    // Create floating elements for the tech background
    const elements = [
        { type: 'code', content: '<div>' },
        { type: 'code', content: '</div>' },
        { type: 'code', content: 'function()' },
        { type: 'code', content: 'const data =' },
        { type: 'code', content: 'return' },
        { type: 'code', content: 'async' },
        { type: 'code', content: 'import' },
        { type: 'code', content: 'export' },
        { type: 'code', content: 'class' },
        { type: 'icon', content: 'fa-code' },
        { type: 'icon', content: 'fa-brain' },
        { type: 'icon', content: 'fa-microchip' },
        { type: 'icon', content: 'fa-cloud' },
        { type: 'icon', content: 'fa-shield-alt' },
        { type: 'icon', content: 'fa-link' }
    ];
    
    // Create and append floating elements
    elements.forEach(element => {
        const floatingEl = document.createElement('div');
        floatingEl.className = 'floating-element';
        
        if (element.type === 'code') {
            floatingEl.textContent = element.content;
            floatingEl.classList.add('code-element');
        } else if (element.type === 'icon') {
            const icon = document.createElement('i');
            icon.className = `fas ${element.content}`;
            floatingEl.appendChild(icon);
            floatingEl.classList.add('icon-element');
        }
        
        // Random position, size, and animation duration
        const size = Math.floor(Math.random() * 30) + 20; // 20-50px
        const posX = Math.floor(Math.random() * 100); // 0-100%
        const posY = Math.floor(Math.random() * 100); // 0-100%
        const duration = Math.floor(Math.random() * 20) + 10; // 10-30s
        const delay = Math.floor(Math.random() * 5); // 0-5s
        
        floatingEl.style.width = `${size}px`;
        floatingEl.style.height = `${size}px`;
        floatingEl.style.left = `${posX}%`;
        floatingEl.style.top = `${posY}%`;
        floatingEl.style.animationDuration = `${duration}s`;
        floatingEl.style.animationDelay = `${delay}s`;
        
        techBackground.appendChild(floatingEl);
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .blog-card, .about-image, .testimonial-item, .trust-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .portfolio-item, .blog-card, .about-image, .testimonial-item, .trust-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .portfolio-item.animate, .blog-card.animate, .about-image.animate, .testimonial-item.animate, .trust-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .floating-element {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            animation: float 20s linear infinite;
        }
        
        .code-element {
            font-family: monospace;
            background-color: rgba(78, 84, 200, 0.1);
            padding: 5px;
            border-radius: 4px;
        }
        
        .icon-element {
            color: var(--accent-color);
        }
        
        @keyframes float {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(10px, 10px) rotate(5deg);
            }
            50% {
                transform: translate(0, 20px) rotate(0deg);
            }
            75% {
                transform: translate(-10px, 10px) rotate(-5deg);
            }
            100% {
                transform: translate(0, 0) rotate(0deg);
            }
        }
    `;
    
    document.head.appendChild(style);
}