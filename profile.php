<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Profile - Work Pulse</title>
    <link rel="stylesheet" href="profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>

<body>

    <div class="profile-container">

        <!-- Back Button -->
        <div class="top-bar">
            <button class="back-btn" onclick="window.location.href='dashboard.php'">
                <i class="fas fa-arrow-left"></i>
                Back to Dashboard
            </button>
        </div>

        <!-- Profile Card -->
        <div class="profile-card">

            <div class="profile-header">

                <img
                    id="profileImage"
                    src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff&size=200"
                    alt="Profile">

                <h2 id="displayName">
                    Loading...
                </h2>

                <p id="position">
                    -
                </p>

            </div>

            <div class="profile-body">

                <div class="info-row">
                    <label>
                        <i class="fas fa-user"></i>
                        Username
                    </label>

                    <span id="username">
                        Loading...
                    </span>
                </div>

                <div class="info-row">
                    <label>
                        <i class="fas fa-envelope"></i>
                        Email
                    </label>

                    <span id="email">
                        Loading...
                    </span>
                </div>

                <div class="info-row">
                    <label>
                        <i class="fas fa-venus-mars"></i>
                        Gender
                    </label>

                    <span id="gender">
                        Loading...
                    </span>
                </div>

                <div class="info-row">
                    <label>
                        <i class="fas fa-phone"></i>
                        Phone Number
                    </label>

                    <span id="phone">
                        Loading...
                    </span>
                </div>

                <div class="info-row">
                    <label>
                        <i class="fas fa-building"></i>
                        Department
                    </label>

                    <span id="department">
                        Loading...
                    </span>
                </div>

                <div class="info-row">
                    <label>
                        <i class="fas fa-briefcase"></i>
                        Position
                    </label>

                    <span id="position2">
                        Loading...
                    </span>
                </div>

            </div>

            <div class="profile-footer">

                <button class="edit-btn" onclick="window.location.href='edit_profile.php'">
                    <i class="fas fa-user-edit"></i>
                    Edit Profile
                </button>

            </div>

        </div>

    </div>

    <script type="module" src="profile.js"></script>

</body>

</html>