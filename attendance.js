import { db } from "./firebase-config.js";

import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ================= ELEMENT =================

const tbody = document.getElementById("attendanceTable");

const searchInput = document.getElementById("searchInput");

const workModeFilter = document.getElementById("workModeFilter");


// ================= DATA =================

let attendanceData = [];

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

        snapshot.forEach((doc)=>{

            attendanceData.push({

                id: doc.id,
                ...doc.data()

            });

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
                        ${attendance.status ?? "-"}
                    </span>
                `;
        }

        tbody.innerHTML += `
        <tr>

            <td>
                ${attendance.staffName ?? "-"}
            </td>

            <td>
                ${attendance.date ?? "-"}
            </td>

            <td>
                ${attendance.checkIn ?? "-"}
            </td>

            <td>
                ${attendance.checkOut ?? "-"}
            </td>

            <td>
                ${attendance.workMode ?? "-"}
            </td>

            <td>
                ${attendance.reason ?? "-"}
            </td>

            <td>
                ${badge}
            </td>
        </tr>
        `;

    });

}

// ================= SEARCH + FILTER =================
function filterAttendance(){

    const keyword =
    searchInput.value
    .toLowerCase()
    .trim();

    const selectedMode =
    workModeFilter.value;

    const filtered =
    attendanceData.filter(attendance=>{

        const searchText = `

            ${attendance.staffName ?? ""}

            ${attendance.date ?? ""}

            ${attendance.workMode ?? ""}

            ${attendance.status ?? ""}

        `
        .toLowerCase();

        const matchSearch =
        searchText.includes(keyword);

        const matchMode =
        selectedMode === "all" ||

        attendance.workMode === selectedMode;

        return (
            matchSearch &&
            matchMode
        );

    });

    displayAttendance(filtered);
}

// ================= EVENT LISTENER =================
if(searchInput){

    searchInput.addEventListener(
        "input",
        filterAttendance
    );

}

if(workModeFilter){

    workModeFilter.addEventListener(
        "change",
        filterAttendance
    );

}

// ================= START =================

loadAttendance();