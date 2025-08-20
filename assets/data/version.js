const el = document.getElementById("version");

const isDevEnvironment = () => {
  const isLocalhost = location.hostname === "127.0.0.1" || location.hostname === "localhost";
  const isVSCode = navigator.userAgent.includes("vscode");
  return isLocalhost || isVSCode;
};

const formatVersion = (count, isoDate) => {
  const date = new Date(isoDate);
  const month = date.toLocaleString("en-us", { month: "short" }).toLowerCase();
  const day = date.getDate();
  return `v${count.toString().padStart(3, "0")}_${month}${day}`;
};

const fetchLatestCommitCount = async () => {
  const CACHE_KEY = "latest-commit-info";
  const now = Date.now();

  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { count, timestamp } = JSON.parse(cached);
    if (now - timestamp < 60 * 1000) {
      return count;
    }
  }

  const commitsUrl = "https://api.github.com/repos/Real-T7/Real-T7.github.io/commits?per_page=1";
  const res = await fetch(commitsUrl);
  const link = res.headers.get("Link");
  const lastPageMatch = link?.match(/&page=(\d+)>; rel="last"/);
  const latestCount = lastPageMatch ? +lastPageMatch[1] : (await res.json()).length;

  localStorage.setItem(CACHE_KEY, JSON.stringify({ count: latestCount, timestamp: now }));
  return latestCount;
};

const updateVersion = async () => {
  if (isDevEnvironment()) {
    el.textContent = "v000 (⚙ dev)";
    el.style.color = "#555";
    el.title = "running in local dev environment";
    return;
  }

  try {
    const res = await fetch("/assets/data/version.json");
    const { count, date } = await res.json();
    const version = formatVersion(count, date);

    let tag = "(✓ latest)";
    let color = "#006400";
    let tooltip = "This is the latest deployed version.";

    try {
      const latestCount = await fetchLatestCommitCount();
      if (latestCount > count) {
        tag = "(⚠ outdated)";
        color = "#8b0000";
        tooltip = "this version is outdated, refresh to update";
      }
    } catch {
      tag = "(⚠ check failed)";
      color = "#8b0000";
      tooltip = "could not check GitHub for updates (rate limit or offline)";
    }

    el.textContent = `${version} ${tag}`;
    el.style.color = color;
    el.title = tooltip;
  } catch (error) {
    console.error("version fetch error:", error);
    el.textContent = "v000 (⚠ error)";
    el.style.color = "#8b0000";
    el.title = "failed to load version info (json file missing or invalid)";
  }
};

updateVersion();
setInterval(updateVersion, 60000);