// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9vBgk6HhmPzV0-t97FqAZlhQfL4Kq5yU",
  authDomain: "studyflow-9303a.firebaseapp.com",
  projectId: "studyflow-9303a",
  storageBucket: "studyflow-9303a.firebasestorage.app",
  messagingSenderId: "714068266162",
  appId: "1:714068266162:web:102777e5cf0b266a97cdab",
  measurementId: "G-RCQZM1JN6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the services for use in other parts of the app
export { auth, db };
