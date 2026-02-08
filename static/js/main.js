document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            menuToggle.classList.toggle('open');
        });
    }

    // Higher-Fidelity Text Splitting (Preserves HTML & Gradients)
    const splitElements = document.querySelectorAll('.split-text');
    splitElements.forEach(el => {
        const recursiveSplit = (node) => {
            if (node.nodeType === 3) { // Text node
                const text = node.textContent;
                const fragment = document.createDocumentFragment();
                [...text].forEach((char, i) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.transitionDelay = `${i * 0.02}s`;
                    fragment.appendChild(span);
                });
                node.parentNode.replaceChild(fragment, node);
            } else {
                // NodeList is live, convert to array to prevent infinite loop
                Array.from(node.childNodes).forEach(child => {
                    if (child.nodeType === 1 && child.tagName !== 'BR') {
                        recursiveSplit(child);
                    } else if (child.nodeType === 3) {
                        recursiveSplit(child);
                    }
                });
            }
        };
        recursiveSplit(el);
    });

    // Scroll Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // Enhanced Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .stagger-children, .split-text');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Mouse Tracking Glow for Hero
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) * 100;
            const y = (clientY / window.innerHeight) * 100;
            hero.style.setProperty('--mouse-x', `${x}%`);
            hero.style.setProperty('--mouse-y', `${y}%`);
        });
    }

    // Improved Magnetic Interaction
    const magneticItems = document.querySelectorAll('.btn, .logo-img, .social-links a');
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            item.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });

    // AI Insight Demo
    window.getAIInsight = async (text) => {
        try {
            const response = await fetch('/api/ai/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            return await response.json();
        } catch (error) {
            console.error('AI Insight Error:', error);
        }
    };

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`Thank you! ${email} has been subscribed to our newsletter.`);
            newsletterForm.reset();
        });
    }
});
