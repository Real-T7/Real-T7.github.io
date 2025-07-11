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
  const id = document.getElementById("idInput").value.trim();
  if (!id) return;

  if (idMap.length === 0) {
    alert("ID map not loaded yet. Please try again.");
    return;
  }

  const match = idMap.find(entry => entry.ids.includes(id));

  if (match) {
    window.location.href = match.path;
  } else {
    window.location.href = "/" + id;
  }
}