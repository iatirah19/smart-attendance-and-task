import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    updateDoc,
    doc,
    Timestamp
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// =========================
// ELEMENTS
// =========================

const form = document.getElementById("taskForm");

const departmentDropdown =
document.getElementById("departmentDropdown");

const staffDropdown =
document.getElementById("assigned_to");


// =========================
// LOAD STAFF BY DEPARTMENT
// =========================

departmentDropdown.addEventListener("change", async () => {

    const selectedDepartment =
    departmentDropdown.value;

    staffDropdown.innerHTML =
    `
    <option value="">
        Loading staff...
    </option>
    `;

    if (selectedDepartment === "") {

        staffDropdown.innerHTML =
        `
        <option value="">
            Select Department First
        </option>
        `;

        return;
    }

    try {

        const snapshot = await getDocs(
            collection(db, "users")
        );

        staffDropdown.innerHTML =
        `
        <option value="">
            Select Staff
        </option>
        `;

        snapshot.forEach((userDoc) => {

            const user = userDoc.data();

            if (
                selectedDepartment === "all" ||
                user.department_name === selectedDepartment
            ) {

                const option =
                document.createElement("option");

                // Simpan document id user
                option.value = user.display_name;
                option.textContent = user.display_name;

                staffDropdown.appendChild(option);

            }

        });

        if (staffDropdown.options.length === 1) {

            staffDropdown.innerHTML =
            `
            <option value="">
                No staff found
            </option>
            `;

        }

    }

    catch (error) {

        console.error(
            "Error loading staff:",
            error
        );

        staffDropdown.innerHTML =
        `
        <option value="">
            Failed to load staff
        </option>
        `;

    }

});


// =========================
// ADD TASK
// =========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const customTaskId =
        document.getElementById("task_id").value;

        const docRef = await addDoc(

            collection(db, "tasks"),

            {
                task_id:
                customTaskId,

                title:
                document.getElementById("title").value,

                description:
                document.getElementById("description").value,

                assigned_to:
                staffDropdown.value,

                department_name:
                departmentDropdown.value,

                due_date:
                Timestamp.fromDate(
                    new Date(
                        document.getElementById("due_date").value
                    )
                ),

                status:
                document.getElementById("status").value,

                created_at:
                serverTimestamp()

            }

        );

        alert("Task added successfully!");

        window.location.href =
        "task.php";

    }

    catch (error) {

        console.error(
            "Error adding task:",
            error
        );

        alert("Error adding task.");

    }

});