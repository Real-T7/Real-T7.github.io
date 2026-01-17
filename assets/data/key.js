(async () => {
  if (localStorage.getItem("key")) return;

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    screen.colorDepth,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.hardwareConcurrency || "na",
    navigator.deviceMemory || "na"
  ].join("|");

  const random = crypto.getRandomValues(new Uint32Array(4)).join("-");

  const raw = fingerprint + "::" + random;

  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(raw)
  );

  const id = btoa(
    String.fromCharCode(...new Uint8Array(buffer))
  ).replace(/=/g, "");

  localStorage.setItem("key", id);
})();