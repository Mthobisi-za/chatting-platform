module.exports = function db(pool){
    async function getUsers(){
        var data = await pool.query("select * from users");
        return await data.rows;
    }
    async function setUser(name, password, profile){
           await pool.query("insert into users(username, password, profile) values($1, $2, $3)", [name, password, profile]);
    }
    async function logIn(name,password){
        var data = await pool.query("select username, password, id from users where username = $1 and password = $2", [name, password]);
        //await pool.query("insert into users(username, password) values($1, $2)", [name, password]);
        return await data.rows;
    }
    async function checker(name,password){
        var data = await pool.query("select username, password, id from users where username = $1 and password = $2", [name, password]);
        return await data.rows;
    }
    async function getProfile(id){
        var user = await pool.query("select * from users where id = $1", [id]);
        return await user.rows;
    }
    async function update(username, password, age, gender, contact, image, id){
        await pool.query("update users set username = $1, password = $2, age = $3, gender=$4, contact = $5, profile = $6 where id =  $7", [username, password, age, gender, contact, image, id]);
    }
    async function getBothProfiles(userId, friendId){
        var userId = ((await pool.query("select * from users where id = $1", [userId])).rows)[0];
        var friend = ((await pool.query("select * from users where id = $1", [friendId])).rows)[0];
        return {
            mainUser: userId,
            friendUser: friend
        }
    }
    return{
        getUsers,
        setUser,
        logIn,
        checker,
        getProfile,
        update,
        getBothProfiles
    }
}