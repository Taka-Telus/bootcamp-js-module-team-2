const logininput = document.querySelector("#login-input");
const saludo = document.querySelector("#saludo");
const loginbutton = document.querySelector("#login-button");

loginbutton.addEventListener("click", () => {
    localStorage.setItem("nombre", logininput.value.trim());
});

loginbutton.addEventListener("click", () => {

    const nombre = localStorage.getItem("nombre");
    if (nombre) {
        saludo.textContent = `Hola, ${nombre}!`;
    }
});

loginbutton.addEventListener("click", () => {

    window.location.href = "../home-page/home-page.html"; // Cambiá la ruta del menú está en otro lugar

});