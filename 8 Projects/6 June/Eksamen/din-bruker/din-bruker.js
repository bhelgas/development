import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import { getStorage, uploadBytes, getDownloadURL, ref } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

import { getFirestore, addDoc, collection, doc, setDoc, getDoc, updateDoc, getDocs, deleteDoc } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, deleteUser } 
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

onAuthStateChanged(auth, async (user) => {
    if(user) {
        displayContent();
    } else {
        alert("Du må være logget inn for å se din profil");
        window.location.href = "../artikler";
    }
})


const first_name = document.querySelector("#first_name");
const last_name = document.querySelector("#last_name");
const email = document.querySelector("#email");
const role = document.querySelector("#role");

const update_user = document.querySelector("#update_user");
const delete_user = document.querySelector("#delete_user");
const display_user_data = document.querySelector("#display_user_data");


async function displayContent() {
    const user_ref = doc(db, "Users", auth.currentUser.email);
    const user_snapshot = await getDoc(user_ref);
    display_user_data.innerHTML = 
    `
        <b>Brukernavn: </b> ${user_snapshot.data().username} <br>
        <b>Fornavn: </b> ${user_snapshot.data().first_name}<br>
        <b>Etternavn: </b> ${user_snapshot.data().last_name}  <br>
        <b>E-post: </b> ${user_snapshot.data().email} <br>
        <b>Rolle: </b> ${user_snapshot.data().role} <br>

    `
    first_name.value = user_snapshot.data().first_name;
    last_name.value = user_snapshot.data().last_name;
    email.value = "Kan ikke endres: " + user_snapshot.data().email;
}

delete_user.addEventListener("click", () => {
    deleteUser(auth)
    .then(() => {
        const doc_ref = doc(db, "Users", auth.currentUser.email);
        deleteDoc(doc_ref);
    })
    .catch((error) =>{
        alert("Kunne ikke slette bruker, sjekk konsoll.")
        console.error(error)
    })
})


update_user.addEventListener("click", () => {
    const doc_ref = doc(db, "Users", auth.currentUser.email)
    updateDoc(doc_ref, {
        first_name: first_name.value,
        last_name: last_name.value
    })
    .then(() => {
        alert("Dine data har blitt oppdatert!");
        location.reload();
    })
    .catch((error) => {
        alert("Kunne ikke oppdatere data, sjekk konsoll");
        console.error(error);
    })
})