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

var display_articles = document.querySelector("#display_articles");

var articles = []; 

const docs_ref = collection(db, "Articles");
const get_docs = await getDocs(docs_ref);
display_articles.textContent = ""; 

get_docs.forEach(async(doc) => {
    articles.push([doc.id, doc.data().article_name, doc.data().article_description, doc.data().image_url, doc.data().image_alt])
    // const item = document.createElement("article");
    // item.classList.add("display_articles_item");
    // item.innerHTML = `
    //     <img width="100%" src="${doc.data().image_url}" alt="${doc.data().image_alt}">
    //     <h3>${doc.data().article_name}</h3>
    //     <p>
    //         ${doc.data().article_description}
    //     </p>
    // `;
    // var user_email = await doc.data().email;
    // item.addEventListener("click", () => select_user(user_email));

    // display_articles.appendChild(item);
    
    console.log(articles)
});