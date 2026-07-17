import { auth, db } from "./firebase-config.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// ==============================
// HTML ELEMENTS
// ==============================

const profileImage = document.getElementById("profileImage");

const displayName = document.getElementById("displayName");

const username = document.getElementById("username");

const email = document.getElementById("email");

const gender = document.getElementById("gender");

const phone = document.getElementById("phone");

const department = document.getElementById("department");

const position = document.getElementById("position");

const position2 = document.getElementById("position2");


// ==============================
// AUTH
// ==============================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "auth.php";
        return;

    }

    try {

        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {

            alert("User profile not found.");
            return;

        }

        const data = docSnap.data();

        // ==============================
        // DISPLAY DATA
        // ==============================

        displayName.textContent =
            data.display_name || "No Name";

        username.textContent =
            data.username || "-";

        email.textContent =
            data.email || user.email;

        gender.textContent =
            data.gender || "-";

        phone.textContent =
            data.phone_number || "-";

        department.textContent =
            data.department_name || "-";

        position.textContent =
            data.position || "-";

        position2.textContent =
            data.position || "-";


        // ==============================
        // PROFILE PHOTO
        // ==============================

        if (data.photo_url && data.photo_url.trim() !== "") {

            profileImage.src = data.photo_url;

        } else {

            const name = encodeURIComponent(
                data.display_name || "Admin"
            );

            profileImage.src =
                `https://ui-avatars.com/api/?name=${name}&background=424F76&color=fff&size=200`;

        }

    } catch (error) {

        console.error(error);

        alert("Failed to load profile.");

    }

});