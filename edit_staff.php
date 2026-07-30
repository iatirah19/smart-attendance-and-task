<?php
$id = $_GET['id'] ?? "";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Staff - Work Pulse</title>
    <link rel="stylesheet" href="CSS/edit_staff.css">
</head>

<body>

<div class="container">

    <h2>Edit Staff</h2>

    <form id="editStaffForm">

        <input type="hidden" id="docId" value="<?php echo htmlspecialchars($id); ?>">

        <div class="form-group">
            <label>Staff ID</label>
            <input type="text" id="staff_id">
        </div>

        <div class="form-group">
            <label>Name</label>
            <input type="text" id="display_name">
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" id="email">
        </div>

        <div class="form-group">
            <label>Department</label>
            <input type="text" id="department_name">
        </div>

        <div class="form-group">
            <label>Position</label>
            <input type="text" id="position">
        </div>

        <div class="form-group">
            <label>Status</label>
            <select id="status">
                <option value="Active">Active</option>
                <option value="Resign">Resign</option>
            </select>
        </div>

        <div class="buttons">
            <button type="submit" class="save-btn">
                Save Changes
            </button>

            <button
                type="button"
                class="cancel-btn"
                onclick="window.location='staff.php'"
            >
                Cancel
            </button>
        </div>

        

    </form>

</div>

<script type="module" src="JS/edit_staff.js"></script>

</body>
</html>