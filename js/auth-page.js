
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase-config.js";

// State
let isLoginMode = true;

export function initAuthPage() {
    // Expose functions for inline onclick handlers or attach listeners
    // Since we are refactoring, we should try to attach listeners but the HTML uses onclick="showEmailForm()" etc.
    // To minimize friction I will attach them to window or re-bind them.
    // Ideally, I should rewrite HTML to not use inline handlers, but for now let's bind them.

    window.showEmailForm = showEmailForm;
    window.hideEmailForm = hideEmailForm;
    window.toggleAuthMode = toggleAuthMode;
    window.handleAuth = handleAuth;
    window.auth = auth; // For legacy reason if needed

    // Check Auth State
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // If on login page and already logged in:
            const helloText = document.querySelector('.hello-text');
            const subText = document.querySelector('.sub-text');
            const emailForm = document.getElementById('email-form');
            const socialBtns = document.getElementById('social-buttons');

            if (helloText) {
                helloText.textContent = "Welcome Back";
                subText.textContent = "You are already logged in.";
                if (emailForm) emailForm.style.display = 'none';
                if (socialBtns) socialBtns.style.display = 'none';
                // Create a logout button in the main area
                const mainContainer = document.querySelector('.glass-container');
                if (!document.getElementById('main-logout-btn')) {
                    const btn = document.createElement('button');
                    btn.id = 'main-logout-btn';
                    btn.className = 'btn btn-solid';
                    btn.textContent = 'Go to Profile';
                    btn.style.marginTop = '20px';
                    btn.onclick = () => window.location.href = 'profile.html';
                    mainContainer.appendChild(btn);
                }
            }

        }
    });
}

function showEmailForm() {
    document.getElementById('social-buttons').style.display = 'none';
    const emailForm = document.getElementById('email-form');
    emailForm.style.display = 'flex';
    // Trigger reflow/animation if needed, but CSS handles it
}

function hideEmailForm() {
    document.getElementById('email-form').style.display = 'none';
    document.getElementById('social-buttons').style.display = 'flex';
    document.getElementById('auth-error').style.display = 'none';
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    const submitBtn = document.getElementById('submit-btn');
    const toggleText = document.getElementById('toggle-text');
    const toggleLink = document.getElementById('toggle-link');
    const title = document.querySelector('.hello-text');
    const subText = document.querySelector('.sub-text');

    if (isLoginMode) {
        submitBtn.innerText = "Log In";
        toggleText.innerText = "Don't have an account?";
        toggleLink.innerText = "Sign Up";
        title.innerText = "Welcome";
        subText.innerText = "Enter the Treasury of Notes";
    } else {
        submitBtn.innerText = "Create Account";
        toggleText.innerText = "Already have an account?";
        toggleLink.innerText = "Log In";
        title.innerText = "Join Us";
        subText.innerText = "Create your musical journey";
    }
    document.getElementById('auth-error').style.display = 'none';
    if (window.grecaptcha) grecaptcha.reset();
}

async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('auth-error');
    const submitBtn = document.getElementById('submit-btn');

    errorMsg.style.display = 'none';

    // 1. Basic Validation
    if (!email || !password) {
        errorMsg.innerText = "Please fill in all fields.";
        errorMsg.style.display = 'block';
        return;
    }

    // 2. RECAPTCHA CHECK
    if (window.grecaptcha) {
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            errorMsg.innerText = "Please verify you are not a robot.";
            errorMsg.style.display = 'block';
            return;
        }
    }

    // 3. Strict Password Validation (On Sign Up)
    if (!isLoginMode) {
        if (password.length < 8) {
            errorMsg.innerText = "Password must be at least 8 characters long.";
            errorMsg.style.display = 'block';
            return;
        }
        if (!/\d/.test(password)) {
            errorMsg.innerText = "Password must contain at least one number.";
            errorMsg.style.display = 'block';
            return;
        }
    }

    // Loading state
    submitBtn.style.opacity = '0.7';
    submitBtn.innerText = "Processing...";

    try {
        if (isLoginMode) {
            // Login
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'index.html';
        } else {
            // Sign Up
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            alert("Account Created! Welcome " + userCredential.user.email);
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error("Firebase Error:", error.code, error.message);
        let message = "An error occurred.";

        switch (error.code) {
            case 'auth/invalid-credential': message = "Incorrect password or user not found."; break;
            case 'auth/user-not-found': message = "No account found with this email."; break;
            case 'auth/wrong-password': message = "Incorrect password."; break;
            case 'auth/email-already-in-use': message = "Email already registered. Please Log In."; break;
            case 'auth/weak-password': message = "Password too weak."; break;
            case 'auth/invalid-email': message = "Invalid email address."; break;
            default: message = "Login failed. Check connection.";
        }

        errorMsg.innerText = message;
        errorMsg.style.display = 'block';
        if (window.grecaptcha) grecaptcha.reset();
    } finally {
        submitBtn.style.opacity = '1';
        submitBtn.innerText = isLoginMode ? "Log In" : "Create Account";
    }
}
