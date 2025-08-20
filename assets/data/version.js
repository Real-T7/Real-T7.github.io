async function checkVersion() {
  const versionElement = document.getElementById("version");
  const infoElement = document.getElementById("latest-commit-info");

  if (!window.appVersion) {
    versionElement.textContent = "(error: version.js missing)";
    versionElement.style.color = "#8b0000";
    versionElement.title = "version file (version.js) not found";
    return;
  }

  const { version, sha } = window.appVersion;

  versionElement.textContent = version;
  versionElement.style.color = "#555";
  versionElement.title = "checking for updates…";

  try {
    const response = await fetch("https://api.github.com/repos/Real-T7/Real-T7.github.io/commits?per_page=1");
    if (!response.ok) throw new Error("GitHub API request failed");

    const commit = (await response.json())[0];
    const latestSha = commit.sha.substring(0, 7);
    const latestMsg = commit.commit.message;
    const latestDate = new Date(commit.commit.committer.date);
    const latestUrl = commit.html_url;

    infoElement.innerHTML = `<a href="${latestUrl}" target="_blank">${latestSha}</a> — ${latestMsg}`;
    infoElement.title = `latest commit on ${latestDate.toUTCString()}`;

    // Compare SHAs
    if (sha !== latestSha) {
      versionElement.style.color = "#8b0000";
      versionElement.textContent = `${version} (⚠ outdated)`;
      versionElement.title = "your version is behind the latest commit";
    } else {
      versionElement.style.color = "#006400";
      versionElement.textContent = `${version} (✓ latest)`;
      versionElement.title = "ur on the latest version";
    }
  } catch (err) {
    versionElement.textContent = `${version} (check failed)`;
    versionElement.style.color = "#d2691e";
    versionElement.title = `error checking updates: ${err.message}`;
  }
}

checkVersion();
setInterval(checkVersion, 60 * 1000);