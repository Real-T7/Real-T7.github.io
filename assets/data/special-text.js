(() => {
  const colors = [
    '#26de81', '#fc5c65', '#fd9644', '#fed330',
    '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea',
    '#ffc1f3', '#76ead7', '#ff9c71', '#32e0c4',
    '#d291bc', '#fa744f'
  ];

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