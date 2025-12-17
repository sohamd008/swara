
import { onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase-config.js";

export function initProfile() {
    // Profile Page Specific Refs
    const profileEmail = document.getElementById('profile-email');
    const profileCreated = document.getElementById('profile-created');
    const profileAvatar = document.getElementById('profile-avatar');
    const mainLogoutBtn = document.getElementById('main-logout-btn');
    const resetPwdBtn = document.getElementById('reset-pwd-btn');

    // Check Auth State
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Populate Profile Page Data
            if (profileEmail) profileEmail.textContent = user.email;
            if (profileCreated) {
                const creationTime = new Date(user.metadata.creationTime);
                profileCreated.textContent = creationTime.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
            }
            if (profileAvatar) {
                // Set avatar to first letter of email
                profileAvatar.textContent = user.email.charAt(0).toUpperCase();
            }

        } else {
            // Not Logged In - Redirect to Login
            // Only redirect if we are actually on the profile page (check for profile-specific element)
            if (document.querySelector('.profile-card')) {
                window.location.href = 'login.html';
            }
        }
    });

    // Logout Logic (Main Button only)
    if (mainLogoutBtn) {
        mainLogoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                window.location.href = 'index.html';
            } catch (e) {
                console.error("Sign out error", e);
            }
        });
    }

    // Password Reset Logic
    if (resetPwdBtn) {
        resetPwdBtn.addEventListener('click', async () => {
            const user = auth.currentUser;
            if (user && user.email) {
                if (confirm("Send password reset email to " + user.email + "?")) {
                    try {
                        await sendPasswordResetEmail(auth, user.email);
                        alert("Password reset email sent!");
                    } catch (error) {
                        alert("Error: " + error.message);
                    }
                }
            }
        });
    }
}
