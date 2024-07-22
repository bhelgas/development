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
        const article_snapshot = await getDoc(user_ref);
        if(article_snapshot.data().role == "Administrasjon" || article_snapshot.data().role == "Selger" || article_snapshot.data().role == "Montør" ) {
            
        } else {
            alert("Du har ikke tilgang til å administrere brukere.");
            window.location.href = "../artikler";
            console.log(`Rolle: ${article_snapshot.data().role}`)
        }
    } else {
        alert("Du har ikke tilgang til å se denne siden");
        window.location.href = "../artikler";
    }
})

const article_title = document.querySelector("#article_title");
const article_description = document.querySelector("#article_description");
const article_ident = document.querySelector("#article_id");
var selected_article = "None";


document.addEventListener("click", (e) => {
    if (e.target.closest("#update_article")) {
        const article_ref = doc(db, "Articles", article_ident.value);
        updateDoc(article_ref, {
            article_name: article_title.value,
            article_description: article_description.value,
        })
        .then(() => {
            alert("Artikkel oppdatert");
            location.reload()
        })
        .catch((error) => {
            alert("Kunne ikke oppdatere artikkelen. Sjekk konsoll.");
            console.error(error);
        })
    } else if (e.target.closest("#delete_article")) {
        const article_ref = doc(db, "Articles", article_ident.value)
        deleteDoc(article_ref)
        .then(() => {
            alert("Artikkel slettet.");
            location.reload()
        })
        .catch((error) =>{
            alert("Kunne ikke slette artikkel. Sjekk logg")
            console.error(error);
        })
    }
})

var display_articles = document.querySelector("#display_articles");
const user_ref = collection(db, "Articles");
const get_users = await getDocs(user_ref);
get_users.forEach(async (doc) => {
    const item = document.createElement("div");
    item.classList.add("article_list_item");
    item.innerHTML = `
        <img class="img-small" src="${doc.data().image_url}" alt="${doc.data().image_alt}">
        <div>
        <b>${doc.data().article_name}</b><br>
        ${doc.data().article_description}
        </div>
    `;
    item.addEventListener("click", () => select_article(doc.id));

    display_articles.appendChild(item);
})

async function select_article(article_id) {
    const article_ref = doc(db, "Articles", article_id)
    const article_snapshot = await getDoc(article_ref);

    article_title.value = article_snapshot.data().article_name;
    article_description.value = article_snapshot.data().article_description;
    selected_article = article_snapshot.id;
    article_ident.value = article_snapshot.id;
}
