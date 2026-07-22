import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let allStaff = [];

// =========================
// LOAD STAFF
// =========================

async function loadStaff() {
    const table = document.getElementById("staffTable");
    try {
        const snapshot = await getDocs(collection(db, "users"));
        allStaff = [];
        snapshot.forEach((document) => {
            const data = document.data();
            allStaff.push({
                id: document.id,
                ...data
            });
        });
        displayStaff(allStaff);
    }
    catch (error) {
        console.error("Error loading staff:", error);
        table.innerHTML = `
            <tr>
                <td colspan="7">
                    Failed to load staff.
                </td>
            </tr>
        `;
    }

}

// =========================
// DISPLAY STAFF
// =========================

function displayStaff(data) {

    const table = document.getElementById("staffTable");

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No staff found.
                </td>
            </tr>
        `;

        return;
    }

    data.forEach((users) => {

        table.innerHTML += `

            <tr>
                <td>${users.staff_id ?? "-"}</td>
                <td>${users.display_name ?? "-"}</td>
                <td>${users.email ?? "-"}</td>
                <td>${users.department_name ?? "-"}</td>
                <td>${users.position ?? "-"}</td>
                <td>
                    <span class="status active">
                        Active
                    </span>
                </td>
                <td>
                    <button
                        class="action-btn edit"
                        data-id="${users.id}"
                    >
                        Edit
                    </button>

                    <button
                        class="action-btn delete"
                        data-id="${users.id}"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
    addDeleteEvent();
}

// =========================
// DELETE STAFF
// =========================

function addDeleteEvent() {

    const buttons = document.querySelectorAll(".delete-btn");

    buttons.forEach((button) => {

        button.addEventListener("click", async () => {

            const confirmDelete = confirm("Delete this staff?");

            if (!confirmDelete) return;

            try {

                await deleteDoc(
                    doc(db, "users", button.dataset.id)
                );

                loadStaff();

            }

            catch (error) {

                console.error(error);

                alert("Failed to delete staff.");

            }

        });

    });

}

// =========================
// SEARCH
// =========================

document.getElementById("searchInput").addEventListener("input", filterStaff);

// =========================
// FILTER
// =========================

document.getElementById("departmentFilter").addEventListener("change", filterStaff);

function filterStaff() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const department = document
        .getElementById("departmentFilter")
        .value;

    const filtered = allStaff.filter((staff) => {

        const matchSearch =

            (staff.staff_id || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (staff.display_name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (staff.email || "")
                .toLowerCase()
                .includes(keyword);

        const matchDepartment =

            department === "all"

            ||

            staff.department_name === department;

        return matchSearch && matchDepartment;

    });

    displayStaff(filtered);

}

// =========================
// START
// =========================

loadStaff();