import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import { getStorage, uploadBytes, getDownloadURL, ref } 
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

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
const storage = getStorage();

onAuthStateChanged(auth, async (user) => {
    if(user) {
        const user_ref = doc(db, "Users", user.email);
        const user_snapshot = await getDoc(user_ref);
        if(user_snapshot.data().role == "Administrasjon" || user_snapshot.data().role == "Montør" || user_snapshot.data().role == "Selger") {
           
        } else {
            alert("Du har ikke tilgang til å skrive nye artikler.");
            window.location.href = "../artikler";
            console.log(`Rolle: ${user_snapshot.data().role}`)
        }
    } else {
        alert("Du har ikke tilgang til å se denne siden");
        window.location.href = "../artikler";
    }
})


var article_name = document.querySelector("#article_name");
var article_description = document.querySelector("#article_description");
var article_cover_image = document.querySelector("#article_cover_image");
var article_cover_image_alt = document.querySelector("#article_cover_image_alt");

var publish_article = document.querySelector("#publish_article");

publish_article.addEventListener("click", async (e) => {
    e.preventDefault();
    const selected_file = await article_cover_image.files[0];
    const file_name = await selected_file.name;
    console.log(file_name)
    const storage_ref = ref(storage, file_name);

    uploadBytes(storage_ref, selected_file)
    .then( async () => {
        const get_image_url = await getDownloadURL(storage_ref);
        await addDoc(collection(db, 'Articles/'), {
            article_name: article_name.value,
            article_description: article_description.value,
            image_url: get_image_url,
            image_alt: article_cover_image_alt.value,
            name: file_name
        })
        console.log("Ferdig")
    })
    .catch(error => {
        console.error(error)
    })
})
