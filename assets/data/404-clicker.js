let target = 404;
let clicks = 0;

const clicker = document.getElementById("404");
const pageNotFound = document.getElementById("page-not-found");
const face = document.getElementById("404-face");

const colors = [
  '#26de81', '#fc5c65', '#fd9644', '#fed330',
  '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea',
  '#ffc1f3', '#76ead7', '#ff9c71', '#32e0c4',
  '#d291bc', '#fa744f'
];

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

const pages = [
  'Not Found', 'Couldn\'t Be Found', 'Gone Fishing', '[REDACTED]',
  'Was Banned', 'Was Burned', 'Was Subspaced', 'Went To Hell',
  'Was Shredded', 'Was Eaten', 'Stolen', 'Lost',
]

let previousColor = null;
let previousFace = null;
let previousPage = null;

let href404 = "//deltarune.com/lancer/";

function clickFace() {
  do {
    randomFace = faces[Math.floor(Math.random() * faces.length)];
  } while (randomFace === previousFace);

  previousFace = randomFace;

  face.textContent = randomFace;
}

function clickPNF() {
  do {
    randomPage = pages[Math.floor(Math.random() * pages.length)];
  } while (randomPage === previousPage);

  previousPage = randomPage;

  pageNotFound.textContent = `Page ${randomPage}`;
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

    if (pageNotFound.textContent === "Page Was Subspaced" && face.textContent === ":3") {
      pageNotFound.textContent = `Page Found...? ${face.textContent}`;
      href404 = "/html/cats";
    }
    else pageNotFound.textContent = `Page Found ${face.textContent}`;

    clicker.removeEventListener("click", click404);

    setTimeout(() => {
      window.location.href = href404;
    }, 1000);
  } else {
      console.log(`Page Not Found ( x${clicks} )`);
  }
}

clicker.addEventListener("click", click404);
face.addEventListener("click", clickFace);
pageNotFound.addEventListener("click", clickPNF);