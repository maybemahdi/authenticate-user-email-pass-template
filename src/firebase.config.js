// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATvbPRrQZ-3s58dqzNQcovRNsxKt74SH0",
  authDomain: "user-email-password-auth-31fa2.firebaseapp.com",
  projectId: "user-email-password-auth-31fa2",
  storageBucket: "user-email-password-auth-31fa2.appspot.com",
  messagingSenderId: "56079951260",
  appId: "1:56079951260:web:42131353ec10c67fa01459"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);