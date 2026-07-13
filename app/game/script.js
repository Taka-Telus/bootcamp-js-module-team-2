const gameID = localStorage.getItem ("game-id");
const apiURL = `https://quiz-api.cesar-kastli.workers.dev/games/${gameID}`

console.log (apiURL);

async function traerUsuario(apiURL) {
    try {
        const respuesta = await fetch(apiURL);
        const datos = await respuesta.json();
        //console.log(JSON.stringify(datos));
        localStorage.setItem("gameData", JSON.stringify(datos));
    } catch (error) {
        console.log("Falló:", error);
    }
}

;(async () => {
    await traerUsuario();
    const data = localStorage.getItem("gameData");
    const gameData = JSON.parse(data);
    console.log (data);


})();