import { db } from "./firebase-config.js";


import {
    doc,
    getDoc,
    updateDoc,
    collection,
    getDocs,
    query,
    where
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



// GET ID FROM URL

const params = new URLSearchParams(window.location.search);

const taskId = params.get("id");



const form = document.getElementById("taskForm");



// ELEMENT

const task_id = document.getElementById("task_id");
const title = document.getElementById("title");
const description = document.getElementById("description");
const department = document.getElementById("departmentDropdown");
const assigned = document.getElementById("assigned_to");
const due_date = document.getElementById("due_date");
const status = document.getElementById("status");




// LOAD TASK

async function loadTask(){


    if(!taskId){

        alert("Task ID missing");

        return;

    }


    const ref = doc(db,"tasks",taskId);


    const snap = await getDoc(ref);



    if(snap.exists()){


        const task = snap.data();



        task_id.value = task.task_id ?? "";

        title.value = task.title ?? "";

        description.value = task.description ?? "";

        department.value = task.department_name ?? "";

        status.value = task.status ?? "";



        if(task.due_date){

            const date = task.due_date.toDate();

            due_date.value =
            date.toISOString()
            .slice(0,16);

        }


        await loadStaff(task.assigned_to);



    }

    else{

        alert("Task not found");

    }


}




// LOAD STAFF

async function loadStaff(selected){


    const snapshot =
    await getDocs(collection(db,"users"));



    assigned.innerHTML =
    `<option value="">Select Staff</option>`;



    snapshot.forEach(user=>{


        const data=user.data();



        if(data.role === "Staff"){


            assigned.innerHTML +=
            `
            <option value="${data.display_name}">
                ${data.display_name}
            </option>
            `;


        }


    });



    assigned.value = selected ?? "";

}





// UPDATE TASK

form.addEventListener("submit", async(e)=>{


    e.preventDefault();



    try{


        await updateDoc(
            doc(db,"tasks",taskId),
            {

                title:title.value,

                description:description.value,

                department_name:department.value,

                assigned_to:assigned.value,

                due_date:new Date(due_date.value),

                status:status.value

            }

        );



        alert("Task updated successfully");


        window.location.href="task.php";


    }


    catch(error){


        console.error(error);


        alert("Failed to update task");


    }


});




loadTask();