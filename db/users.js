const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ username, password, email, is_admin }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const {
    rows: [user],
  } = await client.query(
    `
      INSERT INTO users(username, password, email, is_admin)
      VALUES($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;  
      `,
    [username, hashedPassword, email, is_admin]
  );

  delete user.password;

  return user;
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE id=$1
    `,
      [userId]
    );

    if (user) {
      delete user.password;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByName(username) {
  const result = await client.query(
    `SELECT password, username FROM users where username = $1 LIMIT 1;`,
    [username]
  );

  return result.rows[0];
}

module.exports = {
  createUser,
  getUserById,
  getUserByName,
};
