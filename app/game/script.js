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


;(async () => {
    await traerJuego(apiURL);
    const data = localStorage.getItem("gameData");
    const gameData = JSON.parse(data);
    console.log (gameData);
    const titleDisplay = document.getElementById("title-display");
    const questionDisplay = document.getElementById("question-display");
    const gameQuestionTitle = document.createElement ("div");
    
    function displayQuestions (i){
    
            gameQuestionTitle.innerHTML = `
            <h3>${gameData.questions[i].text}</h3> `
            
            titleDisplay.appendChild(gameQuestionTitle);
            questionDisplay.innerHTML = ("");
            for (let q = 0; q < gameData.questions[i].options.length; q++){
                    const gameQuestions = `
                    <div class = "card"> 
                    <h4>${gameData.questions[i].options[q]}</h4>
                    </div>
                    `
                    questionDisplay.insertAdjacentHTML("beforeend", gameQuestions);
            }
            
    }

    let i = 0;

    displayQuestions(i);


    questionDisplay.addEventListener ("click", () => {
            i ++;   
            displayQuestions(i);

    }
)

})();