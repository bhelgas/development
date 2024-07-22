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

    var student_week_schedule = document.querySelector("#student_week_schedule");
    var student_homework_list = document.querySelector("#student_homework_list");
    var student_absence_list = document.querySelector("#student_absence_list");
    var student_feedback_list = document.querySelector("#student_feedback_list");

    
    student_week_schedule.innerHTML = "";
    
    student_week_schedule.innerHTML += 
    `
    Ingen data
    `;

    const homework_ref = collection(db, "Homework");
    const homework_snapshot = await getDocs(homework_ref);
    student_homework_list.textContent = "";
    homework_snapshot.forEach((document) => {
        student_homework_list.innerHTML += 
        `
            <div class="item">
            <b>${document.data().title}</b><br>
            <b>Forfallsdato: </b> ${document.data().due}<br><br>
            ${document.data().description}<br><br>
            <button onclick="${deleteDoc(doc(db, "Homework", document.id))}">Mark complete</button>
            </div>
           
        `;
    })
    
    const absence_ref = collection(db, "Users", auth.currentUser.email, "Absence");
    const absence_snapshot = await getDocs(absence_ref);
    var student_absent_hours = 0;
    var student_absent = document.querySelector("#student_absent_hours");
    
    student_absence_list.textContent="";
    absence_snapshot.forEach((doc) => {
        student_absence_list.innerHTML += 
        `
            <div class="item">
            <b>Ført av:</b> ${doc.data().teacher}<br>
            <b>Fag:</b> ${doc.data().subject}<br>
            <b>Timefravær:</b> ${doc.data().hours}
            </div>
             
        `;
        student_absent_hours = doc.data().hours
    })
        
    if(student_absent_hours == 0) {
        student_absent.innerHTML += `<div>Du har ikke noe fravær!</div>`
    } else {
        student_absent.innerHTML += `(${(student_absent_hours/6).toFixed(1)}/10 timer)`
    }
    
    const feedback_ref = collection(db, "Users", auth.currentUser.email, "Feedback")
    const feedback_snapshot = await getDocs(feedback_ref);

    student_feedback_list.textContent = "";

    feedback_snapshot.forEach((doc) => {
        console.log("I am doing shit")
        student_feedback_list.innerHTML += 
        `
            <div class="item">
                <b>Tilbakemelding fra </b> ${doc.data().teacher}<br>
                ${doc.data().feedback}
            </div>
            `;
    })