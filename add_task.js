import { db } from "./firebase-config.js";

import { collection, addDoc, serverTimestamp, getDocs }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const departmentDropdown = 
document.getElementById("department_name");

const staffDropdown = 
document.getElementById("assigned_to");

/*
================================
LOAD STAFF BY DEPARTMENT
================================
*/

departmentDropdown.addEventListener("change", async()=>{

const selectedDepartment = 
departmentDropdown.value;

staffDropdown.innerHTML = 
`<option value=""> Loading staff... </option>`;

const staffSnapshot = await getDocs(
collection(db,"staff")
);

staffDropdown.innerHTML =
`<option value=""> Select Staff </option>`;

staffSnapshot.forEach((doc)=>{

const staff = doc.data();

if(staff.department_name === selectedDepartment){

const option = document.createElement("option");

// simpan staff id
option.value = doc.id;

// paparkan nama staff
option.textContent = staff.name;

staffDropdown.appendChild(option);

}

});

});

/*
================================
ADD TASK
================================
*/
const form = document.getElementById("taskForm");

form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    try{
        const docRef = await addDoc(
            collection(db,"tasks"),
            {
                title:
                document.getElementById("title").value,
                
                description:
                document.getElementById("description").value,
                
                assigned_to:
                document.getElementById("assigned_to").value,
                
                status:
                document.getElementById("status").value,
                
                due_date:
                document.getElementById("due_date").value,
                
                department_name:
                document.getElementById("department_name").value,
                
                created_at:
                serverTimestamp()
            }
        );

        // simpan task_id juga
        await updateDoc(docRef,{
        task_id: docRef.id
        });

        alert("Task added successfully!");
        window.location.href="manage_task.php";
    }

        catch(error){
        
            console.error(error);
            
            alert(
            "Error adding task"
            );
        }
});