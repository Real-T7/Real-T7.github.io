      let timeout;

      function resetTimer() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          window.location.href = "/html/games/screensaver/";
        }, 300000);
      }

      function setupInactivityTimer() {
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("scroll", resetTimer);
        window.addEventListener("touchstart", resetTimer);

        resetTimer();
      }

      window.onload = setupInactivityTimer;