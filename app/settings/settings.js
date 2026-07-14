
const save = document.querySelector("#save-changes");
const returnmenú = document.querySelector("#return-menú");
const logout = document.querySelector("#logout");
const btnsave = document.querySelector("#btn-save");
const btnreturnmenú = document.querySelector("#btn-return");
const btnlogout = document.querySelector("#btn-logout");



document.getElementById('btnsave').addEventListener('click', function() {
    
    alert('Cambios guardados con éxito.');
});


document.getElementById('btnreturnmenú').addEventListener('click', function() {
    // Cambia 'menu.html' por la ruta real de tu página de menú
    window.location.href = 'home-page.html'; 
});

// 3. Cerrar sesión
document.getElementById('btnlogout').addEventListener('click', function() {
    // eliminas el token de autenticación (ej. localStorage o cookies)
    localStorage.removeItem('usuarioToken'); 
    
    
    window.location.href = 'login.html'; 
});
