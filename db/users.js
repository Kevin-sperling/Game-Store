const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ username, password }) {
    
const hashedPassword = await bcrypt.hash(password, 10)

        const { rows = [user] } = await client.query(`
      INSERT INTO users(username, password)
      VALUES($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;  
      `, [username, hashedPassword]);

        delete user.password

        return user;
    
}

async function getUserByName(userName){
    const result = await client.query(`SELECT password, username FROM users where username = $1 LIMIT 1;`, [userName]);

    return result.rows[0]
}


module.exports = {
    createUser,
    //getUser,
    //getUserById,
    getUserByName,
}
