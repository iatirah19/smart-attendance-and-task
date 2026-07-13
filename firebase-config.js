import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTeXfiOSdx9CHxwE87IQ7TGYT16mC7UIM",
  authDomain: "assignment-icm658.firebaseapp.com",
  projectId: "assignment-icm658",
  storageBucket: "assignment-icm658.firebasestorage.app",
  messagingSenderId: "165519317245",
  appId: "1:165519317245:web:86f362b549209f588dc694",
  measurementId: "G-VCF3KPCK7S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {
    auth,
    db
};