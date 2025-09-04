// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6HvRBhB8OtARjcIcADHPm4wibUu8hVcM",
  authDomain: "netflixgpt-9af7b.firebaseapp.com",
  projectId: "netflixgpt-9af7b",
  storageBucket: "netflixgpt-9af7b.firebasestorage.app",
  messagingSenderId: "632656578062",
  appId: "1:632656578062:web:cd4b14a663bb4762acde5f",
  measurementId: "G-JT6NBEDT10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);