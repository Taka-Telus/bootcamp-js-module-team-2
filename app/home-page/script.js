async function traerUsuario(apiURL) {
    try {
        const respuesta = await fetch(apiURL);
        const datos = await respuesta.json();
        //console.log(JSON.stringify(datos));
        localStorage.setItem("gamesData", JSON.stringify(datos));
    } catch (error) {
        console.log("Falló:", error);
    }
}

;(async () => {

    const gamesDisplayBar = document.getElementById("games-menu-home");
    const newGameButton = document.getElementById("new-game-button");
    const apiURL = "https://quiz-api.cesar-kastli.workers.dev/games"
    await traerUsuario(apiURL);
    const data = localStorage.getItem("gamesData");
    const gamesData = JSON.parse(data);
    console.log (data);
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
            window.location.href = "http://127.0.0.1:5500/app/game/game.html"
        }

        if (editBtn) {
            const gameId = editBtn.id;
            console.log("Edit game", gameId);
            localStorage.setItem ("edit-id", gameId);
            window.location.href = "http://127.0.0.1:5500/app/new-game/new-game.html"

        }

        })

        newGameButton.addEventListener("click", () => {
            localStorage.setItem ("edit-id", "none");
        })
    
})();


