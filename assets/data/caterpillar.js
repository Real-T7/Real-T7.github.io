const caterpillar = document.getElementById('caterpillar');
const squeak = new Audio('/assets/audio/sfx/squeak.mp3');
squeak.volume = 0.125;
let pos = 0;
let speed = 2;

function moveCaterpillar() {
  const screenWidth = window.innerWidth;
  const imageWidth = caterpillar.offsetWidth;

  pos += speed;

  // Flip when hitting edges
  if (pos + imageWidth >= screenWidth || pos <= 0) {
    speed = -speed;

    // Combine squish scale and horizontal flip
    if (speed > 0) {
      caterpillar.style.scale = '1 1'; // face right
    } else {
      caterpillar.style.scale = '-1 1'; // face left
    }
  }

  caterpillar.style.left = `${pos}px`;
  requestAnimationFrame(moveCaterpillar);
}

window.onload = moveCaterpillar;
caterpillar.addEventListener('click', () => {squeak.play()});