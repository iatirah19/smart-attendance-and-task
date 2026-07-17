<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Profile - Work Pulse</title>
    <link rel="stylesheet" href="edit_profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>

<body>

<div class="container">

    <!-- Back Button -->
    <div class="top-bar">
        <button class="back-btn" onclick="window.location.href='profile.php'">
            <i class="fas fa-arrow-left"></i>
            Back
        </button>
    </div>

    <!-- Profile Card -->
    <div class="card">

        <h2>Edit Profile</h2>

        <!-- Profile Image -->
        <div class="image-section">

            <img
                id="profileImage"
                src="https://ui-avatars.com/api/?name=Admin"
                alt="Profile">

            <input
                type="file"
                id="profilePhoto"
                accept="image/*">

        </div>

        <!-- Profile Form -->

        <div class="form-group">
            <label>Display Name</label>
            <input type="text" id="display_name">
        </div>

        <div class="form-group">
            <label>Username</label>
            <input type="text" id="username" readonly>
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" id="email" readonly>
        </div>

        <div class="form-group">
            <label>Gender</label>

            <select id="gender">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

        </div>

        <div class="form-group">
            <label>Phone Number</label>
            <input type="text" id="phone_number">
        </div>

        <div class="form-group">
            <label>Department</label>
            <input type="text" id="department_name" readonly>
        </div>

        <div class="form-group">
            <label>Position</label>
            <input type="text" id="position" readonly>
        </div>

        <button class="save-btn" onclick="saveChanges()">
            <i class="fas fa-save"></i>
            Save Changes
        </button>

    </div>

</div>

<script type="module" src="edit_profile.js"></script>

</body>

</html>