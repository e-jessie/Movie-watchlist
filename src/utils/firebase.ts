import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAM9b5rVsNPjMmXnbPhXFG2g6w8838Cy8o",
    authDomain: "movie-watchlist-64ca9.firebaseapp.com",
    projectId: "movie-watchlist-64ca9",
    storageBucket: "movie-watchlist-64ca9.firebasestorage.app",
    messagingSenderId: "690623118519",
    appId: "1:690623118519:web:0e307fbde1e0572d17e132"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
