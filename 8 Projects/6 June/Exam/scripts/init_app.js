import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import { getFirestore, addDoc, collection, doc, setDoc, getDoc, updateDoc, getDocs, deleteDoc } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


const firebaseConfig = {
  /*Absolutely not.*/
    };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



