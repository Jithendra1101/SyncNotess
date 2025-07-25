// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getApps } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3dITkk3O7GKZpHVDv8eG472YLhOI6iYQ",
  authDomain: "advanced-notion-5d5ec.firebaseapp.com",
  projectId: "advanced-notion-5d5ec",
  storageBucket: "advanced-notion-5d5ec.firebasestorage.app",
  messagingSenderId: "244309656028",
  appId: "1:244309656028:web:9e7d1917d2309066a68f19",
  measurementId: "G-HG18KSMQ8Z"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}