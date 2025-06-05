function redirectToKeyword() {
  const input = document.getElementById("keywordInput").value.trim();
  if (input) {
    window.location.href = `/html/${encodeURIComponent(input)}`;
  }
}

document.getElementById("keywordInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      redirectToKeyword();
  }
});