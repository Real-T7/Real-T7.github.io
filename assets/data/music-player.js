const music = document.getElementById('background-music');
const musicPlayer = document.getElementById('music-player');

let isPlaying = false;

music.volume = 0.25;

musicPlayer.addEventListener('click', () => {
  if (Math.random() < 0.01) {
    window.location.href = "/html/piano/"
  } else {
    if (isPlaying) {
      music.pause();
      musicPlayer.textContent = "▶";
      musicPlayer.title = "Play Background Music"
    } else {
      music.play();
      musicPlayer.textContent = "⏸";
      musicPlayer.title = "Pause Background Music"
    }
  }

  isPlaying = !isPlaying
});