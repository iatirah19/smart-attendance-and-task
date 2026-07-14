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


// ================= REGISTER =================

window.register = async function(){


    const display_name = document.getElementById("display_name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone_number = document.getElementById("phone_number").value;
    const gender = document.getElementById("gender").value;
    const department_name = document.getElementById("department_name").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    if(password !== confirmPassword){

        alert("Password does not match");
        return;

    }


    if(
        display_name === "" ||
        username === "" ||
        email === "" ||
        password === ""
    ){

        alert("Please fill in all required fields");
        return;

    }



    try{


        // CREATE FIREBASE AUTH ACCOUNT

        const userCredential = 
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );


        const user = userCredential.user;



        // CREATE USER DOCUMENT

        await setDoc(
            doc(db,"users",user.uid),
            {

                uid:user.uid,

                display_name:display_name,

                username:username,

                email:email,

                phone_number:phone_number,

                gender:gender,

                department_name:department_name,

                role:"admin",

                created_time:serverTimestamp()

            }
        );



        alert("Register successful! Please login.");



        // CLEAR REGISTER FORM

        document.getElementById("display_name").value="";
        document.getElementById("username").value="";
        document.getElementById("email").value="";
        document.getElementById("phone_number").value="";
        document.getElementById("gender").value="";
        document.getElementById("password").value="";
        document.getElementById("confirmPassword").value="";



        // GO LOGIN FORM

        showLogin();



    }


    catch(error){


        console.log(error);

        alert(error.message);


    }


};





// ================= LOGIN =================


window.login = async function(){


    const email =
    document.getElementById("loginEmail").value;


    const password =
    document.getElementById("loginPassword").value;



    try{


        const result =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        const uid = result.user.uid;



        const userDoc =
        await getDoc(
            doc(db,"users",uid)
        );



        if(userDoc.exists()){


            const data = userDoc.data();



            if(data.role === "admin"){


                alert("Login successful!");


                window.location.href =
                "dashboard.php";


            }


            else{


                alert("Access denied. Admin only.");

            }



        }


        else{


            alert("User data not found");


        }



    }


    catch(error){


        console.log(error);

        alert("Invalid email or password");


    }


};




// ================= SWITCH FORM =================


window.showRegister=function(){


    document
    .getElementById("loginForm")
    .classList.remove("active");


    document
    .getElementById("registerForm")
    .classList.add("active");


};



window.showLogin=function(){


    document
    .getElementById("registerForm")
    .classList.remove("active");


    document
    .getElementById("loginForm")
    .classList.add("active");


};




// ================= SHOW PASSWORD =================


window.showPassword=function(id){


    const input =
    document.getElementById(id);



    if(input.type==="password"){

        input.type="text";

    }

    else{

        input.type="password";

    }


};