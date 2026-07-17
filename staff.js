console.log("staff.js loaded");

import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


let allStaff = [];


// LOAD STAFF
async function loadStaff(){

    try{

        const snapshot = await getDocs(
            collection(db,"users")
        );


        allStaff = [];


        snapshot.forEach((item)=>{


            const data = item.data();


            // ambil staff sahaja
            if(data.role === "Staff"){


                allStaff.push({

                    id: item.id,

                    staff_id: data.staff_id ?? "-",

                    display_name: data.display_name ?? "-",

                    email: data.email ?? "-",

                    department_name: data.department_name ?? "-",

                    position: data.position ?? "-"

                });


            }


        });



        console.log("Staff List:", allStaff);


        displayStaff(allStaff);


    }
    catch(error){

        console.error(
            "Error loading staff:",
            error
        );

    }

}



// DISPLAY STAFF TABLE
function displayStaff(staffList){


    const table =
    document.getElementById("staffTable");


    if(!table) return;


    table.innerHTML = "";


    if(staffList.length === 0){

        table.innerHTML = `

        <tr>

            <td colspan="7"
            style="text-align:center">

                No staff record found

            </td>

        </tr>

        `;

        return;

    }



    staffList.forEach((staff)=>{


        table.innerHTML += `

        <tr>

            <td>
                ${users.staff_id ?? "-"}
            </td>


            <td>
                ${users.display_name ?? "-"}
            </td>


            <td>
                ${users.email ?? "-"}
            </td>


            <td>
                ${users.department_name ?? "-"}
            </td>


            <td>
                ${users.position ?? "-"}
            </td>


            <td>

                <span class="status active">
                    Active
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


    addActionEvents();


}



// SEARCH STAFF
const searchInput =
document.getElementById("searchInput");


if(searchInput){


    searchInput.addEventListener(
    "keyup",
    ()=>{


        const keyword =
        searchInput.value.toLowerCase();



        const filtered =
        allStaff.filter((staff)=>{


            return (

                staff.display_name
                ?.toLowerCase()
                .includes(keyword)


                ||

                staff.staff_id
                ?.toLowerCase()
                .includes(keyword)


                ||

                staff.email
                ?.toLowerCase()
                .includes(keyword)


                ||

                staff.department_name
                ?.toLowerCase()
                .includes(keyword)

            );


        });



        displayStaff(filtered);


    });


}



// FILTER DEPARTMENT
const departmentFilter =
document.getElementById("departmentFilter");


if(departmentFilter){


    departmentFilter.addEventListener(
    "change",
    ()=>{


        const value =
        departmentFilter.value;



        if(value === "all"){


            displayStaff(allStaff);


        }
        else{


            const filtered =
            allStaff.filter(
                staff =>
                staff.department_name === value
            );


            displayStaff(filtered);


        }


    });


}



// BUTTON ACTION
function addActionEvents(){



    // DELETE

    document.querySelectorAll(".delete")
    .forEach(button=>{


        button.onclick = async()=>{


            const id =
            button.dataset.id;



            if(confirm("Delete this staff?")){


                await deleteDoc(
                    doc(db,"users",id)
                );


                loadStaff();


            }


        };


    });



    // VIEW

    document.querySelectorAll(".view")
    .forEach(button=>{


        button.onclick = ()=>{


            const staff =
            allStaff.find(
                item =>
                item.id === button.dataset.id
            );



            alert(`

Name: ${staff.display_name}

Staff ID: ${staff.staff_id}

Email: ${staff.email}

Department: ${staff.department_name}

Position: ${staff.position}

            `);


        };


    });



    // EDIT

    document.querySelectorAll(".edit")
    .forEach(button=>{


        button.onclick = ()=>{


            alert(
                "Open Edit Staff Form"
            );


        };


    });


}



// START
loadStaff();