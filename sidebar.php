<?php
$currentPage = basename($_SERVER['PHP_SELF']);
?>

<aside class="sidebar" id="sidebar">

    <button class="close-btn" id="closeBtn">
        <i class="fa-solid fa-xmark"></i>
    </button>

    <h2>Smart Attendance</h2>

    <nav>

        <a href="dashboard.php"
            class="<?= ($currentPage == 'dashboard.php') ? 'active' : '' ?>">
            🏠 Dashboard
        </a>

        <a href="task.php"
            class="<?= ($currentPage == 'task.php') ? 'active' : '' ?>">
            📋 Manage Tasks
        </a>

        <a href="announcement.php"
            class="<?= ($currentPage == 'announcement.php') ? 'active' : '' ?>">
            📢 Announcement
        </a>

        <a href="staff.php"
            class="<?= ($currentPage == 'staff.php') ? 'active' : '' ?>">
            👥 Staff
        </a>

        <a href="attendance.php"
            class="<?= ($currentPage == 'attendance.php') ? 'active' : '' ?>">
            🕒 Attendance
        </a>

        <a href="profile.php"
            class="<?= ($currentPage == 'profile.php') ? 'active' : '' ?>">
            ⚙ Profile
        </a>

        <a href="logout.php">
            🚪 Logout
        </a>

    </nav>

</aside>

<div class="overlay" id="overlay"></div>


<script>

document.addEventListener("DOMContentLoaded", function(){

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    const toggleBtn = document.getElementById("toggleBtn");
    const closeBtn = document.getElementById("closeBtn");


    // Open sidebar
    if(toggleBtn){

        toggleBtn.addEventListener("click", function(){

            sidebar.classList.add("active");
            overlay.classList.add("active");

        });

    }


    // Close sidebar using X button
    if(closeBtn){

        closeBtn.addEventListener("click", function(){

            sidebar.classList.remove("active");
            overlay.classList.remove("active");

        });

    }


    // Close when click outside
    overlay.addEventListener("click", function(){

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    });


});

</script>