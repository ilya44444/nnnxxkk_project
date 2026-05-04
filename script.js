// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scroll
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

// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    let lastTime = 0;
    return function executedFunction(...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            func.apply(this, args);
            lastTime = now;
        }
    };
}

// Navbar Background on Scroll
const handleNavbarScroll = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
}, 100);

window.addEventListener('scroll', handleNavbarScroll);

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll(
    '.about-card, .philosophy-item, .resource-card, .timeline-item'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Add parallax effect to hero section
const handleParallaxScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const circles = document.querySelectorAll('.circle');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.3;
        circle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
}, 100);

window.addEventListener('scroll', handleParallaxScroll);

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = throttle(() => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
                navLink.style.color = '#6366f1';
            }
        } else if (navLink) {
            navLink.style.color = '';
        }
    });
}, 100);

window.addEventListener('scroll', highlightNavLink);

// Dynamic quote rotation (optional feature)
const quotes = [
    {
        text: "Быть собой в мире, который постоянно пытается сделать из тебя кого-то другого — величайшее достижение.",
        author: "Ральф Уолдо Эмерсон"
    },
    {
        text: "Не следуй за толпой. Позволь толпе следовать за тобой.",
        author: "Маргарет Тэтчер"
    },
    {
        text: "Индивидуальность — это быть верным самому себе, даже когда все вокруг тебя давят.",
        author: "Оскар Уайльд"
    },
    {
        text: "Самое большое приключение, которое ты можешь совершить — это прожить жизнь своей мечты.",
        author: "Опра Уинфри"
    }
];

let currentQuoteIndex = 0;

function rotateQuote() {
    const quoteElement = document.querySelector('.quote p');
    const citeElement = document.querySelector('.quote cite');
    
    if (quoteElement && citeElement) {
        quoteElement.style.opacity = '0';
        citeElement.style.opacity = '0';
        
        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteElement.textContent = `"${quotes[currentQuoteIndex].text}"`;
            citeElement.textContent = `— ${quotes[currentQuoteIndex].author}`;
            
            quoteElement.style.opacity = '1';
            citeElement.style.opacity = '1';
        }, 500);
    }
}

// Rotate quotes every 10 seconds
setInterval(rotateQuote, 10000);

// Add transition styles to quote elements
const quoteText = document.querySelector('.quote p');
const quoteCite = document.querySelector('.quote cite');
if (quoteText) quoteText.style.transition = 'opacity 0.5s ease';
if (quoteCite) quoteCite.style.transition = 'opacity 0.5s ease';

// Console message for visitors
console.log('%c🌟 Добро пожаловать на путь к себе!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cЭтот сайт создан, чтобы вдохновить на индивидуализм.', 'color: #8b5cf6; font-size: 14px;');
console.log('%cБудь собой. Это твоя суперсила.', 'color: #ec4899; font-size: 14px; font-style: italic;');

// Quiz functionality
const quizResultBtn = document.getElementById('quiz-result-btn');
const quizResetBtn = document.getElementById('quiz-reset-btn');
const quizResult = document.getElementById('quiz-result');
const quizResultText = document.getElementById('quiz-result-text');
const quizCheckboxes = document.querySelectorAll('#influence-quiz input[type="checkbox"]');

function calculateInfluence() {
    const checkedCount = Array.from(quizCheckboxes).filter(cb => cb.checked).length;
    const percentage = checkedCount * 25;

    let resultText = '';
    if (percentage <= 25) {
        resultText = 'Вы почти не поддаетесь влиянию алгоритмов. Продолжайте развивать осознанный подход!';
    } else if (percentage >= 50 && percentage <= 75) {
        resultText = 'Социальные сети частично определяют ваш стиль. Попробуйте больше полагаться на собственные предпочтения.';
    } else if (percentage === 100) {
        resultText = 'Ваш гардероб полностью продиктован трендами из соцсетей. Время задуматься об индивидуальном стиле!';
    }

    return resultText;
}

if (quizResultBtn && quizResult && quizResultText) {
    quizResultBtn.addEventListener('click', () => {
        const result = calculateInfluence();
        quizResultText.textContent = result;
        quizResult.classList.remove('hidden');
        quizResult.style.opacity = '0';
        setTimeout(() => {
            quizResult.style.transition = 'opacity 0.5s ease';
            quizResult.style.opacity = '1';
        }, 100);
    });
}

if (quizResetBtn) {
    quizResetBtn.addEventListener('click', () => {
        quizCheckboxes.forEach(cb => cb.checked = false);
        quizResult.classList.add('hidden');
        quizResult.style.opacity = '0';
    });
}
