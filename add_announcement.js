import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    doc
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
    getAuth
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const form = document.getElementById("announcementForm");

const auth = getAuth();


form.addEventListener("submit", async(e)=>{

    e.preventDefault();


    const title =
    document.getElementById("title").value;


    const content =
    document.getElementById("content").value;


    const target_role =
    document.getElementById("target_role").value;



    const user = auth.currentUser;



    if(!user){

        alert("User not logged in.");

        return;

    }



    try{


        await addDoc(
            collection(db,"announcements"),
            {

                title: title,

                content: content,

                target_role: target_role,

                created_by: doc(
                    db,
                    "users",
                    user.uid
                ),

                created_at: serverTimestamp()

            }
        );



        alert(
            "Announcement published successfully!"
        );


        window.location.href =
        "announcement.php";


    }
    catch(error){


        console.error(
            "Add announcement error:",
            error
        );


        alert(
            "Failed to publish announcement."
        );

    }

});