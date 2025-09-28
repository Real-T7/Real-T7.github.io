const el = document.getElementById("version");

const isDevEnv = () =>
  ["127.0.0.1", "localhost"].includes(location.hostname) ||
  navigator.userAgent.includes("vscode");

let clientCount = null;
let clientDate = null;

const fetchJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

const getCommitCount = async () => {
  const res = await fetch("https://api.github.com/repos/Real-T7/Real-T7.github.io/commits?per_page=1");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const link = res.headers.get("Link");
  if (link) {
    const match = link.match(/&page=(\d+)>; rel="last"/);
    if (match) return match[1];
  }
  const data = await res.json();
  return Array.isArray(data) ? data.length : 0;
};

const getLatestCommitDate = async () => {
  const data = await fetchJSON("https://api.github.com/repos/Real-T7/Real-T7.github.io/commits?per_page=1&page=1");
  return Array.isArray(data) ? data[0]?.commit?.committer?.date ?? null : null;
};

const formatVer = (count, isoDate) => {
  if (!count || !isoDate) return "v???_unknown";
  const d = new Date(isoDate);
  if (isNaN(d)) return "v???_invalid";
  return `v${String(count).padStart(3, "0")}_${d.toLocaleString("en-us", { month: "short" }).toLowerCase()}${d.getDate()}`;
};

const updateVer = async () => {
  if (isDevEnv()) {
    el.textContent = "v000 (⚙ dev)";
    el.title = "currently in dev environment\nsome features have been disabled";
    el.style.color = "#555";
    return;
  }

  try {
    if (!clientCount || !clientDate) {
      clientCount = await getCommitCount();
      clientDate = await getLatestCommitDate();
    }

    const latest = await getCommitCount();
    const isLatest = latest == clientCount;

    el.textContent = `${formatVer(clientCount, clientDate)} ${isLatest ? "(✓ latest)" : "(⚠ outdated)"}`;
    el.title = isLatest
      ? "currently on the latest version\navoid refreshing too much, GitHub may rate limit you"
      : "please refresh to update\nif stuck, clear browser cache";
    el.style.color = isLatest ? "#006400" : "#8b0000";
  } catch (err) {
    el.textContent = "v000 (⚠ error)";
    el.title = "something went wrong\nfailed to fetch version (possible rate limit)";
    el.style.color = "#8b0000";

    console.error("failed to fetch version:", err);
  }
};

updateVer();
setInterval(updateVer, 61000);