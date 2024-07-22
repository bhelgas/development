import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import { getFirestore, addDoc, collection, doc, setDoc, getDoc, updateDoc, getDocs, deleteDoc } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


const firebaseConfig = {
       /*We don't do this shit around here*/
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


var create_user = document.querySelector("#create_user");
var login = document.querySelector("#login");

var new_user_first_name = document.querySelector("#new_user_first_name");
var new_user_last_name = document.querySelector("#new_user_last_name");
var new_user_role = document.querySelector("#new_user_role");
var new_user_email = document.querySelector("#new_user_email");
var new_user_password = document.querySelector("#new_user_password");

var login_email = document.querySelector("#login_email");
var login_password = document.querySelector("#login_password");




login.addEventListener("click", () => {
    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
    .then(() => {
        alert("You have been signed in! Redirecting to homepage");
    }) 
    .catch((error) => {
        throw new Error(error);
    })
})


create_user.addEventListener("click", () => {
    createUserWithEmailAndPassword(auth, new_user_email.value, new_user_password.value)
    .then(() => {
        setDoc(doc(db, "Users/", new_user_email.value.toLowerCase()), {
            username: new_user_first_name.value.substring(0,3).toLowerCase() + new_user_last_name.value.substring(0,3).toLowerCase(),
            first_name: new_user_first_name.value,
            last_name: new_user_last_name.value,
            role: new_user_role.value,
            email: new_user_email.value.toLowerCase()
        })
    })
    .catch((error) => {
        throw new Error(error);
    })
})
