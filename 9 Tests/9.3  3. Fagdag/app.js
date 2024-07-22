import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


const firebaseConfig = {
       /*We don't do this shit around here*/
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

// Variabler
const userBlock = document.querySelector("#userBlock");
const userForm = document.querySelector("#userForm");
const content = document.querySelector("#content");
const recommmendedForYou = document.querySelector("#recommendedForYou");

const signIn = document.querySelector("#signIn");
const signUp = document.querySelector("#signUp");
const signOutUser = document.querySelector("#signOut");

const signedOut = document.querySelector("#signedOut");
const signedIn = document.querySelector("#signedIn");
const signedInContent = document.querySelector("#signedInContent");

// Get user data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const docSnap = await getDoc(doc(db, "users/" + user.email));
        if(docSnap.exists()) {
            signedOut.style.display = "none";
            signedIn.style.display = "flex";
            content.style.display = "block";
            userForm.style.display = "none";
            recommmendedForYou.innerHTML = `Recommended for you ${docSnap.data().username}`;

            signedInContent.innerHTML = 
            `
            Welcome back, ${docSnap.data().username}
            `
            console.log(`User: ${docSnap.data().username} (${uid}) signed in`);
        } else {
            console.error("This user does not have any data, ending session.");
            signOut(auth);
        }   
    } else {
        signedOut.style.display = "flex";
        signedIn.style.display = "none";
        content.style.display = "none";
        userForm.style.display = "block";
        userForm.innerHTML = "<h1 style='margin: 50px;'>Login or sign up to access this content</h1>";
    }
});

signOutUser.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        console.log("User signed out");
        signedOut.style.display = "flex";
        signedIn.style.display = "none";
    })
    .catch((error) => {
        console.log(`Could not sign out user: ${error.message}`);
    })
})


// Signing up new users
signIn.addEventListener('click', () => {
    const email = document.querySelector("#userEmail").value;
    const password = document.querySelector("#userPassword").value;
    const username = document.querySelector("#userUsername").value;
    
    signInWithEmailAndPassword(auth, email, password) 
    .then( async (userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
        console.error(`Error signing in user: ${error.message}`);
    }) 
});


// Signing in existing users
signUp.addEventListener('click', () => {
    const email = document.querySelector("#userEmail").value;
    const password = document.querySelector("#userPassword").value;
    const username = document.querySelector("#userUsername").value;

    createUserWithEmailAndPassword(auth, email, password) 
    .then( async (userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users/" + user.email), {
            username: username,
            email: email
        });
    })
    .catch((error) => {
        console.error(`Error creating user: ${error.code} /// ${error.message}`);
    });
});



