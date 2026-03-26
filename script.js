// Typing Animation
const typingTexts = ['Frontend Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.querySelector('.typing-text');
    
    if (!typingElement) return;
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeText, 500);
    } else {
        setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
    }
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', typeText);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    // Scroll progress indicator
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
    
    // Active navigation link
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Reveal on Scroll Animation
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Skill Bar Animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const skillValue = bar.getAttribute('data-skill');
        const barTop = bar.getBoundingClientRect().top;
        
        if (barTop < window.innerHeight - 50 && !bar.classList.contains('animate')) {
            bar.style.setProperty('--skill-width', `${skillValue}%`);
            bar.classList.add('animate');
            bar.style.width = `${skillValue}%`;
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
// Trigger once on load
setTimeout(animateSkillBars, 500);

// Project Card Tilt Effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Form Submission (Demo Only)
// const contactForm = document.querySelector('.contact-form');

// contactForm?.addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     // Get form values
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData);
    
//     // Demo alert - in production, you would send this to a backend
    
//     // Reset form
//     e.target.reset();
// });

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const shapes = document.querySelectorAll('.shape');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 2;
        const x = (window.innerWidth - e.clientX * speed) / 100;
        const y = (window.innerHeight - e.clientY * speed) / 100;
        
        shape.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Lazy Loading Effect for Images (Placeholder)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            imageObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project images
document.querySelectorAll('.project-image').forEach(img => {
    imageObserver.observe(img);
});

// Add smooth page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console Easter Egg
console.log('%c Welcome to my portfolio! 🎨', 
    'font-size: 24px; font-weight: bold; color: #6366f1; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%c Looking for a developer? Let\'s connect! 💼', 
    'font-size: 14px; color: #8b5cf6;');

// Performance optimization - Throttle scroll events
let isScrolling = false;
function throttleScroll(callback) {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            callback();
            isScrolling = false;
        });
        isScrolling = true;
    }
}

// Apply throttling to scroll-based animations
window.addEventListener('scroll', () => {
    throttleScroll(() => {
        revealOnScroll();
        animateSkillBars();
    });
});


// api
// const apiKey = "ef13b80e-33d9-4ddd-9082-b1b076543475";
// const apiUrl = "https://api.web3forms.com/submit";
// const button = document.querySelector(".btn");
// const contactForm = document.querySelector(".contact-form");
// async function sendContactForm(formData) {
//     try {
//         // We must use POST and send a JSON body
//         const response = await fetch(apiUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({
//                 access_key: apiKey,
//                 name: contactForm.querySelector('input[placeholder="Your Name"]').value,
//                 email: document.querySelector(".form-input").value,
//                 message: document.querySelector(".form-input").value,
//             })
//         });

//         const data = await response.json();

//          console.log(data);
    
//         if (response.status === 200) {
//             console.log("Success:", data);
//         } else {
//             console.log("Form Error:", data.message);
//         }

//     } catch (error) {
//         console.error("Network Error:", error);
//     }

   
// }
// contactForm?.addEventListener("submit", sendContactForm);


// Optimized API Integration
const apiKey = "ef13b80e-33d9-4ddd-9082-b1b076543475";
const apiUrl = "https://api.web3forms.com/submit";
const contactForm = document.querySelector(".contact-form");

async function sendContactForm(e) {
    e.preventDefault(); // Prevents the page from refreshing
    
    // Get specific values using their placeholders or better yet, add 'name' attributes to your HTML
    const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
    const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
    const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
    const message = contactForm.querySelector('textarea').value;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: apiKey,
                name: name,
                email: email,
                subject: subject,
                message: message,
            })
        });

        const data = await response.json();
    
        if (response.status === 200) {
            alert("Message sent successfully!");
            contactForm.reset();
        } else {
            console.log("Form Error:", data.message);
        }
    } catch (error) {
        console.error("Network Error:", error);
    }
}

// Attach the listener to the FORM, not the button
contactForm.addEventListener("submit", sendContactForm);