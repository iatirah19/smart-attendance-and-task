import { auth, db } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const message = document.getElementById("message");

// ================= REGISTER =================

window.register = async function(){

    let display_name = document.getElementById("display_name").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let phone_number = document.getElementById("phone_number").value;
    let gender = document.getElementById("gender").value;
    let department_name = document.getElementById("department_name").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        message.innerHTML = "Password not match";
        return;
    }

    try{

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await setDoc(
            doc(db,"users",user.uid),
            {
                email:email,
                phone_number:phone_number,
                gender:gender,
                department_name:department_name,
                username:username,
                display_name:display_name,
                role:"admin",
                createdAt:serverTimestamp()
            }
        );

        message.style.color="green";
        message.innerHTML="Register successful. Redirecting to login...";

        setTimeout(()=>{

            showLogin();
            message.innerHTML="";

        },2000);

    }
    catch(error){

        message.style.color="red";
        message.innerHTML=error.message;

    }

};


// ================= LOGIN =================

window.login = async function(){

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    try{

        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const uid = result.user.uid;

        const userDoc = await getDoc(
            doc(db,"users",uid)
        );

        if(userDoc.exists()){

            const data = userDoc.data();

            if(data.role === "admin"){

                message.style.color="green";
                message.innerHTML="Login successful...";

                window.location.href="dashboard.php";

            }
            else{

                message.innerHTML="Access denied. Admin only.";

            }

        }
        else{

            message.innerHTML="User data not found";

        }

    }
    catch(error){

        message.style.color="red";
        message.innerHTML="Invalid email or password";

    }

};


// ================= SWITCH FORM =================

window.showRegister = function(){

    document
    .getElementById("loginForm")
    .classList.remove("active");

    document
    .getElementById("registerForm")
    .classList.add("active");

};


window.showLogin = function(){

    document
    .getElementById("registerForm")
    .classList.remove("active");

    document
    .getElementById("loginForm")
    .classList.add("active");

};


// ================= SHOW PASSWORD =================

window.showPassword = function(id){

    let input = document.getElementById(id);

    if(input.type === "password"){

        input.type="text";

    }
    else{

        input.type="password";

    }

};