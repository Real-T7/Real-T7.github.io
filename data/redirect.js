// Enable/disable "Other" input based on selection
const subdirRadios = document.getElementsByName("subdir");
const otherInput = document.getElementById("otherInput");

subdirRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "other") {
      otherInput.disabled = false;
      otherInput.focus();
    } else {
      otherInput.disabled = true;
      otherInput.value = ""; // Optional: clear it
    }
  });
});

function redirectToKeyword() {
  const keyword = document.getElementById("keywordInput").value.trim();
  if (!keyword) return;

  let subdir = "";
  for (const radio of subdirRadios) {
    if (radio.checked) {
      if (radio.value === "other") {
        subdir = otherInput.value.trim().replace(/^\/+|\/+$/g, ""); // Trim leading/trailing slashes
      } else {
        subdir = radio.value;
      }
      break;
    }
  }

  const fullPath = `/html/${subdir ? subdir + "/" : ""}${encodeURIComponent(keyword)}`;
  window.location.href = fullPath;
}

document.getElementById("keywordInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    redirectToKeyword();
  }
});