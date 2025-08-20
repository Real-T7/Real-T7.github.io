window.addEventListener("DOMContentLoaded", function() {
  const bannedNames = ["T7", "S-762", "S-575"];
  const username = localStorage.getItem("account-username");

  if (bannedNames.includes(username)) {
    localStorage.removeItem("account-username");
  }

  const usernameToDisplay = localStorage.getItem("account-username") || "stranger";

  const path = window.location.pathname;
  const isMainPage = (path === "/" || path.endsWith("/index.html"));

  if (isMainPage) {
    const hasVisited = localStorage.getItem("visited") === "true";
    const div = document.querySelector(".current-account");

    if (div) {
      if (!hasVisited) {
        div.innerHTML = `welcome, <span class="current-username">${usernameToDisplay}</span>!`;
      } else {
        div.innerHTML = `welcome back, <span class="current-username">${usernameToDisplay}</span>!`;
      }
    }
  } else {
    const usernameElements = document.querySelectorAll(".current-username");
    usernameElements.forEach(element => {
      element.textContent = usernameToDisplay;
    });
  }
});