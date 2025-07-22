const music = document.getElementById('background-music');
const player = document.getElementById('music-player');
const songTitle = player.dataset.songTitle;

let hovering = false;

music.volume = 0.5;

const updateUI = () => {
  player.title = `${music.paused ? 'Play' : 'Pause'} Background Music\n🎵 ${songTitle}`;
  player.textContent = hovering ? (music.paused ? "▶" : "⏸") : "♫";
};

player.addEventListener('mouseenter', () => {
  hovering = true;
  updateUI();
});

player.addEventListener('mouseleave', () => {
  hovering = false;
  updateUI();
});

player.addEventListener('click', () => {
  if (Math.random() < 0.01) return location.href = "/html/piano/";
  music.paused ? music.play() : music.pause();
  updateUI();
});

music.addEventListener('play', updateUI);
music.addEventListener('pause', updateUI);

updateUI();