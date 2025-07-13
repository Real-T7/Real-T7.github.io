const music = document.getElementById('background-music');
const musicPlayer = document.getElementById('music-player');
const songTitle = musicPlayer.getAttribute('data-song-title');

music.volume = 0.5;

function updateMusicTitle() {
  const action = music.paused ? 'Play Background Music' : 'Pause Background Music';
  musicPlayer.title = `${action}\n🎵 ${songTitle}`;
}

musicPlayer.addEventListener('click', () => {
  if (Math.random() < 0.01) {
    window.location.href = "/html/piano/";
    return;
  }

  if (music.paused) {
    music.play();
    musicPlayer.textContent = "⏸";
  } else {
    music.pause();
    musicPlayer.textContent = "▶";
  }

  updateMusicTitle();
});

music.addEventListener('play', () => {
  musicPlayer.textContent = "⏸";
  updateMusicTitle();
});

music.addEventListener('pause', () => {
  musicPlayer.textContent = "▶";
  updateMusicTitle();
});