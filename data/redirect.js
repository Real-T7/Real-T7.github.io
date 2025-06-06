let idMap = [];

fetch("/data/id-map.json")
  .then(response => response.json())
  .then(data => {
    idMap = data;
  })
  .catch(error => {
    console.error("Failed to load ID map:", error);
  });

function redirectToKeyword() {
  const keyword = document.getElementById("keywordInput").value.trim();
  if (!keyword) return;

  if (idMap.length === 0) {
    alert("ID map not loaded yet. Please try again.");
    return;
  }

  const match = idMap.find(entry => entry.ids.includes(keyword));

  if (match) {
    window.location.href = window.location.origin + '/' + match.path;
  } else {
    window.location.href = `/${keyword}`
  }
}