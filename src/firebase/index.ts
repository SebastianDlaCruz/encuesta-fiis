// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE0aZEOu1IB5bfB3zfAoavm44WT5HzjSw",
  authDomain: "encuesta-fiis.firebaseapp.com",
  projectId: "encuesta-fiis",
  storageBucket: "encuesta-fiis.appspot.com",
  messagingSenderId: "763557509074",
  appId: "1:763557509074:web:d5feaf7fc7b75ebcc57a0b"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseGetAuth = getAuth(FireBaseApp);
export const FireBaseGetStore = getFirestore(FireBaseApp);