const scoreDisplay = document.getElementById("final-score-ranking");
const ansRigthDisp = document.getElementById("right-anwers-ranking");
const puntos = localStorage.getItem("puntos");
const scoreBoardDisplay = document.getElementById("scoreboard");
const apiURL = "https://quiz-api.cesar-kastli.workers.dev/games/";
const gameID = localStorage.getItem ("game-id")



const soundEnabled = localStorage.getItem("sound") === "true";
const farfareSound = new Audio("./fanfare.mp3");

async function getScoreboard(apiURL) {
  try{
    const response = await fetch (`${apiURL}${gameID}/scores`);
    const data = await response.json();
    localStorage.setItem ("scoreboard.data", JSON.stringify(await data));
  } catch (error){
    console.log(error);

  }
}
;(async () => {

  await getScoreboard(apiURL);
  const scoreData = (JSON.parse(localStorage.getItem ("scoreboard.data")));
  console.log (scoreData);

  for (const score of scoreData){
    const scoreboardCard = document.createElement ("div");
    scoreboardCard.classList.add("card-scoreboard");
    scoreboardCard.innerHTML = `
    <h5>${score.playerName}</h5>
    <h5>${score.score}</h5>
    `;
    scoreBoardDisplay.appendChild(scoreboardCard);
  }

})();
confetti({
  particleCount: 250,
  spread: 360,
  origin: { y: 0.5 },
  colors: [
    "#007b06",
    "#bea100",
    "#002592",
    "#d10000"
  ]
});

scoreDisplay.innerHTML = `${puntos * 100}`;
ansRigthDisp.innerHTML = `${puntos} Respuestas Correctas`; {
  
  if (soundEnabled) {
    farfareSound.play();
  }

}
//no funciona el sonido, no se reproduce, no se si es por el navegador o por el codigo, pero no se reproduce, review
