function redirectToKeyword() {
  const keyword = document.getElementById("keywordInput").value.trim();
  if (!keyword) return;

  if (idMap.length === 0) {
    alert("ID map not loaded yet. Please try again.");
    return;
  }

  const match = idMap.find(entry => entry.ids.includes(keyword));

  if (match) {
    const basePath = window.location.origin + window.location.pathname.replace(/[^\/]*$/, "");
    window.location.href = basePath + match.path;
  } else {
    alert("Page not found. Please check your keyword.");
  }
}