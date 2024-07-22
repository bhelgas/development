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

var createuser_first_name = document.querySelector("#first_name");
var createuser_last_name = document.querySelector("#last_name");
var createuser_email = document.querySelector("#email");
var createuser_password = document.querySelector("#password");
var createuser_confirm_password = document.querySelector("#confirm_password");
var createuser_button = document.querySelector("#create_user");


onAuthStateChanged(auth, (user) => {
    if(user) {
        alert("Bekrefter data... ikke forlat siden.")
        validate_data();
    }
})
createuser_button.addEventListener("click", (e) => {
    e.preventDefault();
    if(createuser_password.value != createuser_confirm_password.value) {
        alert("Password does not match");
    } else {
        createUserWithEmailAndPassword(auth, createuser_email.value, createuser_password.value)
        .then( async () => {
            await setDoc(doc(db, "Users/", email.value.toLowerCase()), {
                first_name: createuser_first_name.value,
                last_name: createuser_last_name.value,
                username: createuser_first_name.value.substring(0,3).toLowerCase() + createuser_last_name.value.substring(0,3).toLowerCase(),
                email: createuser_email.value.toLowerCase(),
                role: "Kunde"
            })
        })
        .catch(error => {
            console.error("Error creating user: " + error);
        })
    }
})

async function validate_data() {
    const user_ref = doc(db, "Users/", auth.currentUser.email);
        const validate_user = await getDoc(user_ref);
        if(validate_user.exists()) {
            alert("Fullført! Vidersender...");
            window.location.href = "../artikler";
        } else {
            alert("Det har oppstått en feil... Prøver på nytt, vennligst vent 10 sekund.")
            setTimeout(() => {
                validate_data();
            }, 10000);
            
           
        }
}