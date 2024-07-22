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


var student_absence_email = document.querySelector("#student_absence_email");
var student_absence_hours = document.querySelector("#student_absence_hours");
var student_absence_subject = document.querySelector("#student_absence_subject");
var submit_student_absence = document.querySelector("#submit_student_absence");

var student_homework_title = document.querySelector("#student_homework_title");
var student_homework_description = document.querySelector("#student_homework_description");
var student_homework_due = document.querySelector("#student_homework_due_date");
var submit_student_homework = document.querySelector("#submit_student_homework");

var student_feedback_email = document.querySelector("#student_absence_email");
var student_feedback = document.querySelector("#student_feedback");
var submit_student_feedback = document.querySelector("#submit_student_feedback");

var list_view_students = document.querySelector("#list_view_students");
var load_students = document.querySelector("#load_students");

submit_student_absence.addEventListener("click", async () => {
    const teacher_ref = await doc(db, "Users/", auth.currentUser.email);
    const teacher_snapshot = await getDoc(teacher_ref);
    var teacher_name = teacher_snapshot.data().first_name + " " + teacher_snapshot.data().last_name;
    const student_ref = doc(db, "Users", student_absence_email.value)
    const validate_student_data = await getDoc(student_ref);
    if(validate_student_data.exists()) {
        addDoc(collection(db, "Users", student_absence_email.value, "Absence"), {
            teacher: teacher_name,
            subject: student_absence_subject.value,
            hours: student_absence_hours.value
        })  
        .then(() => {
            alert(`Fravær for ${student_absence_hours.value} timer har blitt registrert på elevn ${validate_student_data.data().first_name}`)
        })
        .catch((error) => {
            console.error("Kunne ikke registrere fravær på elev: " + error);
        })
    } else {
        alert("Eleven eksisterer ikke.");
    }
})

submit_student_feedback.addEventListener("click", async () => {
    const teacher_ref = await doc(db, "Users/", auth.currentUser.email);
    const teacher_snapshot = await getDoc(teacher_ref);
    var teacher_name = teacher_snapshot.data().first_name + " " + teacher_snapshot.data().last_name;
    const student_ref = doc(db, "Users", student_absence_email.value)
    const validate_student_data = await getDoc(student_ref);
    if(validate_student_data.exists()) {
        addDoc(collection(db, "Users", student_feedback_email.value, "Feedback"), {
            teacher: teacher_name,
            feedback: student_feedback.value
        })  
        .then(() => {
            alert(`Elev ${validate_student_data.data().first_name} har fått din tilbakemelding.`)
        })
        .catch((error) => {
            console.error("Kunne ikke gi tilbakemelding til elev: " + error);
        }) 
    } else {
        alert("Eleven eksisterer ikke.");
    }
})
submit_student_homework.addEventListener("click", () => {
    addDoc(collection(db, "Homework"), {
        title: student_homework_title.value,
        description: student_homework_description.value,
        due: student_homework_due.value,
    })
})
var get_absence_hours = 0;

async function select_student(email) {
    const student_ref = doc(db, "Users/", email)
    const student_snapshot = await getDoc(student_ref);

    const student_absence_ref = collection(db, "Users", email, "Absence");
    const student_feedback_ref = collection(db, "Users", email, "Feedback");

    const student_absence_snapshot = await getDocs(student_absence_ref);
    const student_feedback_snapshot = await getDocs(student_feedback_ref);

    var display_student_name = document.querySelector("#display_student_name");

    var student_manager = document.querySelector("#student_manager");
    var student_absence_list = document.querySelector("#student_absence_list");
    var e_student_manager = document.querySelector("#e_student_manager");
    
    var student_name = document.querySelector(".student_name");
    var total_absence = document.querySelector("#total_absence");
    student_manager.textContent = "";
    get_absence_hours = 0;
    student_name.textContent = `${student_snapshot.data().first_name}`
    display_student_name.textContent = `Selected user: ${student_snapshot.data().first_name} ${student_snapshot.data().last_name}`
    student_manager.innerHTML = 
    `
    <div class="item">
        Registrer fravær på elev<br><br>
        <input disabled type="email" id="student_absence_email" placeholder="Elev e-post" value="${student_snapshot.data().email}"><br><br>
        <input type="text" id="student_absence_subject" placeholder="Fag"><br><br>
        <input type="number" id="student_absence_hours" placeholder="Fravær i timer"><br><br>
        <button id="submit_student_absence">Registrer</button>
    </div>
    <div class="item">
        Gi tilbakemelding på en elev <br><br>
        <input disabled type="text" id="student_feedback_email" placeholder="Elev e-post" value="${student_snapshot.data().email}"><br><br>
        <input type="text" id="student_feedback" placeholder="Tilbakemelding"><br><br>
        <button id="submit_student_feedback">Gi tilbakemelding</button>
        </div>
    </div>
    `

    student_absence_list.textContent = "";
    student_absence_snapshot.forEach((doc) => {
        student_absence_list.innerHTML += 
        `
        <div class="item">
            <b>Ført av:</b> ${doc.data().teacher}<br>
            <b>Fag:</b> ${doc.data().subject}<br>
            <b>Timefravær:</b> ${doc.data().hours}
        </div>
             
        `
        get_absence_hours += Number(doc.data().hours);
    })
    console.log("finalcalculation:"+get_absence_hours);
    console.log("inschoolhours"+(get_absence_hours/6).toFixed(1))
    if((get_absence_hours/6).toFixed(1) >= 10) {
        total_absence.style.color = "crimson";
        total_absence.textContent = `(${(get_absence_hours/6).toFixed(1)}/10 skoletimer)`
    } else {
        total_absence.style.color = "black";
        total_absence.textContent = `(${(get_absence_hours/6).toFixed(1)}/10 skoletimer)`
    }
}



load_students.addEventListener("click", async () => {

    const student_ref = collection(db, "Users");
    const get_students = await getDocs(student_ref);

    list_view_students.textContent="";
    get_students.forEach(async (doc) => {
        const item = document.createElement("div");
        item.classList.add("student-list-item");
        item.innerHTML = `
            <b>Full name: </b> ${doc.data().first_name} ${doc.data().last_name}<br><br>
            <b>E-mail</b> ${doc.data().email}
        `;
        var student_email = await doc.data().email;
        item.addEventListener("click", () => select_student(student_email));

        list_view_students.appendChild(item);
    })
})



