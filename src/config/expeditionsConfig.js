import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const expeditionsConfig = {
    apiKey: "AIzaSyAmPjpl3Ci2uHs8PtvyI2z4Xc40WJUAF-g",
    authDomain: "expeditions-d5d11.firebaseapp.com",
    projectId: "expeditions-d5d11",
    storageBucket: "expeditions-d5d11.firebasestorage.app",
    messagingSenderId: "439496230989",
    appId: "1:439496230989:web:5e78e3ef66e7d208ed3404"
}

export const expeditionsDB = getFirestore(initializeApp(expeditionsConfig));

