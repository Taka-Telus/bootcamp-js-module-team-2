const questionDisplay = document.getElementById("questions");
const addQuestionButton = document.getElementById ("add-questions");
const deleteGameButton = document.getElementById("delete-game");
const saveChangesButton = document.getElementById("save-changes");
const cancelButton = document.getElementById("cancel");
const apiURL = `https://quiz-api.cesar-kastli.workers.dev/games/`;
const editID = localStorage.getItem ("edit-id"); 

if (editID === "none"){
    console.log("do not call api")

} else {
    console.log ("call api");
    console.log(editID);

    async function traerJuego (apiURL) {
        try {
            const respuesta = await fetch(apiURL);
            const datos = await respuesta.json();
            console.log(datos);
            localStorage.setItem("gameData", JSON.stringify(datos));
        } catch (error) {
            console.log("Falló:", error);
        }

    }


;(async () => {

    await traerJuego (apiURL + "/" + editID);
    const gameData = JSON.parse(localStorage.getItem ("gameData"));
    const titleDisp = document.getElementById ("game-title");
    const descriptionDisp = document.getElementById ("game-description");
    const difficultyDisp = document.getElementById ("game-difficulty");
    const imageDisp = document.getElementById ("game-image");
    const questions = [...gameData.questions]
    titleDisp.value = gameData.title;
    descriptionDisp.value = gameData.description;
    difficultyDisp.value = gameData.difficulty;
    imageDisp.src = gameData.image;

    for (const question of questions){
    const newQuestion = document.createElement ("div");
    newQuestion.classList.add("question-card");
    newQuestion.innerHTML = `
    <div class="header">
    <input id="question" value = "${question.text}"></input>
    <button>🗑️</button>
    </div>
    <div>
    <input id="answer1" class = "right-answer" value = "${question.options[0]}"></input>
    <input id="answer2" value = "${question.options[1]}"></input>
    <input id="answer3" value = "${question.options[2]}"></input>
    <input id="answer4" value = "${question.options[3]}"></input>
    </div>
    `
    questionDisplay.appendChild (newQuestion);
    }
    })();
}
addQuestionButton.addEventListener("click", addNewQuestion);
deleteGameButton.addEventListener("click", deleteGame);
saveChangesButton.addEventListener("click", saveGame);
cancelButton.addEventListener("click", saveGame);

function addNewQuestion () {
    const newQuestion = document.createElement ("div");
    newQuestion.classList.add("question-card");
    newQuestion.innerHTML = `
    <div class="header">
    <input id="question" placeholder = "type your question here"></input>
    <button id="delete" >🗑️</button>
    </div>
    <div>
    <input id="answer1" class = "right-answer" placeholder = "type your answer here"></input>
    <input id="answer2" placeholder = "type your answer here"></input>
    <input id="answer3" placeholder = "type your answer here"></input>
    <input id="answer4" placeholder = "type your answer here"></input>
    </div>
    `
    questionDisplay.appendChild (newQuestion);
}

async function deleteGame (){
    console.log("boton apretado");
    try {
            await fetch (`${apiURL}/${editID}`, {
                method:"DELETE"
            });
        } catch (error) {
            console.log("Falló:", error);
        }
}

async function saveGame() {
    console.log("saving game");
    const difficultyDisp = document.getElementById ("game-difficulty");
    const titleDisp = document.getElementById ("game-title");
    const descriptionDisp = document.getElementById ("game-description");
    const questionsDisplayed = document.querySelectorAll(".question-card");
    if (editID === "none"){
    console.log("do not call api")
     try {  
            console.log("arranca el Post");
            const response = await fetch (`${apiURL}`,{ 
                  method: "POST",
                  body: JSON.stringify({
                    title:titleDisp.value,
                    author: "team-2",
                    image: "https://thumbs.dreamstime.com/b/contact-form-line-icon-paper-pen-blank-sign-vector-graphics-linear-pattern-white-background-eps-contact-form-line-icon-122598215.jpg",
                    difficulty: difficultyDisp.value
                  })
                }
        )
        if (response.ok){
            window.alert("Se guardo el juego correctamente.")    
        } else {
            window.alert("El envio del juego tiene un formato incorrecto.")    
        }
    } catch (error) {
        console.log("Falló:", error);
        window.alert("Error al guardar el juego, intente nuevamente mas tarde.")    
    }
} else {
    console.log (questionsDisplayed);
    const questionsArray = [];
    for (const questionDisplayed of questionsDisplayed){
        const titleValue = questionDisplayed.children[0].children[0].value;
        const answer1 = questionDisplayed.lastElementChild.firstElementChild.value;
        const answer2 = questionDisplayed.lastElementChild.firstElementChild.nextElementSibling.value;
        const answer3 = questionDisplayed.lastElementChild.lastElementChild.previousElementSibling.value;
        const answer4 = questionDisplayed.lastElementChild.lastElementChild.value;
        const gameData = localStorage.getItem("gameData");

        questionsArray.push({text:titleValue, options:[answer1, answer2, answer3, answer4]})
        console.log (questionsArray);
        try {
            await fetch (`${apiURL}${editID}`,{ 
                  method: "PATCH",
                  body: JSON.stringify({questions:questionsArray})
                }
        )
    } catch (error) {
        console.log("Falló:", error);
    }
        try {
            await fetch (`${apiURL}${editID}`,{ 
                  method: "PATCH",
                  body: JSON.stringify({
                    title: titleDisp.value,
                    image:gameData.image,
                    difficulty:difficultyDisp.value
                })
                }
        )
    }   catch (error) {
        console.log("Falló:", error);
    }
    }
    }


}

