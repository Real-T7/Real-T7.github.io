const music = document.getElementById('background-music');
const musicPlayer = document.getElementById('music-player');

let isPlaying = false;

music.volume = 0.25;

musicPlayer.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicPlayer.textContent = "▶";
  } else {
    music.play();
    musicPlayer.textContent = "⏸";
  }

  isPlaying = !isPlaying
});