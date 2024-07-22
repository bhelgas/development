import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import { getFirestore, addDoc, collection, doc, setDoc, getDoc, updateDoc, getDocs, deleteDoc } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCm-is9hZ3lAp_kneOAF_uMT62_-wRaSdw",
    authDomain: "eksamen-igjen.firebaseapp.com",
    projectId: "eksamen-igjen",
    storageBucket: "eksamen-igjen.appspot.com",
    messagingSenderId: "98075062007",
    appId: "1:98075062007:web:ce5dbbc258c0935cbaedf2"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

var login_email = document.querySelector("#email");
var login_password = document.querySelector("#password");
var login_button = document.querySelector("#log-in");
onAuthStateChanged(auth, (user) => {
    if(user) {
        alert("Du er allerede logget inn, du vil bli videresendt til hjemmesiden");
        window.location.href = "../artikler";
    }
})


login_button.addEventListener("click", (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
    .then(() => {
        console.log("Du har blitt logged inn");
    })
    .catch(error => {
        alert("Kunne ikke logge deg inn, sjekk logg");
        console.error(error);
    })
})