const version = document.getElementById("version");

fetch("https://api.github.com/repos/Real-T7/Real-T7.github.io/commits?per_page=1")
  .then(async res => {
    const link = res.headers.get("Link");
    let versionNum;

    if (link) {
      const match = link.match(/&page=(\d+)>; rel="last"/);
      versionNum = match ? match[1] : "0";
    } else {
      const commits = await res.json();
      versionNum = commits.length.toString();
    }

    version.textContent = formatVersion(versionNum);
  })
  .catch(err => {
    console.error("error fetching version:", err);
    version.textContent = "version 000";
  });

const formatVersion = count => `version ${count.toString().padStart(3, "0")}`;