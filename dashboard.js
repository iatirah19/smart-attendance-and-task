import { db } from "./firebase-config.js";

import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const auth = getAuth();


// =========================
// LOAD ANNOUNCEMENT
// =========================

async function loadAnnouncements(){

    const announcementList =
    document.getElementById("announcementList");


    if(!announcementList){
        return;
    }


    try{


        const q = query(

            collection(
                db,
                "announcements"
            ),

            orderBy(
                "created_at",
                "desc"
            ),

            limit(3)

        );


        const snapshot =
        await getDocs(q);



        announcementList.innerHTML = "";



        if(snapshot.empty){


            announcementList.innerHTML = `

                <p>
                    No announcement available.
                </p>

            `;


            return;

        }



        snapshot.forEach((document)=>{


            const data =
            document.data();



            announcementList.innerHTML += `


                <div class="announcement-card">


                    <h3>
                        ${data.title || "-"}
                    </h3>


                    <p>
                        ${data.content || "-"}
                    </p>


                    <small>
                        ${formatDate(data.created_at)}
                    </small>


                </div>


            `;


        });



    }
    catch(error){


        console.error(
            "Announcement error:",
            error
        );


        announcementList.innerHTML = `

            <p>
                Failed to load announcement.
            </p>

        `;


    }

}



// =========================
// FORMAT DATE
// =========================

function formatDate(timestamp){


    if(!timestamp){

        return "-";

    }


    if(timestamp.toDate){

        return timestamp
        .toDate()
        .toLocaleDateString("en-GB");

    }


    return timestamp;

}




// =========================
// AUTH CHECK
// =========================

onAuthStateChanged(
auth,
async(user)=>{


    try{


        // =========================
        // CHECK LOGIN
        // =========================

        if(!user){

            window.location.href="auth.php";

            return;

        }



        // =========================
        // GET USER DATA
        // =========================


        const userRef =
        doc(
            db,
            "users",
            user.uid
        );


        const userSnap =
        await getDoc(userRef);



        if(!userSnap.exists()){


            window.location.href="auth.php";

            return;

        }



        const userData =
        userSnap.data();




        // =========================
        // ADMIN CHECK
        // =========================


        if(userData.role !== "admin"){


            alert(
                "Admin access only"
            );


            window.location.href="auth.php";


            return;

        }




        // =========================
        // DISPLAY ADMIN NAME
        // =========================


        const adminName =
        document.getElementById(
            "adminName"
        );



        if(adminName){

            adminName.textContent =
            userData.name || "Admin";

        }





        // =========================
        // SHOW DASHBOARD
        // =========================


        const loading =
        document.getElementById(
            "loading"
        );


        const dashboardContent =
        document.getElementById(
            "dashboardContent"
        );



        if(loading){

            loading.style.display =
            "none";

        }



        if(dashboardContent){

            dashboardContent.style.display =
            "block";

        }




        // =========================
        // LOAD ANNOUNCEMENT
        // =========================

        loadAnnouncements();



    }
    catch(error){


        console.error(
            "Authentication error:",
            error
        );


        window.location.href="auth.php";


    }


});