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

    const announcementList = document.getElementById("announcementList");

    if(!announcementList){
        return;
    }

    try{

        const q = query(
            collection(db,"announcements"),
            orderBy("created_at","desc"),
            limit(3)
        );

        const snapshot = await getDocs(q);

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

            const data = document.data();

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
// LOAD DASHBOARD STATISTIC
// =========================

async function loadDashboardStats(){

    try{


        // =========================
        // TOTAL STAFF
        // =========================

        const staffSnapshot = await getDocs(
            collection(db,"users")
        );


        let totalStaff = 0;


        staffSnapshot.forEach((document)=>{

            const data = document.data();


            if(data.role === "Staff"){

                totalStaff++;

            }

        });


        document.getElementById(
            "totalStaff"
        ).textContent = totalStaff;



        // =========================
        // TODAY DATE
        // =========================

        const today = new Date()
        .toISOString()
        .split("T")[0];



        // =========================
        // ATTENDANCE
        // =========================

        const attendanceSnapshot = await getDocs(
            collection(db,"attendance")
        );


        let present = 0;
        let leave = 0;

        let office = 0;
        let wfh = 0;



        attendanceSnapshot.forEach((document)=>{


            const data = document.data();


            let attendanceDate = "";



            // jika guna date field
            if(data.date){

                attendanceDate = data.date;

            }



            // jika guna timestamp check_in
            else if(data.check_in && data.check_in.toDate){

                attendanceDate = data.check_in
                .toDate()
                .toISOString()
                .split("T")[0];

            }



            if(attendanceDate === today){


                if(data.status === "present"){

                    present++;

                }


                if(data.status === "leave"){

                    leave++;

                }



                if(data.work_mode === "office"){

                    office++;

                }



                if(data.work_mode === "wfh"){

                    wfh++;

                }

            }


        });



        document.getElementById(
            "presentToday"
        ).textContent = present;


        document.getElementById(
            "leaveToday"
        ).textContent = leave;


        document.getElementById(
            "officeMode"
        ).textContent = office;


        document.getElementById(
            "wfhMode"
        ).textContent = wfh;


        document.getElementById(
            "leaveMode"
        ).textContent = leave;



    }
    catch(error){

        console.error(
            "Dashboard statistic error:",
            error
        );

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


        if(!user){

            window.location.href="auth.php";

            return;

        }



        const userRef = doc(
            db,
            "users",
            user.uid
        );


        const userSnap = await getDoc(userRef);



        if(!userSnap.exists()){

            window.location.href="auth.php";

            return;

        }



        const userData = userSnap.data();



        if(userData.role !== "admin"){


            alert(
                "Admin access only"
            );


            window.location.href="auth.php";

            return;

        }



        const adminName = document.getElementById(
            "adminName"
        );


        if(adminName){

            adminName.textContent =
            userData.name || "Admin";

        }



        const loading = document.getElementById(
            "loading"
        );


        const dashboardContent = document.getElementById(
            "dashboardContent"
        );



        if(loading){

            loading.style.display = "none";

        }


        if(dashboardContent){

            dashboardContent.style.display = "block";

        }



        loadAnnouncements();

        loadDashboardStats();



    }
    catch(error){


        console.error(
            "Authentication error:",
            error
        );


        window.location.href="auth.php";

    }

});