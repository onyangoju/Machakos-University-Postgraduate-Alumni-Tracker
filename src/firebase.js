import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_APP",
  projectId: "YOUR_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS0TggnvaTY2zl8haWsr6CE6DBJdoZObQ",
  authDomain: "mksu-graduate-tracker.firebaseapp.com",
  projectId: "mksu-graduate-tracker",
  storageBucket: "mksu-graduate-tracker.firebasestorage.app",
  messagingSenderId: "606447997333",
  appId: "1:606447997333:web:6bcf33a7a3b3bd37d3669c",
  measurementId: "G-DK9GXYXE3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);