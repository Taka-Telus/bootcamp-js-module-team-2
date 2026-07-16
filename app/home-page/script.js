async function traerUsuario(apiURL) {
    try {
        const respuesta = await fetch(apiURL);

        // Verificamos si la respuesta de la red es correcta
        if (!respuesta.ok) {
            throw new Error(`Error en el servidor: ${respuesta.status} ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        localStorage.setItem("gamesData", JSON.stringify(datos));
    } catch (error) {
        console.error("Falló:", error);

        // Mostrar error al usuario
        window.alert('No pudimos conectar con el servidor. Por favor, verifica tu conexión e intenta de nuevo.');
    }
}

;(async () => {
    const newGameButton = document.getElementById("new-game-button");
    const gamesDisplayBar = document.getElementById("games-menu-home");
    const apiURL = "https://quiz-api.cesar-kastli.workers.dev/games"
    await traerUsuario(apiURL);
    const data = localStorage.getItem("gamesData");
    const gamesData = JSON.parse(data);
    console.log (data);
    newGameButton.addEventListener("click", () => {
        localStorage.setItem ("edit-id", "none");
    })
    gamesData.forEach(game => {
        const gameCard = document.createElement("div");
        gameCard.classList.add("card");
        console.log (game);
        gameCard.innerHTML = `
        <img src="${game.image}">
        <div class="game-card-info" >
                    <h4 id = "${game.id}">${game.title}</h4>
                    <h6>${game.questionCount} questions</h6>
                    <h6>${game.difficulty}</h6>
                </div>
                <div>
                    <button class="play-btn" id = "${game.id}">PLAY</button>
                    <button class="edit-btn" id = "${game.id}">✎</button>
                </div>
        `
        gamesDisplayBar.appendChild(gameCard);
    });

        gamesDisplayBar.addEventListener("click", (event) => {
            const playBtn = event.target.closest (".play-btn");
            const editBtn = event.target.closest (".edit-btn");
            console.log ("click");

            if (playBtn) {
            const gameId = playBtn.id;
            localStorage.setItem ("game-id", gameId);
            window.location.href = "/app/game/game.html"
        }

        if (editBtn) {
            const gameId = editBtn.id;
            console.log("Edit game", gameId);
            localStorage.setItem ("edit-id", gameId);
            window.location.href = "/app/new-game/new-game.html"

        }

        })
    
})();