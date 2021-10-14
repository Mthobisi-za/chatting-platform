function signUp(){
    var form = document.querySelector(".formone");
    form.style.display = "none";
    var secondForm = document.querySelector(".formtwo");
    secondForm.style.display = "block";
}
function login(){
    var form = document.querySelector(".formone");
    form.style.display = "block";
    var secondForm = document.querySelector(".formtwo");
    secondForm.style.display = "none";
}
