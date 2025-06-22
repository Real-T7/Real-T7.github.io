let timeout;

function isScreensaverEnabled() {
  const toggle = document.getElementById("screensaver-toggle");
  return toggle ? toggle.checked : true;
}

function resetTimer() {
  clearTimeout(timeout);

  if (!isScreensaverEnabled()) return;

  timeout = setTimeout(() => {
    window.location.href = "/html/games/screensaver/";
  }, 300000);
}

function setupInactivityTimer() {
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keydown", resetTimer);
  window.addEventListener("scroll", resetTimer);
  window.addEventListener("touchstart", resetTimer);

  const toggle = document.getElementById("screensaver-toggle");
  if (toggle) {
    toggle.addEventListener("change", resetTimer);
  }

  resetTimer();
}

window.onload = setupInactivityTimer;