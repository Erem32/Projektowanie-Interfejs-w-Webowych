// app/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";

// —– Your Firebase config —–
// (Paste in your own values here)
const firebaseConfig = {
    apiKey: "AIzaSyA2bCY5HX-Guc5Mtshg-FJEskbKpG-UGmM",
    authDomain: "lab3-478fe.firebaseapp.com",
    projectId: "lab3-478fe",
    storageBucket: "lab3-478fe.appspot.com",
    messagingSenderId: "528859531883",
    appId: "1:528859531883:web:ac9cc9243ac919c5f83f2e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);               // ← only one declaration
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth };
export function loginWithGoogle() {
    return signInWithPopup(auth, provider);
}
export function logout() {
    return signOut(auth);
}
