<?php
require_once '../config.php';
requireAdminLogin();

// Check session timeout (30 minutes)
if (time() - $_SESSION['login_time'] > 1800) {
    session_destroy();
    header('Location: login.php');
    exit();
}

// Update last activity
$_SESSION['login_time'] = time();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Admin Dashboard</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <button class="admin-button logout-button" onclick="window.location.href='logout.php'">Secure Logout</button>
    
    <div class="dashboard">
        <h1>Secure Admin Dashboard</h1>
        <p>Logged in as: <?php echo htmlspecialchars(ADMIN_EMAIL); ?></p>
        <p>Session IP: <?php echo htmlspecialchars($_SESSION['admin_ip']); ?></p>
        
        <div class="admin-panel">
            <div class="panel-card">
                <h3>🔒 Secure Content Management</h3>
                <p>All actions are server-side validated and secure.</p>
                <button class="admin-button" onclick="alert('This would connect to secure content management system')">Manage Content</button>
            </div>
            
            <div class="panel-card">
                <h3>🛡️ Security Features</h3>
                <ul>
                    <li>CSRF Protection: ✅</li>
                    <li>Session Hijacking Protection: ✅</li>
                    <li>IP Validation: ✅</li>
                    <li>User Agent Validation: ✅</li>
                    <li>Session Timeout: ✅</li>
                    <li>Password Hashing: ✅</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
