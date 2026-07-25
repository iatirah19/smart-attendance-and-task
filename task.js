import { db } from "./firebase-config.js";


import {
    collection,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc
} 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ================= ELEMENT =================

let taskData = [];

const table = document.getElementById("taskTable");

const searchInput = document.getElementById("searchTask");

const departmentFilter = document.getElementById("departmentFilter");

const statusFilter = document.getElementById("statusFilter");


// ================= LOAD TASK =================

async function loadTask(){

    try{

        taskData = [];


        const q = query(
            collection(db,"tasks"),
            orderBy("created_at","desc")
        );


        const snapshot = await getDocs(q);


        snapshot.forEach((doc)=>{

            taskData.push({

                id:doc.id,
                ...doc.data()

            });

        });


        displayTask(taskData);


    }

    catch(error){

        console.error(error);

        alert("Failed to load task");

    }

}

function formatDueDate(timestamp) {

    if (!timestamp) return "-";

    return timestamp.toDate().toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

}


// ================= DISPLAY TASK =================

function displayTask(data){

    table.innerHTML="";

    let no = 1;


    data.forEach(task=>{


        let statusClass = "";


        if(task.status === "Pending"){

            statusClass = "pending";

        }

        else if(task.status === "Completed"){

            statusClass = "completed";

        }

        table.innerHTML += `

        <tr>

            <td>${no++}</td>

            <td>${task.title ?? "-"}</td>

            <td>${task.department_name ?? "-"}</td>

            <td>${task.assigned_to ?? "-"}</td>

            <td>${formatDueDate(task.due_date)}</td>


            <td>
                <span class="status ${statusClass}">
                    ${task.status ?? "-"}
                </span>
            </td>


            <td class="action-buttons">

                <button 
                class="view-btn"
                onclick="viewTask('${task.id}')">

                    <i class="fas fa-eye"></i>

                </button>


                <button 
                class="edit-btn"
                onclick="editTask('${task.id}')">
                    <i class="fas fa-pen"></i>
                </button>


                <button
                class="delete-btn"
                onclick="deleteTask('${task.id}')">

                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `;

    });
}

// ================= SEARCH + FILTER =================
function filterTask(){

    const search =
        searchInput.value
        .toLowerCase()
        .trim();


    const department =
        departmentFilter.value;


    const status =
        statusFilter.value;



    const filtered = taskData.filter(task=>{


        const title =
            (task.title ?? "")
            .toLowerCase();


        const taskDepartment =
            task.department_name ?? "";


        const taskStatus =
            task.status ?? "";



        return (

            title.includes(search)

            &&

            (
                department === "all" ||
                taskDepartment === department
            )

            &&

            (
                status === "all" ||
                taskStatus === status
            )

        );


    });


    displayTask(filtered);

}

// ================= EDIT TASK =================

window.editTask = function(id){

    window.location.href =
    "edit_task.php?id=" + id;

};

// ================= DELETE TASK =================

window.deleteTask = async function(id){
    if(confirm("Delete this task?")){
        try{
            await deleteDoc(
                doc(db,"tasks",id)
            );
            alert("Task deleted successfully");
            loadTask();
        }
        catch(error){
            console.error(error);
            alert("Failed to delete task");
        }
    }
};

// ================= VIEW TASK =================

window.viewTask = function(id){

    window.location.href =
    "task_details.php?id="+id;

};

// ================= EVENT LISTENER =================

searchInput.addEventListener(
    "input",
    filterTask
);


departmentFilter.addEventListener(
    "change",
    filterTask
);


statusFilter.addEventListener(
    "change",
    filterTask
);

// ================= START =================

loadTask();