document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Menu Toggle
    const menuToggle = document.getElementById('menuToggleBtn');
    const fullMenu = document.getElementById('art-menu');
    const menuClose = document.getElementById('menuCloseBtn');
    const menuLinks = document.querySelectorAll('.art-links a');

    if (menuToggle && fullMenu) {
        menuToggle.addEventListener('click', () => {
            fullMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll when menu open
        });
    }

    if (menuClose && fullMenu) {
        menuClose.addEventListener('click', () => {
            fullMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            fullMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 3. Header Scroll State
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 4. Back to Top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Scroll Reveals
    const revealElements = document.querySelectorAll('.fade-up, .reveal-fade, .reveal-text, .srg-row, .bio-card, .sv-card, .nsg-item, .sidemap-info');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0,
            rootMargin: "0px"
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
            // Check if already in view (for elements above the fold)
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('revealed');
            }
        });
    } else {
        // Fallback
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // 6. Horizontal Scroll for Process Section
    const horizontalSection = document.querySelector('.horizontal-scroll-section');
    const horizontalWrapper = document.querySelector('.horizontal-wrapper');

    if (horizontalSection && horizontalWrapper) {
        window.addEventListener('scroll', () => {
            // Disable horizontal scroll effect on small screens
            if (window.innerWidth <= 768) {
                horizontalWrapper.style.transform = '';
                return;
            }
            const sectionTop = horizontalSection.offsetTop;
            const sectionHeight = horizontalSection.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight - windowHeight) {
                const scrolled = scrollY - sectionTop;
                const maxScroll = sectionHeight - windowHeight;
                const percentage = (scrolled / maxScroll) * 75; // Total travel is 300vw, wrapper is 400vw wide
                horizontalWrapper.style.transform = `translateX(-${percentage}%)`;
            }
        });

        // Also reset transform immediately if already on mobile
        if (window.innerWidth <= 768) {
            horizontalWrapper.style.transform = '';
        }
    }


});
