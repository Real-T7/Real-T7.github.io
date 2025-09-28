const el = document.getElementById("version");

const isDevEnv = () =>
  ["127.0.0.1", "localhost"].includes(location.hostname) ||
  navigator.userAgent.includes("vscode");

let cachedVersion = null;

const getVersionInfo = async () => {
  const url = "https://api.github.com/repos/Real-T7/Real-T7.github.io/commits?per_page=1";
  const res = await fetch(url);

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const link = res.headers.get("Link");
  const data = await res.json();

  const totalCommits = link?.match(/&page=(\d+)>; rel="last"/)?.[1] ?? 1;
  const latestDate = data[0]?.commit?.committer?.date ?? null;

  return { totalCommits, latestDate };
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
    if (!cachedVersion) cachedVersion = await getVersionInfo();
    const latest = await getVersionInfo();
    const isLatest = latest.totalCommits == cachedVersion.totalCommits;

    el.textContent = `${formatVer(cachedVersion.totalCommits, cachedVersion.latestDate)} ${isLatest ? "(✓ latest)" : "(⚠ outdated)"}`;
    el.title = isLatest
      ? "currently on the latest version\navoid refreshing too much, GitHub may rate limit you"
      : "please refresh to update\nif stuck, clear browser cache";
    el.style.color = isLatest ? "#006400" : "#8b0000";
  } catch (err) {
    console.error("failed to fetch version:", err);
    el.textContent = "v000 (⚠ error)";
    el.title = "something went wrong\nfailed to fetch version (possible rate limit)";
    el.style.color = "#8b0000";
  }
};

updateVer();
setInterval(updateVer, 61000);