const client = require("../client");
const bcrypt = require("bcrypt");

async function createUser({ username, password, email, is_admin }) {
  console.log("password", password);
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
  console.log("user", user);
  return user;
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username=$1
    `,
      [username]
    );

    if (user) {
      delete user.password;
    }

    return user;
  } catch (error) {
    throw error;
  }
}
// async function getUserById(userId) {
//   try {
//     const {
//       rows: [user],
//     } = await client.query(
//       `
//     SELECT *
//     FROM users
//     WHERE id=$1
//     `,
//       [userId]
//     );

//     if (user) {
//       delete user.password;
//     }

//     return user;
//   } catch (error) {
//     throw error;
//   }
// }
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
    `SELECT password, username, id FROM users where username = $1 LIMIT 1;`,
    [username]
  );

  return result.rows[0];
}

async function getAllUsers() {
  const { rows } = await client.query(`
  SELECT *
  FROM users
  `);

  return rows;
}

async function deleteUser(userId) {
  const {
    rows: [user],
  } = await client.query(
    `
  DELETE FROM users
  WHERE id = $1
  RETURNING *
  `,
    [userId]
  );

  return user;
}

async function updateUser({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 2}`)
    .join(`, `);

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id = $1
      RETURNING *;
    `,
      [id, ...Object.values(fields)]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserIdByUserame(username) {
  const {
    rows: [user],
  } = await client.query(`SELECT id FROM users where username = $1 ;`, [
    username,
  ]);

  return user;
}

module.exports = {
  createUser,
  getUserById,
  getUserByName,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserIdByUserame,
  getUserByUsername,
};
