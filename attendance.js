import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    getDoc
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ================= ELEMENT =================

const tbody = document.getElementById("attendanceTable");

const workModeFilter = document.getElementById("workModeFilter");


// ================= DATA =================

let attendanceData = [];


// ================= FORMAT DATE =================

function formatDate(timestamp){

    if(!timestamp) return "-";

    return timestamp
    .toDate()
    .toLocaleDateString("ms-MY",{
        day:"numeric",
        month:"long",
        year:"numeric"
    });

}


// ================= FORMAT TIME =================

function formatTime(timestamp){

    if(!timestamp) return "-";

    return timestamp
    .toDate()
    .toLocaleTimeString("en-GB",{
        hour:"2-digit",
        minute:"2-digit"
    });

}

// ================= LOAD ATTENDANCE =================

async function loadAttendance(){

    try{

        tbody.innerHTML = `
        <tr>
            <td colspan="7">
                Loading attendance...
            </td>
        </tr>
        `;


        const snapshot = await getDocs(
            collection(db,"attendance")
        );


        attendanceData = [];


        for(const docSnap of snapshot.docs){


            const attendance = docSnap.data();


            let staffName = "-";



            // ================= GET USER NAME =================

            if(attendance.user_ref){


                const userSnapshot = await getDoc(
                    attendance.user_ref
                );


                if(userSnapshot.exists()){


                    const userData = userSnapshot.data();


                    staffName =
                    userData.name ??
                    userData.username ??
                    userData.fullname ??
                    userData.email ??
                    "-";

                }

            }



            attendanceData.push({

                id: docSnap.id,

                staffName: staffName,

                created_at: formatDate(attendance.created_at),

                created_at_raw: attendance.created_at,

                check_in: formatTime(attendance.check_in),

                check_out: formatTime(attendance.check_out),

                work_mode: attendance.work_mode ?? "-",

                reason: attendance.reason ?? "-",

                status: attendance.status ?? "-"
            
            });

        }

        attendanceData.sort((a, b) => {
            return b.created_at_raw.toMillis() - a.created_at_raw.toMillis();
        });
        
        displayAttendance(attendanceData);


    }


    catch(error){


        console.error(
            "Error loading attendance:",
            error
        );


        tbody.innerHTML = `
        <tr>
            <td colspan="7">
                Failed to load attendance
            </td>
        </tr>
        `;

    }

}

// ================= DISPLAY TABLE =================

function displayAttendance(data){

    tbody.innerHTML = "";

    if(data.length === 0){

        tbody.innerHTML = `
        <tr>
            <td colspan="7">
                No attendance record found
            </td>
        </tr>
        `;

        return;

    }

    data.forEach(attendance=>{

        let badge;

        switch(attendance.status){

            case "Checked In":

                badge = `
                <span class="status checked-in">
                    Checked In
                </span>
                `;

            break;

            case "Checked Out":

                badge = `
                <span class="status checked-out">
                    Checked Out
                </span>
                `;

            break;

            default:

                badge = `
                <span class="status leave">
                    ${attendance.status}
                </span>
                `;

        }

        tbody.innerHTML += `

        <tr>
            <td>${attendance.staffName}</td>
            <td>${attendance.created_at}</td>
            <td>${attendance.check_in}</td>
            <td>${attendance.check_out}</td>
            <td>${attendance.work_mode}</td>
            <td>${attendance.reason}</td>
            <td>${badge}</td>
        </tr>

        `;

    });

}

// ================= FILTER WORK MODE =================

function filterAttendance(){

    const selectedMode =
    workModeFilter.value
    .toLowerCase();

    const filtered =
    attendanceData.filter(attendance=>{

        const matchMode =
        selectedMode === "all" ||


        attendance.work_mode
        .toLowerCase()
        .trim() === selectedMode;

        return matchMode;

    });

    displayAttendance(filtered);

}

// ================= EVENT LISTENER =================

if(workModeFilter){

    workModeFilter.addEventListener(
        "change",
        filterAttendance
    );

}

// ================= START =================

loadAttendance();