/* ===================================
   FIREBASE IMPORT
=================================== */

import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


/* ===================================
   LOAD STAFF
=================================== */

const staffContainer = document.querySelector(".main-content");


let allStaff = [];


async function loadStaff(){

    try{

        const querySnapshot = await getDocs(
            collection(db,"users")
        );


        allStaff = [];


        querySnapshot.forEach((item)=>{

            const data = item.data();


            // hanya ambil staff sahaja
            if(data.role === "staff"){

                allStaff.push({

                    id:item.id,
                    ...data

                });

            }


        });


        displayStaff(allStaff);


    }

    catch(error){

        console.error(
            "Error loading staff:",
            error
        );

    }

}



/* ===================================
   DISPLAY STAFF BY DEPARTMENT
=================================== */

function displayStaff(staffList){


    const tableArea = document.querySelector(
        ".staff-list"
    );


    if(!tableArea) return;


    tableArea.innerHTML = "";


    const departmentGroup = {};


    staffList.forEach(staff=>{


        const department =
        staff.department || "No Department";


        if(!departmentGroup[department]){

            departmentGroup[department]=[];

        }


        departmentGroup[department].push(staff);


    });



    Object.keys(departmentGroup).forEach(department=>{


        let rows="";


        departmentGroup[department]
        .forEach(staff=>{


            rows += `

            <tr>

                <td>${staff.staff_id ?? "-"}</td>

                <td>${staff.name ?? "-"}</td>

                <td>${staff.position ?? "-"}</td>

                <td>${staff.email ?? "-"}</td>


                <td>

                    <span class="status ${staff.status}">

                        ${staff.status ?? "Inactive"}

                    </span>

                </td>


                <td>


                    <button 
                    class="action-btn view"
                    data-id="${staff.id}">

                        <i class="fas fa-eye"></i>

                    </button>


                    <button 
                    class="action-btn edit"
                    data-id="${staff.id}">

                        <i class="fas fa-edit"></i>

                    </button>


                    <button 
                    class="action-btn delete"
                    data-id="${staff.id}">

                        <i class="fas fa-trash"></i>

                    </button>


                </td>


            </tr>

            `;


        });



        tableArea.innerHTML += `


        <div class="department-section">


            <div class="department-title">


                <h2>
                    ${department}
                </h2>


                <span class="staff-count">

                    ${departmentGroup[department].length}
                    Staff

                </span>


            </div>



            <div class="table-card">


                <table>


                <thead>

                    <tr>

                        <th>Staff ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>



                <tbody>

                    ${rows}

                </tbody>


                </table>


            </div>


        </div>


        `;


    });



    addActionEvents();

}



/* ===================================
   SEARCH STAFF
=================================== */


const searchInput =
document.getElementById("searchInput");


if(searchInput){


searchInput.addEventListener(
"keyup",
()=>{


    const keyword =
    searchInput.value.toLowerCase();


    const filtered =
    allStaff.filter(staff=>{


        return (

        staff.name
        ?.toLowerCase()
        .includes(keyword)

        ||

        staff.staff_id
        ?.toLowerCase()
        .includes(keyword)

        ||

        staff.department
        ?.toLowerCase()
        .includes(keyword)

        );


    });



    displayStaff(filtered);


});


}



/* ===================================
   FILTER DEPARTMENT
=================================== */


const departmentFilter =
document.getElementById(
"departmentFilter"
);



if(departmentFilter){


departmentFilter.addEventListener(
"change",
()=>{


    const value =
    departmentFilter.value;



    if(value==="all"){

        displayStaff(allStaff);

    }

    else{


        const filtered =
        allStaff.filter(
        staff =>
        staff.department === value
        );


        displayStaff(filtered);


    }



});


}



/* ===================================
   BUTTON ACTION
=================================== */


function addActionEvents(){


document.querySelectorAll(".delete")
.forEach(button=>{


button.onclick = async()=>{


    const id =
    button.dataset.id;



    if(confirm(
    "Delete this staff?"
    )){


        await deleteDoc(
            doc(db,"users",id)
        );


        loadStaff();


    }


};


});



document.querySelectorAll(".view")
.forEach(button=>{


button.onclick=()=>{


    const id =
    button.dataset.id;


    const staff =
    allStaff.find(
    item=>item.id===id
    );


    alert(
    `
    Name: ${staff.name}
    Staff ID: ${staff.staff_id}
    Department: ${staff.department}
    Position: ${staff.position}
    `
    );


};


});



document.querySelectorAll(".edit")
.forEach(button=>{


button.onclick=()=>{


    alert(
    "Open Edit Staff Form"
    );


};


});


}




/* ===================================
   START
=================================== */


loadStaff();