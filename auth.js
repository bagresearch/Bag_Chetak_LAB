// Frontend auth glue for Firebase (compat). Works on all pages that include firebase.js + this file.
// Handles register/login/logout and protects dashboard.

function showError(err){
  console.error(err);
  alert(err && err.message ? err.message : String(err));
}

// REGISTER
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value.trim();
    const pw = document.getElementById('regPassword').value;
    const pw2 = document.getElementById('regPassword2').value;
    if (pw !== pw2) return showError({message: 'Passwords do not match.'});
    try {
      await auth.createUserWithEmailAndPassword(email, pw);
      // simple animated success
      window.location.href = 'dashboard.html';
    } catch(err){ showError(err) }
  });
}

// LOGIN
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const pw = document.getElementById('password').value;
    try {
      await auth.signInWithEmailAndPassword(email, pw);
      // animate then redirect
      document.querySelector('.auth-card').style.transform = 'translateY(-6px)';
      setTimeout(()=> window.location.href = 'dashboard.html', 350);
    } catch(err){ showError(err) }
  });
}

// LOGOUT
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(()=> window.location.href = 'login.html');
  });
}

// PROTECT DASHBOARD
if (window.location.pathname.includes('dashboard.html')) {
  const emailNode = document.getElementById('userEmail');
  auth.onAuthStateChanged(user => {
    if (!user) {
      // not logged in - redirect to login
      window.location.href = 'login.html';
    } else {
      emailNode.textContent = 'Signed in as: ' + user.email;
    }
  }, err => {
    console.error('auth change error', err);
    window.location.href = 'login.html';
  });
}
