// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADDpjIOXOyboAkyklLXcYmtjPowRCEvko",
  authDomain: "reacttutorial1-c8922.firebaseapp.com",
  projectId: "reacttutorial1-c8922",
  storageBucket: "reacttutorial1-c8922.appspot.com",
  messagingSenderId: "944905810142",
  appId: "1:944905810142:web:2c21fb180fbf7e587a124f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
