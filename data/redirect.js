const otherRadio = document.getElementById("otherRadio");
const otherInput = document.getElementById("otherInput");
const subdirRadios = document.getElementsByName("subdir");

// Attach change listeners properly
for (const radio of subdirRadios) {
  radio.addEventListener("change", () => {
    if (otherRadio.checked) {
      otherInput.disabled = false;
      otherInput.focus();
    } else {
      otherInput.disabled = true;
      otherInput.value = "";
    }
  });
}

function redirectToKeyword() {
  const keyword = document.getElementById("keywordInput").value.trim();
  if (!keyword) return;

  let subdir = "";
  for (const radio of subdirRadios) {
    if (radio.checked) {
      subdir = (radio.value === "other")
        ? otherInput.value.trim().replace(/^\/+|\/+$/g, "")
        : radio.value;
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