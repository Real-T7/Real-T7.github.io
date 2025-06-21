let target = 404;
let clicks = 0;

const clicker = document.getElementById("404");

const colors = [
  '#26de81', '#fc5c65', '#fd9644', '#fed330',
  '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea',
  '#ffc1f3', '#76ead7', '#ff9c71', '#32e0c4',
  '#d291bc', '#fa744f'
];

let previousColor = null

function handleClick() {
  if (clicks >= target) return;

  clicks++;

  do {
    randomColor = colors[Math.floor(Math.random() * colors.length)];
  } while (randomColor === previousColor);

  previousColor = randomColor;

  clicker.style.color = randomColor;

  if (clicks === target) {
    console.log(`Page Found! ( x${clicks} )`);

    clicker.removeEventListener("click", handleClick);

    setTimeout(() => {
      window.location.href = "//deltarune.com/lancer/";
    }, 1000);
  } else {
      console.log(`Page Not Found ( x${clicks} )`);
  }
}

clicker.addEventListener("click", handleClick);