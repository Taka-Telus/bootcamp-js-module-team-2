const scoreDisplay = document.getElementById("final-score-ranking");
const ansRigthDisp = document.getElementById("right-anwers-ranking");
const puntos = localStorage.getItem("puntos");

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

scoreDisplay.innerHTML = `${puntos*100}`;
ansRigthDisp.innerHTML = `${puntos} Respuestas Correctas`;
