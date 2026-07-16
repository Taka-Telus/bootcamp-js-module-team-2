

const btnSave = document.getElementById("save-changes");
const btnReturn = document.getElementById("return-menu");
const btnLogout = document.getElementById("logout");

const sound = document.getElementById("togglesound");
const vibration = document.getElementById("togglevibration");

// Cargar ajustes guardados al abrir la página
window.addEventListener("load", () => {
    const soundSaved = localStorage.getItem("sound");
    const vibrationSaved = localStorage.getItem("vibration");

    if (soundSaved !== null) {
        sound.checked = soundSaved === "true";
    }

    if (vibrationSaved !== null) {
        vibration.checked = vibrationSaved === "true";
    }
});

// Guardar cambios
btnSave.addEventListener("click", () => {

    localStorage.setItem("sound", sound.checked);
    localStorage.setItem("vibration", vibration.checked);

    alert("Cambios guardados correctamente.");
});

// Volver al menú
btnReturn.addEventListener("click", () => {

    window.location.href = "../home-page/home-page.html"; // Ruta del menú 
});

// Cerrar sesión
btnLogout.addEventListener("click", () => {

    // Se eliminan todos los datos guardados en el navegador
    localStorage.clear();




    window.location.href = "../login/login.html"; // Ruta del login
})
