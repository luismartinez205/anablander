import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB9XdC8mczg55WlJm_pbqBLrf-pU8rrseo",
  authDomain: "anablander-e8418.firebaseapp.com",
  projectId: "anablander-e8418",
  storageBucket: "anablander-e8418.firebasestorage.app",
  messagingSenderId: "481331436280",
  appId: "1:481331436280:web:3a2e18fb7dd1c0e904390d"
};

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const db = getFirestore(app);