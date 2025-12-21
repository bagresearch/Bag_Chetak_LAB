<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'portfolio_admin');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');

// Admin credentials (hashed)
define('ADMIN_EMAIL', 'saswata@bagresearch.co.in');
define('ADMIN_PASS_HASH', password_hash('your_secure_password', PASSWORD_BCRYPT));

// Session security
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 1); // Use only with HTTPS

session_start();

function isAdminLoggedIn() {
    return isset($_SESSION['admin_logged_in']) && 
           $_SESSION['admin_logged_in'] === true &&
           isset($_SESSION['admin_ip']) && 
           $_SESSION['admin_ip'] === $_SERVER['REMOTE_ADDR'] &&
           isset($_SESSION['admin_user_agent']) && 
           $_SESSION['admin_user_agent'] === $_SERVER['HTTP_USER_AGENT'];
}

function requireAdminLogin() {
    if (!isAdminLoggedIn()) {
        header('Location: login.php');
        exit();
    }
}

function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function validateCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
?>
