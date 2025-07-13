let idMap = [];

fetch("/assets/data/id-map.json")
  .then(response => response.json())
  .then(data => {
    idMap = data;
  })
  .catch(error => {
    console.error("Failed to load ID map:", error);
  });

function redirectToKeyword() {
  const id = document.getElementById("idInput").value.trim().toLowerCase();
  if (!id) return;

  if (idMap.length === 0) {
    alert("ID map not loaded yet. Please try again.");
    return;
  }

  const match = idMap.find(entry =>
    entry.ids.some(entryId => entryId.toLowerCase() === id)
  );

  if (Math.random() >= 0.01) {
    if (match) {
      window.location.href = match.path;
    } else {
      window.location.href = "/" + id;
    }
  } else {
    window.location.href = "/loading.html";
  }
}