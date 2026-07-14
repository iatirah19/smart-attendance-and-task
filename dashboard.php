<?php

// Data sementara
// nanti tukar kepada Firestore
$totalStaff = 0;
$presentToday = 0;
$leaveToday = 0;

$officeMode = 0;
$wfhMode = 0;
$leaveMode = 0;

?>


<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Admin Dashboard - Work Pulse</title>

    <link rel="stylesheet" href="dashboard.css">
    <link rel="stylesheet" href="sidebar.css">

    <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

</head>


<body>


<div class="dashboard-container" 
     id="dashboardContent" 
     style="display:none;">


    <!-- Sidebar -->
    <?php include 'sidebar.php'; ?>



    <main class="main-content">


        <button class="menu-toggle" id="toggleBtn">
            <i class="fas fa-bars"></i>
        </button>



        <div class="welcome">

            <h1>
                Welcome, 
                <span id="adminName">
                    Admin
                </span>
                ! 👋
            </h1>


            <p>
                Manage your employees, attendance and tasks efficiently.
            </p>


        </div>





        <!-- Statistic Cards -->

        <div class="cards">


            <div class="card">

                <div class="icon">
                    👥
                </div>


                <div>

                    <h3>
                        Total Staff
                    </h3>


                    <h1>
                        <?php echo $totalStaff; ?>
                    </h1>


                    <p>
                        Active Employees
                    </p>


                </div>


            </div>






            <div class="card">

                <div class="icon">
                    🕒
                </div>


                <div>


                    <h3>
                        Today's Attendance
                    </h3>



                    <div class="attendance-status">


                        <span>
                            Present
                            <b>
                                <?php echo $presentToday; ?>
                            </b>
                        </span>



                        <span>
                            Leave
                            <b>
                                <?php echo $leaveToday; ?>
                            </b>
                        </span>



                    </div>



                </div>


            </div>



        </div>







        <!-- Work Mode -->

        <div class="section">


            <h2>
                Today's Work Mode
            </h2>



            <div class="work-mode">


                <div>
                    🏢 Office

                    <strong>
                        <?php echo $officeMode; ?>
                    </strong>

                </div>



                <div>

                    🏠 WFH

                    <strong>
                        <?php echo $wfhMode; ?>
                    </strong>


                </div>




                <div>

                    🏖 Leave

                    <strong>
                        <?php echo $leaveMode; ?>
                    </strong>


                </div>



            </div>


        </div>

        <!-- Announcement -->
        <div class="section">
            <div class="section-header">
                <h2>
                    📢 Latest Announcement
                </h2>

                <a href="announcement.php">
                    View All
                </a>
            </div>

            <div id="announcementList">
                <p>
                    Loading announcement...
                </p>
            </div>
        </div>



    </main>


</div>





<script type="module" src="dashboard.js"></script>


</body>

</html>