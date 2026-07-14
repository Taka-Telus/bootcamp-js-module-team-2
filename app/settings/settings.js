
const save = document.querySelector("#save-changes");
const returnmenú = document.querySelector("#return-menú");
const logout = document.querySelector("#logout");
const btnsave = document.querySelector("#btn-save");
const btnreturnmenú = document.querySelector("#btn-return");
const btnlogout = document.querySelector("#btn-logout");

btnsave.addEventListener("click", () => {
    localStorage.setItem("save", save.value);
});

btnsave.addEventListener("click", () => {

    const save = localStorage.getItem("save");
    if (save) {
         }

});


btnreturnmenú.addEventListener("click", () => {
    localStorage.setItem("returnmenú", returnmenú.value);
    
});


btnreturnmenú.addEventListener("click", () => {
    const returnmenú = localStorage.getItem("returnmenú");
    if (returnmenú) {
        returnmenú.value = returnmenú;
    }
});

btnlogout.addEventListener("click", () => {
    localStorage.removeItem("save");
    localStorage.removeItem("returnmenú");
    logout.value = "";


});
