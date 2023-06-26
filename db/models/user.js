// grab our db client connection to use with our adapters
const client = require('../client');

const { getUserById } = require('../users.js')

module.exports = {
  // add your database adapter fns here
  getAllUsers,
};

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */

  try {
    const { rows: userIds } = await client.query(`
    SELECT id
    FROM users
    `);

    const users = await Promise.all(userIds.map(
      user => getUserById(user.Id)
    ))

    return users;
  } catch (err) {
    console.error(err)
  }
}
