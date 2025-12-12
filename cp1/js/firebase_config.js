// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAzTTx5twTSdDgJkTw1GTx1NqvggwgzWU",
  authDomain: "jsi40-dfb37.firebaseapp.com",
  projectId: "jsi40-dfb37",
  storageBucket: "jsi40-dfb37.firebasestorage.app",
  messagingSenderId: "908529177111",
  appId: "1:908529177111:web:a38a8e495293be094b4252",
  measurementId: "G-LW5X5D5N91"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

