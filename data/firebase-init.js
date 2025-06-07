// Load Firebase compat SDKs dynamically
const loadFirebaseScripts = async () => {
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = resolve;
  script.onerror = reject;
  document.head.appendChild(script);
  });
};

// Load core and database SDKs
await loadScript('https://www.gstatic.com/firebasejs/11.9.0/firebase-app-compat.js');
await loadScript('https://www.gstatic.com/firebasejs/11.9.0/firebase-database-compat.js');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCiIQr2VpfkBgKNiJwiSQW8ivOSZ9t0lnw",
  authDomain: "t7-github.firebaseapp.com",
  databaseURL: "https://t7-github-default-rtdb.firebaseio.com",
  projectId: "t7-github",
  storageBucket: "t7-github.firebasestorage.app",
  messagingSenderId: "560364753472",
  appId: "1:560364753472:web:4d274d57c93643764785a5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
window.db = firebase.database(); // Make globally available
console.log("Firebase initialized.");
};

// Run it
loadFirebaseScripts().catch(console.error);