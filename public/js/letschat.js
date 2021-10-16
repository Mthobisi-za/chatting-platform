function getData(){
    db.collection("chats").get().then(element =>{
        element.forEach(data =>{
            var actualData = data.data();
            console.log(actualData)
        })
    })
}
getData();
function sortIds(){
    var user1 = document.getElementsByClassName("users1").value;
    var user2 =  document.getElementsByClassName("users2").value;
    console.log(user1);
    console.log(user2);

    var numbers = [user1, user2];
    var ascending = numbers.sort(function(a,b){return a-b;});
    console.log(ascending);
    return ascending;
}
setTimeout(function(){
    sortIds();
}, 100)
