const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ username, password, email }) {

  const hashedPassword = await bcrypt.hash(password, 10)

  const { rows: [user] } = await client.query(`
      INSERT INTO users(username, password, email)
      VALUES($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;  
      `, [username, hashedPassword, email]);

  delete user.password

  return user;

}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1
    `, [userId]);

    if (user) {
      delete user.password;
    }

    return user;

  } catch (error) {
    throw error;
  }


}



async function getUserByName(userName) {
  const result = await client.query(`SELECT password, username FROM users where username = $1 LIMIT 1;`, [userName]);

  return result.rows[0]
}


module.exports = {
  createUser,
  getUserById,
  getUserByName,
}
