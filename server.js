const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();

// Security middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-super-secret-session-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: true, // Use only with HTTPS
        httpOnly: true,
        maxAge: 30 * 60 * 1000 // 30 minutes
    }
}));
app.use(csrf());

// Admin credentials (should be in database in production)
const ADMIN_CREDENTIALS = {
    email: 'saswata@bagresearch.co.in',
    passwordHash: bcrypt.hashSync('your_secure_password', 10)
};

// Secure login route
app.post('/admin/login', (req, res) => {
    const { email, password } = req.body;
    
    if (email === ADMIN_CREDENTIALS.email && bcrypt.compareSync(password, ADMIN_CREDENTIALS.passwordHash)) {
        req.session.adminLoggedIn = true;
        req.session.adminIp = req.ip;
        req.session.adminUserAgent = req.get('User-Agent');
        res.redirect('/admin/dashboard');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Secure dashboard route
app.get('/admin/dashboard', requireAdminAuth, (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Secure Dashboard</title></head>
        <body>
            <h1>Secure Admin Dashboard</h1>
            <p>Logged in securely with server-side validation</p>
            <a href="/admin/logout">Logout</a>
        </body>
        </html>
    `);
});

// Admin authentication middleware
function requireAdminAuth(req, res, next) {
    if (req.session.adminLoggedIn && 
        req.session.adminIp === req.ip && 
        req.session.adminUserAgent === req.get('User-Agent')) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

app.listen(3000, () => console.log('Secure server running on port 3000'));
