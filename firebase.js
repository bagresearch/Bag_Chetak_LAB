// Paste your Firebase config below. Then this file will initialize firebase and export `auth`.
// Create a Firebase web app in console.firebase.google.com and copy the config object into the firebaseConfig below.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize (compat)
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  // expose auth to global so auth.js can use it
  window.auth = auth;
} else {
  console.warn('Firebase not loaded or already initialized.');
}
