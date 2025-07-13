fetch('/assets/data/splash.json')
.then(response => response.json())
.then(data => {
  const links = data.links;
  const messages = data.messages.map(msg =>
    msg.replace(/\$\{links\[(\d+)\]\}/g, (_, i) => links[i])
  );
  const randomIndex = Math.floor(Math.random() * messages.length);
  document.getElementById("splash-text").innerHTML = messages[randomIndex];
})
.catch(error => console.error("error loading splash text:", error));