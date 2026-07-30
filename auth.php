<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Work Pulse</title>
    <link rel="stylesheet" href="CSS/auth.css">
</head>

<body>

<div class="container">

    <div class="left-panel">
        <h1>Smart Attendance</h1>

        <p>
            Admin Portal<br>
            Manage attendance, tasks and employees efficiently.
        </p>
    </div>

    <div class="right-panel">

        <!-- LOGIN FORM -->
        <div class="form active" id="loginForm">

            <h2>Admin Login</h2>

            <div class="input-box">
                <input type="email" id="loginEmail" placeholder="Email">
            </div>

            <div class="input-box password-box">
                <input type="password" id="loginPassword" placeholder="Password">

                <span onclick="showPassword('loginPassword')">
                    👁
                </span>
            </div>

            <button onclick="login()">
                Login
            </button>

            <p class="switch">
                Don't have account?
                <a onclick="showRegister()">Register</a>
            </p>

        </div>


        <!-- REGISTER FORM -->
        <div class="form" id="registerForm">

            <h2>Create Admin Account</h2>

            <div class="input-box">
                <input type="text" id="display_name" placeholder="Display Name">
            </div>

            <div class="input-box">
                <input type="text" id="username" placeholder="Username">
            </div>

            <div class="input-box">
                <input type="email" id="email" placeholder="Email">
            </div>

            <div class="input-box">
                <input type="text" id="phone_number" placeholder="Phone Number">
            </div>

            <div class="input-box">
                <select id="gender">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div class="input-box">
                <input 
                    type="text"
                    id="department_name"
                    name="department"
                    value="Administrator"
                    readonly>
            </div>

            <div class="input-box password-box">
                <input type="password" id="password" placeholder="Password">

                <span onclick="showPassword('password')">
                    👁
                </span>
            </div>

            <div class="input-box">
                <input type="password" id="confirmPassword" placeholder="Confirm Password">
            </div>

            <button onclick="register()">
                Register
            </button>

            <p class="switch">
                Already have account?
                <a onclick="showLogin()">Login</a>
            </p>

        </div>

        <p id="message"></p>

    </div>

</div>

<script type="module" src="JS/auth.js"></script>

</body>

</html>