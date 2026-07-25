import { auth, db, storage } from "./firebase-config.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


// ELEMENTS
const profilePhoto = document.getElementById("profilePhoto");
const profileImage = document.getElementById("profileImage");

const displayName = document.getElementById("display_name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const phone = document.getElementById("phone_number");
const department = document.getElementById("department_name");
const position = document.getElementById("position");

let currentUID = "";
let selectedFile = null;


// IMAGE PREVIEW
profilePhoto.addEventListener("change", (e) => {

    selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        profileImage.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);

});


// LOAD USER
onAuthStateChanged(auth, async(user) => {

    if (!user) {
        window.location.href = "auth.php";
        return;
    }

    currentUID = user.uid;
    console.log("Logged UID:", user.uid);

    try {

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            alert("User not found.");
            return;
        }

        const data = userSnap.data();

        displayName.value = data.display_name || "";
        username.value = data.username || "";
        email.value = data.email || user.email;
        gender.value = data.gender || "";
        phone.value = data.phone_number || "";
        department.value = data.department_name || "";
        position.value = data.position || "";

        if (data.photo_url) {

            profileImage.src = data.photo_url;

        } else {

            const name = encodeURIComponent(data.display_name || "Admin");

            profileImage.src =
            `https://ui-avatars.com/api/?name=${name}&background=424F76&color=ffffff&size=200`;

        }

    } catch(error) {

        console.error(error);
        alert("Failed to load profile.");

    }

});


// SAVE PROFILE
window.saveChanges = async function() {

    if (displayName.value.trim() === "") {

        alert("Display Name is required.");
        return;

    }

    try {

        const userRef = doc(db, "users", currentUID);

        let updateData = {
            display_name: displayName.value.trim(),
            gender: gender.value,
            phone_number: phone.value.trim()
        };


        if (selectedFile) {

            const imageRef = ref(
                storage,
                `users/${currentUID}/profile/${selectedFile.name}`
            );

            await uploadBytes(imageRef, selectedFile);

            const photoURL = await getDownloadURL(imageRef);

            updateData.photo_url = photoURL;

        }


        await updateDoc(userRef, updateData);

        alert("Profile updated successfully!");

        window.location.href = "profile.php";


    } catch(error) {

        console.error(error);
        alert("Failed to update profile.");

    }

};