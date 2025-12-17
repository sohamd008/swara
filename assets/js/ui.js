
// assets/js/ui.js

/**
 * Initialize all shared UI components
 */
export function initUI() {
    initTheme();
    initMobileMenu();
    initBlobs();
}

/**
 * Theme Toggle Logic
 */
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const body = document.body;
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'light') {
        body.classList.add('light-mode');
        toggle.checked = false;
    } else {
        toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

/**
 * Mobile Menu Logic
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle-btn');
    const navLinks = document.getElementById('nav-menu');

    if (!mobileToggle || !navLinks) return;

    function toggleMenu() {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        mobileToggle.innerHTML = isOpen
            ? '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>'
            : '<svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>';
    }

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            toggleMenu();
        }
    });
}

/**
 * Background Blobs Animation
 */
function initBlobs() {
    const blobs = document.querySelectorAll('.blob');
    if (blobs.length === 0) return;

    let ticking = false;

    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const x = (window.innerWidth - e.pageX * 2) / 100;
                const y = (window.innerHeight - e.pageY * 2) / 100;

                // Parallax for cards if present
                const allCards = document.querySelectorAll('.feature-card');
                if (allCards.length > 0) {
                    allCards.forEach(c => c.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`);
                }

                blobs.forEach((blob, index) => {
                    const speed = (index + 1) * 0.5;
                    blob.style.transform = `translate(${-x * speed}px, ${-y * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}
