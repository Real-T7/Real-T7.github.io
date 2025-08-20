const el = document.getElementById("version");

const isDev = () =>
  ["127.0.0.1", "localhost"].includes(location.hostname) ||
  navigator.userAgent.includes("vscode");

let clientCount, clientDate;

const formatVer = (count, isoDate) => {
  const d = new Date(isoDate);
  return `v${String(count).padStart(3, "0")}_${d.toLocaleString("en-us", { month: "short" }).toLowerCase()}${d.getDate()}`;
};

const getCommitCount = async () => {
  const url = "https://api.github.com/repos/Real-T7/Real-T7.github.io/commits?per_page=1";
  const res = await fetch(url);
  const link = res.headers.get("Link");
  return link?.match(/&page=(\d+)>; rel="last"/)?.[1] || (await res.json()).length;
};

const getCommitDate = async (count) =>
  (await (await fetch(`https://api.github.com/repos/Real-T7/Real-T7.github.io/commits?per_page=1&page=${count}`)).json())[0]?.commit?.committer?.date;

const updateVer = async () => {
  if (isDev()) {
    el.textContent = "v000 (⚙ dev)";
    el.style.color = "#555";
    return;
  }

  try {
    if (!clientCount) {
      clientCount = await getCommitCount();
      clientDate = await getCommitDate(clientCount);
    }
    const latest = await getCommitCount();
    const isLatest = latest == clientCount;

    el.textContent = `${formatVer(clientCount, clientDate)} ${isLatest ? "(✓ latest)" : "(⚠ outdated)"}`;
    el.style.color = isLatest ? "#006400" : "#8b0000";
  } catch {
    el.textContent = "v000 (⚠ error)";
    el.style.color = "#8b0000";
  }
};

updateVer();
setInterval(updateVer, 60000);