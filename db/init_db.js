const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();

    await client.query(`
    DROP TABLES IF EXISTS users;
    DROP TABLES IF EXISTS games;
    DROP TABLES IF EXISTS cart;
    `);



    // drop tables in correct order
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
    );

    CREATE TABLE games (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      "gameId" INTERGER REFERENCES game(id)
    );

    
    `);

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
