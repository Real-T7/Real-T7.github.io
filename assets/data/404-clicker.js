let target = 404;
let clicks = 0;

const clicker = document.getElementById("404");

function handleClick() {
  clicks++;

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