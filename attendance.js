import { db } from "../firebase-config.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tbody = document.getElementById("attendanceTable");

async function loadAttendance(){

    tbody.innerHTML = "";

    const querySnapshot = await getDocs(
        collection(db,"attendance")
    );

    querySnapshot.forEach((doc)=>{

        const data = doc.data();

        let badge = "";

        if(data.status === "Checked In"){

            badge = `<span class="status checked-in">${data.status}</span>`;

        }
        else if(data.status === "Checked Out"){

            badge = `<span class="status checked-out">${data.status}</span>`;

        }
        else{

            badge = `<span class="status leave">${data.status}</span>`;

        }

        tbody.innerHTML += `
            <tr>
                <td>${data.staffName}</td>
                <td>${data.date}</td>
                <td>${data.checkIn || "-"}</td>
                <td>${data.checkOut || "-"}</td>
                <td>${data.workMode}</td>
                <td>${data.reason || "-"}</td>
                <td>${badge}</td>
            </tr>
        `;

    });

}

loadAttendance();


// SEARCH

const search = document.getElementById("searchInput");

search.addEventListener("keyup",()=>{

    const value = search.value.toLowerCase();

    const rows = document.querySelectorAll("#attendanceTable tr");

    rows.forEach(row=>{

        const text = row.innerText.toLowerCase();

        row.style.display = text.includes(value) ? "" : "none";

    });

});


// SIDEBAR TOGGLE

const toggle = document.getElementById("toggleSidebar");

toggle.addEventListener("click",()=>{

    document.body.classList.toggle("sidebar-close");

});