import { colors } from "./colors.js";
(() => {
  const rootStyle = document.documentElement.style;
  let prev = -1;

  function tick() {
    const n = colors.length;
    if (!n) return;

    let idx;
    if (n === 1) idx = 0;
    else {
      do { idx = (Math.random() * n) | 0; } while (idx === prev);
    }
    prev = idx;
    rootStyle.setProperty('--rainbow', colors[idx]);
  }

  tick();
  setInterval(tick, 1000);
})();