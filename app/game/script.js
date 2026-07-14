const gameID = localStorage.getItem ("game-id");
const apiURL = `https://quiz-api.cesar-kastli.workers.dev/games/${gameID}`

console.log (apiURL);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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
    let i = 0;

    displayQuestions(i);
    
    function displayQuestions (i){
            
            gameQuestionTitle.innerHTML = `
            <h3>${gameData.questions[i].text}</h3> `
            
            titleDisplay.appendChild(gameQuestionTitle);
            questionDisplay.innerHTML = ("");
            const shuffledQuestions = [... gameData.questions[i].options];
            shuffledQuestions.sort((a, b) => a.localeCompare(b));
            for (let q = 0; q < gameData.questions[i].options.length; q++){
                    const gameQuestions = `
                    <div id = "${shuffledQuestions[q]}"class ="card"> 
                    <h4 >${shuffledQuestions[q]}</h4>
                    </div>
                    `
                    questionDisplay.insertAdjacentHTML("beforeend", gameQuestions);
                    questionDisplay.addEventListener ("click", clickHandler);
            }
            
    }

    

function clickHandler () {
            const userAnswer = event.target.closest (".card");
            const nextQuestionButton = document.createElement("button");
            
            if (userAnswer.id === gameData.questions[i].options[0]){
                userAnswer.classList.remove("card");
                userAnswer.classList.add("correcta");
            } else {
                userAnswer.classList.remove("card");
                userAnswer.classList.add("incorrecta");
            }

            nextQuestionButton.innerHTML = `Siguiente Pregunta`;

            questionDisplay.appendChild (nextQuestionButton);
            questionDisplay.removeEventListener("click", clickHandler); 
            nextQuestionButton.addEventListener ("click", () => {
                i ++;   
                displayQuestions(i);
            })

    }

})();