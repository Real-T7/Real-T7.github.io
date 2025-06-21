let target = 404;
let clicks = 0;

const clicker = document.getElementById("404");

clicker.addEventListener("click", () => {
    clicks++;

    if (clicks === target) {
        console.log(`Page Found! ( x${clicks} )`)

        setTimeout(() => {
            window.location.href = "//deltarune.com/lancer/";
        }, 1000);
    } else {
        console.log(`Page Not Found ( x${clicks} )`)
    }
});