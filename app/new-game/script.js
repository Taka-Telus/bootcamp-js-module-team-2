const questionDisplay = document.getElementById("questions");
const addQuestionButton = document.getElementById ("add-questions");
const apiURL = `https://quiz-api.cesar-kastli.workers.dev/games/`;
const gameId = localStorage.getItem ("edit-id");
console.log (gameId);
if(gameId === "none"){
    console.log("do not call api");
} else {}
addQuestionButton.addEventListener("click", addQuestionHandler);

function addQuestionHandler () {
    const newQuestion = document.createElement ("div");
    newQuestion.classList.add("card");
    newQuestion.innerHTML = `
    <div class="header">
    <input id="question" placeholder = "type your question here"></input>
    <button>🗑️</button>
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