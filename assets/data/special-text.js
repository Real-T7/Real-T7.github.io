const colors = [
  '#26de81', '#fc5c65', '#fd9644', '#fed330',
  '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea',
  '#ffc1f3', '#76ead7', '#ff9c71', '#32e0c4',
  '#d291bc', '#fa744f'
];

const texts = document.querySelectorAll('.special-text');
let previousColor = null;

setInterval(() => {
  let randomColor;

  do {
    randomColor = colors[Math.floor(Math.random() * colors.length)];
  } while (randomColor === previousColor);

  previousColor = randomColor;

  texts.forEach(text => {
    text.style.fontWeight = "bold";
    text.style.color = randomColor;
  });
}, 1000);