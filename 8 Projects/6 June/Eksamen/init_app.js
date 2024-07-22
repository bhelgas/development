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


// Initialize dynamic content
onAuthStateChanged(auth, (user) => {
    if(user) {
        header_logged_in();
    } else {
        header_logged_out();
    }
})
// Init website content

var global_header = document.querySelector("#global_header");
// <img class="logo" src="../resources/solcellespesialisten2.png">
function header_logged_out () {
    global_header.innerHTML = 
    `
    <a href="../artikler" style="cursor:pointer"><img class="logo" src="../resources/solcellespesialisten2.png"></a>
        <div class="flex">
            <button id="sign-in" class="primary">Logg inn</button><br><br>
            <button id="sign-up" class="secondary">Opprett ny bruker</button>
        </div>
    `
}
// console.log(auth.currentUser.email)
async function header_logged_in() {
    const user_ref = doc(db, "Users", auth.currentUser.email);
    const user_snapshot = await getDoc(user_ref);

    global_header.innerHTML = 
    `
    <a href="../artikler" style="cursor:pointer"><img class="logo" src="../resources/solcellespesialisten2.png"></a>
    <div>
        Hei, ${user_snapshot.data().username} (${user_snapshot.data().role})!&nbsp;&nbsp;
        <button id="din-bruker" class="primary">Din bruker</button>
        <button id="log-out" class="secondary">Logg ut</button>

    </div>
    `

}



document.addEventListener("click", (e) => {
    if(e.target.closest("#test")) {
        console.log("yes")
// LINKS
    } else if (e.target.closest("#log-out")) {
        signOut(auth)
        .then(() => {
            alert("Du har blitt logget ut!");
        })
        .catch(error => {
            alert("Kunne ikke logge deg ut, sjekk logg.")
            console.error(error);
        })

    } else if (e.target.closest("#sign-up")) {
        window.location.href = "../ny-bruker";

    } else if (e.target.closest("#sign-in")) {
        window.location.href = "../logg-inn";
    } else if (e.target.closest("#din-bruker")) {
        window.location.href = "../din-bruker";
    } 
})