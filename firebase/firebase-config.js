// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm1TgyFkXUC2ab1BTvJ1EdJ_SotMOf5RY",
  authDomain: "crypto-dashboard-6563e.firebaseapp.com",
  projectId: "crypto-dashboard-6563e",
  storageBucket: "crypto-dashboard-6563e.appspot.com",
  messagingSenderId: "965105195620",
  appId: "1:965105195620:web:77b6f96be17242331add71",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
