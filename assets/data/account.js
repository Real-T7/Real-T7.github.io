window.addEventListener('DOMContentLoaded', function() {
  const bannedNames = ["T7", "S-762", "S-575"];
  const username = localStorage.getItem("account-username");

  if (bannedNames.includes(username)) {
    localStorage.removeItem("account-username");
  }

  const usernameToDisplay = localStorage.getItem("account-username");
  const usernameElements = document.querySelectorAll(".current-username");

  usernameElements.forEach(element => {
    element.textContent = usernameToDisplay ? usernameToDisplay : "stranger";
  });
});