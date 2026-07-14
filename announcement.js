import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    getDoc,
    doc,
    deleteDoc
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ================= ELEMENT =================

const tbody = document.getElementById("announcementTable");
const targetFilter = document.getElementById("targetFilter");

let announcementData = [];


// ================= FORMAT DATE =================

function formatDate(timestamp){

    if(!timestamp){
        return "-";
    }

    if(timestamp.toDate){
        return timestamp.toDate().toLocaleString("en-GB");
    }

    return timestamp;

}


// ================= GET USER NAME =================

async function getCreatedByName(userRef){

    if(!userRef){
        return "-";
    }

    try{

        const userSnap = await getDoc(userRef);

        if(userSnap.exists()){

            const userData = userSnap.data();

            return userData.name || userData.username || "-";

        }

        return "-";

    }
    catch(error){

        console.error(
            "Error getting user:",
            error
        );

        return "-";

    }

}


// ================= LOAD ANNOUNCEMENT =================

async function loadAnnouncements(){

    if(!tbody){
        return;
    }


    tbody.innerHTML = "";


    try{

        const snapshot = await getDocs(
            collection(db,"announcements")
        );


        announcementData = [];


        let no = 1;


        for(const announcementDoc of snapshot.docs){


            const data = announcementDoc.data();


            announcementData.push({

                id: announcementDoc.id,
                ...data

            });


            const row = await createRow(
                no,
                announcementDoc.id,
                data
            );


            tbody.appendChild(row);


            no++;

        }


    }
    catch(error){

        console.error(
            "Error loading announcements:",
            error
        );


        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    Failed to load announcement data.
                </td>
            </tr>
        `;

    }

}


// ================= CREATE TABLE ROW =================

async function createRow(no,id,data){

    const tr = document.createElement("tr");

    const createdByName =
    await getCreatedByName(data.created_by);

    tr.innerHTML = `
        <td>${no}</td>
        <td>${data.title || "-"}</td>
        <td>${data.content || "-"}</td>
        <td>${createdByName}</td>
        <td>${data.target_role || "-"}</td>
        <td>${formatDate(data.created_at)}</td>
        <td>
            <button class="action-btn delete" data-id="${id}">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    return tr;
}


// ================= DELETE =================

async function deleteAnnouncement(id){


    const confirmDelete =
    confirm(
        "Are you sure want to delete this announcement?"
    );


    if(!confirmDelete){
        return;
    }


    try{


        await deleteDoc(
            doc(
                db,
                "announcements",
                id
            )
        );


        alert(
            "Announcement deleted successfully."
        );


        loadAnnouncements();


    }
    catch(error){

        console.error(
            "Delete error:",
            error
        );


        alert(
            "Failed to delete announcement."
        );

    }

}


// ================= BUTTON EVENT =================

if(tbody){

    tbody.addEventListener(
        "click",
        (e)=>{


            const editBtn =
            e.target.closest(".edit");


            const deleteBtn =
            e.target.closest(".delete");



            if(editBtn){

                editAnnouncement(
                    editBtn.dataset.id
                );

            }



            if(deleteBtn){

                deleteAnnouncement(
                    deleteBtn.dataset.id
                );

            }


        }
    );

}

// ================= FILTER =================

if(targetFilter){

    targetFilter.addEventListener(
        "change",
        async()=>{

            const selected =
            targetFilter.value.toLowerCase();

            tbody.innerHTML = "";

            let no = 1;

            for(const item of announcementData){

                const role =
                (item.target_role || "")
                .toLowerCase();

                if(selected === "all" || role === selected){

                    const row =
                    await createRow(
                        no,
                        item.id,
                        item
                    );

                    tbody.appendChild(row);

                    no++;

                }

            }

            if(no === 1){

                tbody.innerHTML = `
                    <tr>
                        <td colspan="7">
                            No announcement found.
                        </td>
                    </tr>
                `;

            }

        }
    );

}

// ================= START =================

loadAnnouncements();