const {Pool} = require("pg");
var pool;
var connectionString = process.env.DATABASE_URL;
if(connectionString){
    pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}})
} else{
    pool = new Pool({
        user: "postgres",database: "users",host: "localhost",port: 5432,password: "mthobisi"
    });
}
const db = require("./database");
module.exports = function factory(){
    var error = ""
    const useDb = db(pool);
    async function getUser(){
        var users = await useDb.getUsers();
        return users;
    }
    async function logIn(name, password){
        if(name && password){
            var data = await useDb.logIn(name, password);
            error = " "
            return  data;
        } else{
            error = "Please enter data"
        }
    }
    async function register(name,password){
        var checker = await useDb.checker(name, password);
        if(checker.length > 0){
            error = "User already exist";
        } else{
            await useDb.setUser(name, password);
            error = " "
        }
    }
    async function getAllUsers(){
        var users = await useDb.getUsers();
        var str = [];
        if(users.length > 0){
            users.forEach(element =>{
                var strr = JSON.stringify(element);
                str.push(strr);
            })
        }else{}
        var fullStr = JSON.stringify(str);
        return fullStr;
    }
    async function getProfile(id){
        var user = await useDb.getProfile(id);
       return await user[0];
    }
    async function update(username,password,age,gender,contact,image, id){
        if(id){
            useDb.update(username,password,age,gender,contact,image, id);
        }
    }
    return{
        getUser,
        logIn,
        register,
        getAllUsers,
        getProfile,
        update
    }
}