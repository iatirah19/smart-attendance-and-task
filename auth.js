import {
auth,
db
}
from "./firebase-config.js";


import {

createUserWithEmailAndPassword,
signInWithEmailAndPassword

}

from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


import {

doc,
setDoc,
getDoc,
serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";





window.register = async function(){


let displayName =
document.getElementById("displayName").value;


let username =
document.getElementById("username").value;


let email =
document.getElementById("email").value;


let phone =
document.getElementById("phone").value;


let gender =
document.getElementById("gender").value;


let department =
document.getElementById("department").value;


let password =
document.getElementById("password").value;


let confirm =
document.getElementById("confirmPassword").value;



if(password !== confirm){

message.innerHTML="Password not match";

return;

}



try{


const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);



const user =
userCredential.user;



await setDoc(
doc(db,"users",user.uid),

{


uid:user.uid,

displayName,

username,

email,

departmentName:department,

gender,

phoneNumber:phone,

photoUrl:"",

role:"Admin",

createdAt:serverTimestamp()


}

);



message.innerHTML=
"Register successful";


showLogin();


}

catch(error){

message.innerHTML =
error.message;

}


}







window.login = async function(){


let email =
document.getElementById("loginEmail").value;


let password =
document.getElementById("loginPassword").value;



try{


let result =
await signInWithEmailAndPassword(
auth,
email,
password
);



let uid =
result.user.uid;



let userDoc =
await getDoc(
doc(db,"users",uid)
);



if(userDoc.exists()){


let data =
userDoc.data();



if(data.role==="Admin"){


window.location.href="dashboard.php";


}

else{


message.innerHTML=
"Access denied";


}


}



}


catch(error){

message.innerHTML=
"Invalid login";


}


}







window.showRegister=function(){

loginForm.classList.remove("active");

registerForm.classList.add("active");

}




window.showLogin=function(){

registerForm.classList.remove("active");

loginForm.classList.add("active");

}





window.showPassword=function(id){

let input =
document.getElementById(id);


input.type =
input.type==="password"
?
"text"
:
"password";


}