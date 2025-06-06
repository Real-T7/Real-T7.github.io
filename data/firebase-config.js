// Firebase App (the core Firebase SDK)
import {} from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-app-compat.js'

//Firebase Realtime Database SDK
import {} from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-database-compat.js'

const firebaseConfig = {
  apiKey: "AIzaSyCiIQr2VpfkBgKNiJwiSQW8ivOSZ9t0lnw",
  authDomain: "t7-github.firebaseapp.com",
  databaseURL: "https://t7-github-default-rtdb.firebaseio.com",
  projectId: "t7-github",
  storageBucket: "t7-github.firebasestorage.app",
  messagingSenderId: "560364753472",
  appId: "1:560364753472:web:4d274d57c93643764785a5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();