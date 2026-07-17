const scoreDisplay = document.getElementById("final-score-ranking");
const ansRigthDisp = document.getElementById("right-anwers-ranking");
const puntos = localStorage.getItem("puntos");

const soundEnabled = localStorage.getItem("sound") === "true";
const farfareSound = new Audio("./fanfare.mp3");

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
