
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDVkYwIg3NdupN_BUNBhNItU2us-0t2SzU",
    authDomain: "swaramanjusha-login.firebaseapp.com",
    projectId: "swaramanjusha-login",
    storageBucket: "swaramanjusha-login.firebasestorage.app",
    messagingSenderId: "134597685600",
    appId: "1:134597685600:web:9e2410aadf376082d2ae05",
    measurementId: "G-ZBBD3YZMS4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
