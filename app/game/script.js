const gameID = localStorage.getItem("game-id");
const apiURL = `https://quiz-api.cesar-kastli.workers.dev/games/${gameID}`

const soundEnabled = localStorage.getItem("sound") === "true";
const vibrationEnabled = localStorage.getItem("vibration") === "true";

// Sonidos
const correctSound = new Audio("../game/correct.mp3");
const wrongSound = new Audio("../game/wrong.mp3");

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


; (async () => {
    await traerJuego(apiURL);
    const data = localStorage.getItem("gameData");
    const gameData = JSON.parse(data);
    const titleDisplay = document.getElementById("title-display");
    const questionDisplay = document.getElementById("question-display");
    const gameQuestionTitle = document.createElement("div");
    let puntos = 0;
    let i = 0;

    displayQuestions(i);

    function func(a, b) {
        return 0.5 - Math.random();
    }
    function displayQuestions(i) {
        const order = [0, 1, 2, 3];
        const shuffle = order.sort(func);
        const Questions = [...gameData.questions[i].options];
        titleDisplay.appendChild(gameQuestionTitle);

        gameQuestionTitle.innerHTML = `
            <h3>${gameData.questions[i].text}</h3> `


        questionDisplay.innerHTML = ("");
        for (let q = 0; q < Questions.length; q++) {
            const gameQuestions = `
                    <div id ="${q}" class ="card"> 
                    <h4 >${Questions[shuffle[q]]}</h4>
                    </div>
                    `
            questionDisplay.insertAdjacentHTML("beforeend", gameQuestions);

        }
        questionDisplay.addEventListener("click", createClickHandler(shuffle));


    }
    function createClickHandler(shuffle) {
        return function clickHandler(event) {
            const userAnswer = event.target.closest(".card");
            const nextQuestionButton = document.createElement("button");

            for (let g = 0; g < 4; g++) {
                if (shuffle[g] === 0) {
                    rightAnswer = document.getElementById(`${g}`);
                }
            }

            if (userAnswer === rightAnswer) {
                userAnswer.classList.remove("card");
                userAnswer.classList.add("correcta");

                if (soundEnabled) {
                    correctSound.play();
                }

                if (vibrationEnabled && navigator.vibrate) {
                    navigator.vibrate(200);
                }
                puntos++;


            } else {
                userAnswer.classList.remove("card");
                userAnswer.classList.add("incorrecta");
                rightAnswer.classList.remove("card");
                rightAnswer.classList.add("correcta");

                if (soundEnabled) {
                    wrongSound.play();
                }

                if (vibrationEnabled && navigator.vibrate) {
                    navigator.vibrate(200);
                }
            
        }

        questionDisplay.removeEventListener("click", clickHandler);
        if ((i + 1) === gameData.questions.length) {
            localStorage.setItem("puntos", puntos);
            nextQuestionButton.innerHTML = `
                <a href = "../ranking/ranking.html"> Finalizar Cuestionario <a>`;
            questionDisplay.appendChild(nextQuestionButton);
        } else {
            nextQuestionButton.innerHTML = `Siguiente Pregunta`;
            questionDisplay.appendChild(nextQuestionButton);
            nextQuestionButton.addEventListener("click", () => {
                i++;
                displayQuestions(i);
            }
            )
        }
    }
}

}) ();
