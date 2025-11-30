import { brickColors } from "./colors.js";

const canvas = document.getElementById("glitch");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const GLITCHINESS = 1;

function drawBatch() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < GLITCHINESS; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const w = Math.random() * 200 + 20;
    const h = Math.random() * 200 + 20;
    const color = brickColors[Math.floor(Math.random() * brickColors.length)];
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }
}

function loop() {
  drawBatch();
  setTimeout(loop, 1);
}

loop();