import { db } from "./firebase-config.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const id = document.getElementById("docId").value;

// =========================
// LOAD STAFF
// =========================

async function loadStaff() {

    try {

        const ref = doc(db, "users", id);

        const snap = await getDoc(ref);

        if (!snap.exists()) {

            alert("Staff not found.");

            window.location.href = "staff.php";

            return;

        }

        const data = snap.data();

        document.getElementById("staff_id").value =
            data.staff_id || "";

        document.getElementById("display_name").value =
            data.display_name || "";

        document.getElementById("email").value =
            data.email || "";

        document.getElementById("department_name").value =
            data.department_name || "";

        document.getElementById("position").value =
            data.position || "";
        
        document.getElementById("status").value =
            data.status || "Active";

    }

    catch (error) {

        console.error(error);

        alert("Failed to load staff.");

    }

}

// =========================
// SAVE
// =========================

document
.getElementById("editStaffForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        await updateDoc(doc(db, "users", id), {

            staff_id:
                document.getElementById("staff_id").value,

            display_name:
                document.getElementById("display_name").value,

            email:
                document.getElementById("email").value,

            department_name:
                document.getElementById("department_name").value,

            position:
                document.getElementById("position").value,


            status:
                document.getElementById("status").value
        });

        alert("Staff updated successfully.");

        window.location.href = "staff.php";

    }

    catch (error) {

        console.error(error);

        alert("Failed to update staff.");

    }

});

loadStaff();