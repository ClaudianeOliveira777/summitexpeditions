import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const galleryConfig = {
  apiKey: "AIzaSyD9yAnS5rKRHx3s0fswbF6WtYeXA6PZf5k",
  authDomain: "galeria-likes.firebaseapp.com",
  projectId: "galeria-likes",
  storageBucket: "galeria-likes.firebasestorage.app",
  messagingSenderId: "390622878792",
  appId: "1:390622878792:web:e304214fcce17a37c94c7d"
}

export const galleryDB = getFirestore(initializeApp(galleryConfig, "galleryApp"));