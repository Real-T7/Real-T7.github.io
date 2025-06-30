let target = 404;
let clicks = 0;

const clicker = document.getElementById("404");
const pageNotFound = document.getElementById("page-not-found");
const face = document.getElementById("face");

const colors = [
  '#26de81', '#fc5c65', '#fd9644', '#fed330',
  '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea',
  '#ffc1f3', '#76ead7', '#ff9c71', '#32e0c4',
  '#d291bc', '#fa744f'
];

let previousColor = null;

const faces = [
  ':(', ':)', '>:)', '>:(',
  ':D', 'D:', ':3', '3:',
  '>:D', ';)', ';(', '>:3',
  ';3',':-)', ':-(', '._.',
  ';-;', 'XD', '>_>', '<_<',
  '@_@', '3:<', '.-.', ':P',
  'owo', 'uwu', 'T_T', '*-*',
  ':O',':]', ':/', ':|'
]

let previousFace = null;

function clickFace() {
  do {
    randomFace = faces[Math.floor(Math.random() * faces.length)];
  } while (randomFace === previousFace);

  previousFace = randomFace;

  face.textContent = randomFace;
}

function click404() {
  if (clicks >= target) return;

  clicks++;

  do {
    randomColor = colors[Math.floor(Math.random() * colors.length)];
  } while (randomColor === previousColor);

  previousColor = randomColor;

  clicker.style.color = randomColor;

  if (clicks === target) {
    console.log(`Page Found! ( x${clicks} )`);

    pageNotFound.textContent = `Page Found ${face.textContent}`;

    clicker.removeEventListener("click", click404);

    setTimeout(() => {
      window.location.href = "//deltarune.com/lancer/";
    }, 1000);
  } else {
      console.log(`Page Not Found ( x${clicks} )`);
  }
}

clicker.addEventListener("click", click404);
face.addEventListener("click", clickFace);