<?php
$task_id = $_GET['id'] ?? "";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Details - Work Pulse</title>
    <link rel="stylesheet" href="CSS/task_details.css">
</head>

<body>

    <div class="container">

        <h1>Task Details</h1>

        <div class="task-card">

            <h2 id="taskTitle">Loading...</h2>

            <div class="task-info">

                <p>
                    <strong>Description:</strong>
                    <span id="description">-</span>
                </p>

                <p>
                    <strong>Department:</strong>
                    <span id="department">-</span>
                </p>

                <p>
                    <strong>Assigned To:</strong>
                    <span id="assigned">-</span>
                </p>

                <p>
                    <strong>Due Date:</strong>
                    <span id="dueDate">-</span>
                </p>

                <p>
                    <strong>Status:</strong>
                    <span id="status">-</span>
                </p>

            </div>

        </div>


        <div class="updates-section">

            <h2>Staff Updates</h2>

            <div id="updatesContainer" class="updates-card">
                Loading updates...
            </div>

        </div>


    </div>


    <input 
        type="hidden" 
        id="taskId"
        value="<?php echo htmlspecialchars($task_id); ?>"
    >


    <script type="module" src="JS/task_details.js"></script>

</body>

</html>