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
        const user_ref = doc(db, "Users", user.email);
        const user_snapshot = await getDoc(user_ref);
        if(user_snapshot.data().role == "Administrasjon") {
           
        } else {
            alert("Du har ikke tilgang til å administrere brukere.");
            window.location.href = "../artikler";
            console.log(`Rolle: ${user_snapshot.data().role}`)
        }
    } else {
        alert("Du har ikke tilgang til å se denne siden");
        window.location.href = "../artikler";
    }
})


const first_name = document.querySelector("#first_name");
const last_name = document.querySelector("#last_name");
const email = document.querySelector("#email");
const role = document.querySelector("#role");
const selected_role = document.querySelector("#selected_role");

const sort_all = document.querySelector("#sort_all"); sort_all.addEventListener("click", () => DisplayUsers('Alle'));

const sort_kunder = document.querySelector("#sort_kunder"); sort_kunder.addEventListener("click", () => DisplayUsers('Kunde'));

const sort_selger = document.querySelector("#sort_selger"); sort_selger.addEventListener("click", () => DisplayUsers('Selger'));

const sort_montør = document.querySelector("#sort_montør"); sort_montør.addEventListener("click", () => DisplayUsers('Montør'));

const sort_administrasjon = document.querySelector("#sort_administrasjon");sort_administrasjon.addEventListener("click", () => DisplayUsers('Administrasjon'));

document.addEventListener("click", (e) => {
    if (e.target.closest("#update_user")) {
        const user_ref = doc(db, "Users", email.value);
        updateDoc(user_ref, {
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            role: role.value,
        })
        .then(() => {
            alert("Brukerinformasjon for " + first_name.value + " har blitt oppdatert.");
        })
        .catch((error) => {
            alert("Kunne ikke oppdatere brukeren. Sjekk konsoll.");
            console.error(error);
        })
    } else if (e.target.closest("#delete_user")) {
        const user_ref = doc(db, "Users", email.value)
        deleteDoc(user_ref)
        .then(() => {
            alert("Firebase Authentication apparently doesn't support deletion of other accounts, but the data to the account which was stored in firestore has been deleted. \n Anyways since their data cannot be validated on log in they cannot use the website");
        })
        .catch((error) =>{
            alert("Kunne ikke slette data. Sjekk logg")
            console.error(error);
        })
    }
})

async function DisplayUsers(sort) {
    var display_users = document.querySelector("#display_users");
    const user_ref = collection(db, "Users");
    const get_users = await getDocs(user_ref);
    selected_role.textContent = sort;
    display_users.innerHTML = "";
    get_users.forEach(async (doc) => {
        if(doc.data().role == sort) {
            const item = document.createElement("div");
            item.classList.add("user_list_item");
            item.innerHTML = `
                ${doc.data().first_name} ${doc.data().last_name}<br>
                ${doc.data().email}
            `;
            var user_email = await doc.data().email;
            item.addEventListener("click", () => select_user(user_email));
        
            display_users.appendChild(item);
        } else if(sort == "Alle") {
            const item = document.createElement("div");
            item.classList.add("user_list_item");
            item.innerHTML = `
                ${doc.data().first_name} ${doc.data().last_name}<br>
                ${doc.data().email}
            `;
            var user_email = await doc.data().email;
            item.addEventListener("click", () => select_user(user_email));
        
            display_users.appendChild(item);
        } else {

        }
    })
}

async function select_user(user_email) {
    const user_ref = doc(db, "Users", user_email)
    const user_snapshot = await getDoc(user_ref);

    var user_manager = document.querySelector("#user_manager");
    const currently_editing = document.querySelector("#currently_editing");

    currently_editing.textContent = `${user_snapshot.data().first_name} ${user_snapshot.data().last_name} (${user_snapshot.data().role})`

    first_name.value = user_snapshot.data().first_name;
    last_name.value = user_snapshot.data().last_name;
    email.value = user_snapshot.data().email;
    role.value =user_snapshot.data().role;
}


