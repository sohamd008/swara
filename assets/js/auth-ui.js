
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase-config.js";

/**
 * Initializes the common authentication UI elements (Header buttons, Dropdown).
 * @param {Function} [onUserCallback] - Optional callback function triggered when auth state changes (provides user object or null).
 */
export function initAuthUI(onUserCallback) {
    const loginLink = document.getElementById('login-link');
    const profileBtn = document.getElementById('profile-btn');
    const profileDrop = document.getElementById('profile-dropdown');
    const userEmailDrop = document.getElementById('user-email-drop');
    const logoutBtnDrop = document.getElementById('logout-btn-drop');

    // Auth State Listener
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            if (loginLink) loginLink.style.display = 'none';
            if (profileBtn) profileBtn.style.display = 'flex';
            if (userEmailDrop) userEmailDrop.textContent = user.email;
        } else {
            // User is signed out
            if (loginLink) loginLink.style.display = 'block'; // Or whatever default is, usually block or flex
            // Note: loginLink in index.html had class 'nav-btn' which might need display:block or inline-block. 
            // In the original code it was toggled.
            // Let's check style.css for .nav-btn. It has padding etc.
            // The original logic was simply style.display = 'none' or 'block' (or remove inline style).
            // Default visibility is visible.

            if (profileBtn) profileBtn.style.display = 'none';
            if (profileDrop) profileDrop.classList.remove('active');
        }

        if (onUserCallback) {
            onUserCallback(user);
        }
    });

    // Dropdown Toggle Logic
    if (profileBtn) {
        // Clone element to remove old event listeners if any (optional, but safe)
        // Actually, since we are module based, we run once.
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileDrop) profileDrop.classList.toggle('active');
        });
    }

    // Logout Logic
    if (logoutBtnDrop) {
        logoutBtnDrop.addEventListener('click', async () => {
            try {
                await signOut(auth);
                // Redirect to home if needed, or just reload.
                // If on profile page, profile.js handles redirect.
                // If on generic page, maybe just stay or go home.
                // Original code redirected to index.html
                window.location.href = 'index.html';
            } catch (e) {
                console.error("Sign out error", e);
            }
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (profileBtn && profileDrop) {
            if (!profileBtn.contains(e.target) && !profileDrop.contains(e.target)) {
                profileDrop.classList.remove('active');
            }
        }
    });
}
