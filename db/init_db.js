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
      id INT PRIMARY KEY,
      title VARCHAR(255),
      genre VARCHAR(100),
      release_date DATE,
      price DECIMAL(10, 2),
      platform VARCHAR(100)
    );

    CREATE TABLE cart (
      id INT PRIMARY KEY,
      user_id INT,
      product_id INT,
      quantity INT,
      price DECIMAL(10, 2),
      created_at TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES games(id)
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
