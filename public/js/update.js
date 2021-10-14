var input = document.querySelector("#file");
var dat = document.querySelector("#profile");
input.addEventListener("change", ()=>{
    var file = input.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(event){
        var url = event.target.result;
        console.log(url)
        dat.value = url;
    }
    fileReader.readAsDataURL(file);
});
function makechanges(){
    var btn = document.querySelector(".btnedit");
    btn.style.display = "none";
    var form = document.querySelector(".form");
    form.style.display = "block";
};