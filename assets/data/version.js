const el = document.getElementById("version");

const isDevEnvironment = () => {
  const isLocalhost = location.hostname === "127.0.0.1" || location.hostname === "localhost";
  const isVSCode = navigator.userAgent.includes("vscode");
  return isLocalhost || isVSCode;
};

let cachedCommitCount = null;
let cachedCommitDate = null;

const formatVersion = (count, isoDate) => {
  const date = new Date(isoDate);
  const month = date.toLocaleString("en-us", { month: "short" }).toLowerCase();
  const day = date.getDate();
  return `v${count.toString().padStart(3, "0")}_${month}${day}`;
};

const fetchLatestCommitInfo = async () => {
  const commitsUrl = "https://api.github.com/repos/Real-T7/Real-T7.github.io/commits?per_page=1";
  const res = await fetch(commitsUrl);
  const link = res.headers.get("Link");
  const lastPageMatch = link?.match(/&page=(\d+)>; rel="last"/);
  const totalCommits = lastPageMatch ? +lastPageMatch[1] : (await res.json()).length;

  const commitRes = await fetch(`${commitsUrl}&page=${totalCommits}`);
  const commit = (await commitRes.json())[0];
  const date = commit?.commit?.committer?.date;

  return { totalCommits, date };
};

const updateVersion = async () => {
  if (isDevEnvironment()) {
    el.textContent = "v000 (� dev)";
    el.style.color = "#555";
    return;
  }

  try {
    const { totalCommits, date } = await fetchLatestCommitInfo();

    if (cachedCommitCount === null && cachedCommitDate === null) {
      cachedCommitCount = totalCommits;
      cachedCommitDate = date;
    }

    const version = formatVersion(cachedCommitCount, cachedCommitDate);
    const isLatest = totalCommits === cachedCommitCount;
    const tag = isLatest ? "(✓ latest)" : "(⚠ outdated)";

    el.textContent = `${version} ${tag}`;
    el.style.color = isLatest ? "#006400" : "#8b0000";
  } catch (error) {
    console.error("version fetch error:", error);
    el.textContent = "v000 (⚠ error)";
    el.style.color = "#8b0000";
  }
};

updateVersion();
setInterval(updateVersion, 60000);