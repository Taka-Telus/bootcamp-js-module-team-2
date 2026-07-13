const gameID = localStorage.getItem ("game-id");
const apiURL = `https://quiz-api.cesar-kastli.workers.dev/games/${gameID}`

console.log (apiURL);

async function traerJuego(apiURL) {
    try {
        const respuesta = await fetch(apiURL);
        const datos = await respuesta.json();
        //console.log(JSON.stringify(datos));
        localStorage.setItem("gameData", JSON.stringify(datos));
    } catch (error) {
        console.log("Falló:", error);
    }
}

async function respuestaUsuario() {

    addEventListener
    
}

;(async () => {
    await traerJuego(apiURL);
    const data = localStorage.getItem("gameData");
    const gameData = JSON.parse(data);
    console.log (gameData);

    const main = document.getElementById("game-display");
    const gameInterface = document.createElement ("div");

    for(let i = 0; i<gameData.questions.length; i++){
            gameInterface.innerHTML = `
            <h3>${gameData.questions[i].text}</h3>
            <div class = "card"> 
            <h4>${gameData.questions[i].options[0]}</h4>
            </div>
            <div class = "card"> 
            <h4>${gameData.questions[i].options[1]}</h4>
            </div>
            <div class = "card"> 
            <h4>${gameData.questions[i].options[2]}</h4>
            </div>

            `;
            //await respuestaUsuario();
    }

    main.appendChild(gameInterface);
})();