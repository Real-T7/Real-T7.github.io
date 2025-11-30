let idMap = [];

fetch("/assets/data/id.json")
  .then(response => response.json())
  .then(data => {
    idMap = data;
  })
  .catch(error => {
    console.error("failed to load IDs:", error);
  });

function redirectToKeyword() {
  const id = document.getElementById("id-input").value.trim().toLowerCase();
  if (!id) return;

  if (idMap.length === 0) {
    alert("IDs not loaded yet. please try again.");
    return;
  }

  const match = idMap.find(entry =>
    entry.ids.some(entryId => entryId.toLowerCase() === id)
  );

  if (Math.random() < 0.01) {
    window.location.href = "/loading.html";
  } else {
    if (match) {
      window.location.href = match.path;
    } else {
      window.location.href = id;
    }
  }
}