const isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

if (!isDev) {
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

    // load Firebase SDKs
    await loadScript('https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js');
    await loadScript('https://www.gstatic.com/firebasejs/12.1.0/firebase-database-compat.js');

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

    firebase.initializeApp(firebaseConfig);
    window.db = firebase.database();

    // signal that Firebase is ready
    document.dispatchEvent(new Event("firebase-ready"));
  };

  loadFirebaseScripts().catch((err) => {
    console.error("failed to load Firebase scripts:", err);
  });
} else {
  console.warn("Firebase disabled in development mode.");
  // mock `db` so other code doesnt crash
  window.db = {
    ref: () => ({
      on: () => {},
      set: () => Promise.resolve(),
      transaction: (fn, cb) => cb(null, false, { val: () => 0 }),
      onDisconnect: () => ({ remove: () => {} }),
      push: () => ({
        set: () => {},
        onDisconnect: () => ({ remove: () => {} }),
      }),
    }),
  };

  // still fire the event so code continues
  document.dispatchEvent(new Event("firebase-ready"));
}