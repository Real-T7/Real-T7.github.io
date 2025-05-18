function updateTime() {
    const clockDiv = document.getElementById("clock");
    const now = new Date();
    clockDiv.textContent = now.toLocaleTimeString();
}

// Create the clock div
const clockDiv = document.createElement("div");
clockDiv.id = "clock";
clockDiv.style.position = "fixed";
clockDiv.style.top = "10px";
clockDiv.style.left = "10px";
clockDiv.style.backgroundColor = "rgba(0,0,0,0.6)";
clockDiv.style.color = "white";
clockDiv.style.padding = "5px 10px";
clockDiv.style.fontFamily = "monospace";
clockDiv.style.borderRadius = "5px";
clockDiv.style.zIndex = "1000";

document.body.appendChild(clockDiv);
updateTime();
setInterval(updateTime, 1000);