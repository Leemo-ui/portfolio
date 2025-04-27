document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handler
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    this.reset();
});

// Theme toggling functionality
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Cursor tracking
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let speed = 0.1;

// Update cursor position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    cursorTrail.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add cursor interactions for clickable elements
const clickables = document.querySelectorAll('a, button, input, .project-card');
clickables.forEach(elem => {
    elem.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    elem.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// Parallax effect
const parallaxImages = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
    parallaxImages.forEach(image => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.15;
        const rect = image.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            image.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Shrinking header
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('shrink');
    } else {
        nav.classList.remove('shrink');
    }
    
    lastScroll = currentScroll;
});

// Active section tracking
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing Animation
const texts = [
    "Web Developer",
    "UI/UX Designer",
    "Frontend Enthusiast"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

function typeText() {
    const currentText = texts[textIndex];
    const typedText = document.querySelector('.typed-text');
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    
    typedText.textContent = currentText.substring(0, charIndex);
    
    let delta = isDeleting ? erasingDelay : typingDelay;
    
    if (!isDeleting && charIndex === currentText.length) {
        delta = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(typeText, delta);
}

window.onload = () => {
    if (document.querySelector('.typed-text')) {
        setTimeout(typeText, newTextDelay);
    }
};

// Enhanced scroll animations with repeat
const scrollAnimationObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Remove class when out of view
            }
        });
    }, 
    {
        threshold: 0.1,
        rootMargin: '50px'
    }
);

// Apply animations to elements with repeated trigger
document.querySelectorAll('.hero-content, .about-text, .contact-form, .project-card, .stat-item, .social-link, .tech-badge, .skill').forEach(el => {
    el.classList.add('scroll-animate');
    scrollAnimationObserver.observe(el);
});

// Optimized tech stack tab switching
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        requestAnimationFrame(() => {
            // Remove active class from all items and contents
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.tech-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding content
            const contentId = item.getAttribute('data-content');
            document.getElementById(contentId).classList.add('active');
        });
    });
});
