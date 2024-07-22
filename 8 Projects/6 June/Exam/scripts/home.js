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



document.addEventListener("DOMContentLoaded", () => {
    var find_user_button = document.querySelector("#find_user_button");
    var find_user_by_email = document.querySelector("#find_user_by_email");

    find_user_button.addEventListener("click", (e) => {
        e.preventDefault();
        const doc_ref = doc(db, "Users/", find_user_by_email.value);
        const doc_snap = getDoc(doc_ref);
        if(doc_snap.exists()) {
            console.log("Loading data.");
        } else {
            console.log("Could not find user data.");
        }
    })
})
