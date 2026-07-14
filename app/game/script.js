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
    const titleDisplay = document.getElementById("title-display");
    const questionDisplay = document.getElementById("question-display");
    const gameQuestionTitle = document.createElement ("div");
    let i = 0;

    displayQuestions(i);

    function func(a, b) {  
        return 0.5 - Math.random();
    }  
    function displayQuestions (i){
            
            gameQuestionTitle.innerHTML = `
            <h3>${gameData.questions[i].text}</h3> `
            
            titleDisplay.appendChild(gameQuestionTitle);
            questionDisplay.innerHTML = ("");
            const order = [0, 1, 2, 3];
            const shuffle = order.sort(func);
            const Questions = [...gameData.questions[i].options];
            for (let q = 0; q < Questions.length; q++){
                    const gameQuestions = `
                    <div id ="${q}" class ="card"> 
                    <h4 >${Questions[shuffle[q]]}</h4>
                    </div>
                    `
                    questionDisplay.insertAdjacentHTML("beforeend", gameQuestions);
                }
                questionDisplay.addEventListener ("click", createClickHandler(shuffle));
            
    }

    

function createClickHandler (shuffle) {
    return function clickHandler(event) {
        const userAnswer = event.target.closest (".card");
        const nextQuestionButton = document.createElement("button");
        const rightAnswer = document.getElementById (`${shuffle[0]}`);  
        const esCorrecta = userAnswer === rightAnswer;

            
            if (esCorrecta) {
                userAnswer.classList.remove("card");
                userAnswer.classList.add("correcta");
            } else {
                userAnswer.classList.remove("card");
                userAnswer.classList.add("incorrecta");
                rightAnswer.classList.remove("card");
                rightAnswer.classList.add("correcta");
            }


            nextQuestionButton.innerHTML = `Siguiente Pregunta`;

            questionDisplay.appendChild (nextQuestionButton);
            questionDisplay.removeEventListener("click", clickHandler); 
            nextQuestionButton.addEventListener ("click", () => {
                i ++;   
                displayQuestions(i);

            })
        }    
    }

})();