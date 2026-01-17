const img = document.getElementById("sstm");
let drag = false, ox = 0, oy = 0, vx = 0, vy = 0, rot = 0, af;

const hitSound = new Audio("/assets/audio/sfx/bass.wav");
hitSound.preload = "auto";
hitSound.volume = 0.5;
const playHit = () => {
  hitSound.currentTime = 0;
  hitSound.play().catch(() => {});
};

const slide = () => {
  vx *= 0.98;
  vy *= 0.98;

  let x = img.offsetLeft + vx;
  let y = img.offsetTop + vy;

  const w = img.offsetWidth;
  const h = img.offsetHeight;
  const maxX = innerWidth - w;
  const maxY = innerHeight - h;

  let hit = false;

  if (x < 0 || x > maxX) {
    vx = -vx * 0.8;
    hit = true;
  }
  if (y < 0 || y > maxY) {
    vy = -vy * 0.8;
    hit = true;
  }

  if (hit) playHit();

  x = Math.max(0, Math.min(maxX, x));
  y = Math.max(0, Math.min(maxY, y));

  rot += (vx + vy) * 0.1;
  img.style.transform = `rotate(${rot}deg)`;
  img.style.left = x + "px";
  img.style.top = y + "px";

  if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
    af = requestAnimationFrame(slide);
  }
};

const start = (x, y) => {
  drag = true;
  cancelAnimationFrame(af);
  ox = x - img.offsetLeft;
  oy = y - img.offsetTop;
  img.style.cursor = "grabbing";
};

const move = (x, y) => {
  if (!drag) return;
  vx = x - (ox + img.offsetLeft);
  vy = y - (oy + img.offsetTop);
  img.style.left = (x - ox) + "px";
  img.style.top = (y - oy) + "px";
};

const end = () => {
  if (!drag) return;
  drag = false;
  img.style.cursor = "grab";
  slide();
};

img.onmousedown = e => start(e.clientX, e.clientY);
onmousemove = e => move(e.clientX, e.clientY);
onmouseup = end;

img.ontouchstart = e => {
  if (e.touches.length === 1) {
    start(e.touches[0].clientX, e.touches[0].clientY);
  }
};
ontouchmove = e => {
  if (e.touches.length === 1) {
    move(e.touches[0].clientX, e.touches[0].clientY);
  }
};
ontouchend = end;