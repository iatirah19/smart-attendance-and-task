import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";


import { 
getFirestore,
collection,
getDocs,
query,
orderBy,
deleteDoc,
doc
} 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";




// FIREBASE CONFIG

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_AUTH_DOMAIN",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_STORAGE_BUCKET",

messagingSenderId: "YOUR_MESSAGING_ID",

appId: "YOUR_APP_ID"

};




// INIT FIREBASE

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);




let taskData = [];



const table = document.getElementById("taskTable");

const searchInput = document.getElementById("searchTask");

const departmentFilter = document.getElementById("departmentFilter");

const statusFilter = document.getElementById("statusFilter");





// LOAD TASK

async function loadTask(){


taskData=[];


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







// DISPLAY TASK

function displayTask(data){


table.innerHTML="";


let no=1;



data.forEach(task=>{


let statusClass="";



if(task.status=="Pending"){

statusClass="pending";

}

else if(task.status=="In Progress"){

statusClass="progress";

}

else if(task.status=="Completed"){

statusClass="completed";

}





table.innerHTML += `


<tr>


<td>${no++}</td>


<td>${task.title ?? "-"}</td>


<td>${task.department_name ?? "-"}</td>


<td>${task.assigned_to ?? "-"}</td>


<td>${task.due_date ?? "-"}</td>



<td>

<span class="status ${statusClass}">

${task.status ?? "-"}

</span>

</td>



<td class="action-buttons">


<button class="view-btn"
onclick="viewTask('${task.id}')">

<i class="fas fa-eye"></i>

</button>



<button class="edit-btn">

<i class="fas fa-pen"></i>

</button>



<button class="delete-btn"
onclick="deleteTask('${task.id}')">

<i class="fas fa-trash"></i>

</button>


</td>


</tr>


`;


});


}







// SEARCH FILTER

function filterTask(){


let search =
searchInput.value.toLowerCase();



let department =
departmentFilter.value;



let status =
statusFilter.value;



let filtered = taskData.filter(task=>{


return (

(task.title ?? "")
.toLowerCase()
.includes(search)

&&

(
department=="all" ||
task.department_name==department
)


&&

(
status=="all" ||
task.status==status
)


);


});



displayTask(filtered);


}





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






// DELETE TASK

window.deleteTask = async function(id){


if(confirm("Delete this task?")){


await deleteDoc(
doc(db,"tasks",id)
);



alert("Task deleted successfully");


loadTask();


}


};






// VIEW TASK

window.viewTask=function(id){


window.location.href =
"task_details.php?id="+id;


};







loadTask();