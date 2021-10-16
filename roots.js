const factory = require("./js/factory-function");
module.exports = function routes() {
    const useFactory = factory();
    async function chat(req, res) {
      if(req.session.userId){
        var users = await useFactory.getUser();
        res.redirect("/actualChats");
      } else{
         res.render("login"); 
      }
        
  }
  function home(req, res) {
    res.render("index");
  }
  async function logIn(req,res){
    var name = req.body.username;
    var password = req.body.password;
    var data = await useFactory.logIn(name, password);
    var id = data[0].id;
    console.log(data)
    if(data.length > 0){
        req.session.userId =  id;
        res.redirect("/actualChats");
    } else{
      res.redirect("/chats");
    }
    
  }
  async function register(req,res){
    var name = req.body.username;
    var password = req.body.password;
    await useFactory.register(name, password);
    res.redirect("/actualChats");
  }
  async function actualChats(req,res){
    var users = await useFactory.getAllUsers();
    res.render("chat", {users});
  }
  async function getProfile(req,res){
    var id = req.session.userId;
    var data = await useFactory.getProfile(id);
    var text = [];
    var img;
    for(let key in data){
      if(key == "profile"){
        img = data[key];
      }else if(key == "id"){

      } else{
        text.push({data: data[key], key});
      }
    }
    if(img == undefined){
      img = "https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg.webp"
    }
    if(req.session.userId){
      res.render("user", {img, text});
    } else{
      res.redirect("/chat");
    }
    
  }
  async function update(req,res){
    var id = req.session.userId;
    var username = req.body.username;
    var password = req.body.password;
    var age = req.body.age;
    var gender = req.body.gender;
    var contact = req.body.contact;
    var image = req.body.profile;
    await useFactory.update(username,password,age,gender,contact,image, id);
    setTimeout(()=>{
      res.redirect("/profile");
    },100);
  }
  async function chatting(req,res){
    req.session.userId = 7;
    var userId = req.session.userId;
    var friendId = req.params.id;
    if(userId && friendId ){
      var users = await useFactory.getBothProfiles(userId, friendId);
      var user1 = users.friendUser;
      var user2 = users.mainUser;
      res.render("chatscreen", {user1,user2});
      //res.redirect("/actualChats")
    } else{
      res.redirect("/actualChats");
    }
  }
  return {
    chat,
    home,
    logIn,
    register,
    actualChats,
    getProfile,
    update,
    chatting
  };
};
