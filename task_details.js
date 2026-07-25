import { db } from "./firebase-config.js";

import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// =====================
// GET TASK ID
// =====================

const taskId = document.getElementById("taskId").value;

const updatesContainer = document.getElementById("updatesContainer");



// =====================
// FORMAT DATE
// =====================

function formatDate(timestamp) {

    if (!timestamp) {
        return "-";
    }

    return timestamp
        .toDate()
        .toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

}



// =====================
// LOAD TASK DETAILS
// =====================

async function loadTask() {

    try {

        const taskSnap = await getDoc(
            doc(db, "tasks", taskId)
        );


        if (!taskSnap.exists()) {

            alert("Task not found");
            return;

        }


        const task = taskSnap.data();


        document.getElementById("taskTitle").innerHTML =
            task.title ?? "-";


        document.getElementById("description").innerHTML =
            task.description ?? "-";


        document.getElementById("department").innerHTML =
            task.department_name ?? "-";


        document.getElementById("assigned").innerHTML =
            task.assigned_to ?? "-";


        document.getElementById("dueDate").innerHTML =
            formatDate(task.due_date);


        document.getElementById("status").innerHTML =
            task.status ?? "-";



        loadUpdates(taskSnap.ref);


    } catch (error) {

        console.error(
            "Error loading task:",
            error
        );

    }

}




// =====================
// LOAD TASK UPDATES
// =====================

async function loadUpdates(taskRef) {

    try {


        const q = query(

            collection(db, "task_updates"),

            where(
                "task_ref",
                "==",
                taskRef
            )

        );



        const snapshot = await getDocs(q);



        updatesContainer.innerHTML = "";



        if (snapshot.empty) {


            updatesContainer.innerHTML = `

                <div class="empty">
                    No update yet.
                </div>

            `;


            return;

        }




        let updates = [];



        snapshot.forEach(docSnap => {

            updates.push({

                id: docSnap.id,

                ...docSnap.data()

            });

        });




        // Latest update first

        updates.sort((a, b) => {

            return (
                b.updated_at.toMillis()
                -
                a.updated_at.toMillis()
            );

        });





        for (const update of updates) {


            let staffName = "-";



            // =====================
            // GET STAFF NAME
            // =====================

            if (update.staff_ref) {


                const staffSnap = await getDoc(
                    update.staff_ref
                );


                if (staffSnap.exists()) {


                    const staff = staffSnap.data();


                    staffName =
                        staff.display_name ??
                        staff.email ??
                        "-";

                }

            }





            // =====================
            // FILE ATTACHMENTS
            // =====================

            let filesHTML = "";



            if (
                update.files &&
                update.files.length > 0
            ) {


                filesHTML = `

                    <div class="files">

                        <strong>
                            Files:
                        </strong>


                        <ul>

                            ${
                                update.files.map(file => `

                                    <li>

                                        <a 
                                            href="${file}" 
                                            target="_blank"
                                        >
                                            ${file.split("/").pop()}
                                        </a>

                                    </li>

                                `).join("")
                            }

                        </ul>

                    </div>

                `;

            }





            // =====================
            // DISPLAY UPDATE CARD
            // =====================

            updatesContainer.innerHTML += `

                <div class="update-card">


                    <div class="update-header">


                        <strong>
                            ${staffName}
                        </strong>


                        <span>
                            ${formatDate(update.updated_at)}
                        </span>


                    </div>



                    <p>
                        ${update.comment ?? "-"}
                    </p>



                    ${filesHTML}



                </div>

            `;


        }



    } catch (error) {


        console.error(
            "Error loading updates:",
            error
        );


    }

}




// =====================
// START
// =====================

loadTask();