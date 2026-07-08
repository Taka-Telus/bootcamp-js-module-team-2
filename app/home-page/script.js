const gamesDisplayBar = document.getElementById("games-menu-home");
const apiURL = "https://quiz-api.cesar-kastli.workers.dev/games"
async function traerUsuario() {
  try {
    const respuesta = await fetch(apiURL);
    const datos = await respuesta.json();
    //console.log(JSON.stringify(datos));
    localStorage.setItem("gameData", JSON.stringify(datos));
} catch (error) {
    console.log("Falló:", error);
}
}
setTimeout(traerUsuario());
const data = localStorage.getItem("gameData");
const gameData = JSON.parse(data);
console.log (data);
gameData.forEach(game => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("card");
    console.log (game);
    gameCard.innerHTML = `
    <img src="${game.image}">
    `

    gamesDisplayBar.appendChild(gameCard);
});