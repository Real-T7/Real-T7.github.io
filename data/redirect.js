function redirectToKeyword() {
const keyword = document.getElementById("keywordInput").value.trim();
if (!keyword) return;

const otherInput = document.getElementById("otherInput");
const selectedRadio = document.querySelector('input[name="subdir"]:checked');

let subdir = "";

if (selectedRadio) {
  if (selectedRadio.value === "other") {
    subdir = otherInput.value.trim().replace(/^\/+|\/+$/g, "");
  } else {
    subdir = selectedRadio.value;
  }
}

const fullPath = `/html/${subdir ? subdir + "/" : ""}${encodeURIComponent(keyword)}`;
window.location.href = fullPath;
}

// Enable "Enter" to submit
document.getElementById("keywordInput").addEventListener("keypress", function (event) {
if (event.key === "Enter") {
  redirectToKeyword();
}
});