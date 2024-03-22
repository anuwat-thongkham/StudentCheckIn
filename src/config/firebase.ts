// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDr-7SK3FPB-cTapRcWrX3GhvZVqFLKacY",
    authDomain: "studentchecksystem.firebaseapp.com",
    projectId: "studentchecksystem",
    storageBucket: "studentchecksystem.appspot.com",
    messagingSenderId: "333681254194",
    appId: "1:333681254194:web:4a0c48d1910caf136d812b",
    measurementId: "G-9RLGKKNPXS"
};

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 