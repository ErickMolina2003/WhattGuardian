import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYMU7Yl-yS6Mdy7g1LAcqvGAiFSqhQS40",
    authDomain: "vought-international.firebaseapp.com",
    databaseURL: "https://vought-international-default-rtdb.firebaseio.com",
    projectId: "vought-international",
    storageBucket: "vought-international.appspot.com",
    messagingSenderId: "452870994102",
    appId: "1:452870994102:web:875faf38b76bfc53164e17"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);