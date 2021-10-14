var arg = [];
function getData() {
  var input = document.querySelector(".data").value;
  var changedArray = JSON.parse(input);
  changedArray.forEach((element) => {
    var dat = JSON.parse(element);
    arg.push(dat);
  });
}
getData();
function createElements(array) {
  var parent = document.querySelector(".results");
  parent.textContent = " ";
  if (array.length == 0) {
    var span = document.createElement("span");
    span.innerHTML = "There is no user with that name!";
    span.style.color = "red";
    parent.appendChild(span);
  } else {
    array.forEach((element) => {
      var br = document.createElement("br");
      var profiles = document.createElement("div");
      var pic = document.createElement("div");
      var text = document.createElement("div");
      var h2 = document.createElement("h2");
      var p1 = document.createElement("p");
      var p2 = document.createElement("p");
      var img = document.createElement("img");
      var input = document.createElement("input");
      input.setAttribute("class", "id");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", "id");
      profiles.setAttribute("class", "profiles");
      pic.setAttribute("class", "pic");
      text.setAttribute("class", "text");
      profiles.appendChild(pic);
      profiles.appendChild(text);
      pic.appendChild(img);
      text.appendChild(input);
      text.appendChild(h2);
      text.appendChild(br);
      text.appendChild(p1);
      text.appendChild(br);
      text.appendChild(p2);
      if(element.profile == null){
        img.src = "https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg.webp"
      } else{
        img.src = element.profile;
      }
      h2.innerHTML = element.username;
      p1.innerHTML = element.age;
      p2.innerHTML = element.gender;
      input.value = element.id;
      parent.appendChild(profiles);
    });
  }
  makeProfile();
}

var input = document.querySelector(".changes");
input.addEventListener("keyup", () => {
  var name = input.value;
  if (name) {
    var names = [];
    arg.forEach((element) => {
      if (element.username.includes(name)) {
        names.push(element);
      } else {
      }
    });
  }
  createElements(names);
});



/////getting text content

var div = document.querySelector(".profiles");
function makeProfile(){
    div.addEventListener("click", ()=>{
    console.log(div);
});
