const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const body = require("body-parser");
const handlebars = require("express-handlebars");
const factory = require("./roots");
const useFactory = factory();
const session = require("express-session");


app.use(session({secret: "keyboard cat",resave: true, saveUninitialized: false, cookie: {maxAge: 200000}}));
app.use(body.urlencoded({extended: false}));
app.use(body.json());
app.engine("handlebars", handlebars({defaultLayout: "main", layoutsDir: "views/layouts"}));
app.set("view engine", "handlebars");
app.use(express.static("public"))
app.get("/", useFactory.home);
app.get("/chat", useFactory.chat);
app.post("/login", useFactory.logIn);
app.post("/register",useFactory.register);
app.get("/actualChats", useFactory.actualChats);
app.get("/profile", useFactory.getProfile);
app.post("/update", useFactory.update)
app.listen(PORT, ()=>{
    console.log(">>>....server started on port " + PORT)
});