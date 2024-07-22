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

var sign_out = document.querySelector("#sign_out");

onAuthStateChanged(auth, async (user) => {
    if(!user) {
        alert("Du må være logget inn for å få tilgang til Oslofjord skoleressurser. Du vil bli videresendt til innlogging");
        window.location.href = "../bruker/index.html";

    } else {
        var user_data_ref = doc(db, "Users/", user.email);
        var get_user_data = await getDoc(user_data_ref);
        var display_username = document.querySelector("#display_username");
        display_username.innerHTML = `${get_user_data.data().username} (${get_user_data.data().role})`;
    }
})


sign_out.addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("You have been signed out. You will now be redirected to the login page");
    })
    .catch((error) => {
        throw new Error(error);
    })
})


