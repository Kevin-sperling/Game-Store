const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

const { createGame } = require('./games');


async function buildTables() {
  try {
    client.connect();

    await client.query(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS users;
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
      title VARCHAR(255) UNIQUE NOT NULL,
      genre VARCHAR(100),
      release_date DATE,
      price DECIMAL(10, 2),
      image_path VARCHAR(255),
      platform VARCHAR(100)
    );

    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      product_id INT REFERENCES games(id),
      quantity INT,
      price DECIMAL(10, 2),
      created_at TIMESTAMP
    );

    
    `);

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {

    console.log('creating initial games');

    const gamesToCreate = [

      {
        title: "Grand Theft Auto V",
        genres: "Action, Adventure",
        release_date: "2013-09-17",
        price: "59.99",
        image_path: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        platforms: "Playstation, Xbox, PC"
      },

      {
        title: "Portal 2",
        genres: "Puzzle, Shooter",
        release_date: "2011-04-18",
        price: "39.99",
        image_path: "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
        platforms: "Playstation, Xbox, PC"
      },

      {
        title: "The Elder Scrolls V: Skyrim",
        genres: "Action, RPG",
        release_date: "2011-11-11",
        price: "49.99",
        image_path: "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
        platforms: "PC, Nintendo Switch"
      },

      {
        title: "BioShock Infinite",
        genres: "Action, RPG",
        release_date: "2013-03-26",
        price: "49.99",
        image_path: "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg",
        platforms: "Playstation, Xbox, PC, Nintendo Switch"
      },

      {
        title: "Red Dead Redemption 2",
        genres: "Action, Adventure",
        release_date: "2018-10-26",
        price: "59.99",
        image_path: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
        platforms: "Playstation, Xbox, PC"
      },

      {
        title: "Borderlands 2",
        genres: "Action, Shooter, RPG",
        release_date: "2012-09-18",
        price: "59.99",
        image_path: "https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg",
        platforms: "Playstation, PC"
      },

      {
        title: "Half-Life 2",
        genres: "Action, Shooter",
        release_date: "2004-11-16",
        price: "29.99",
        image_path: "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg",
        platforms: "PC"
      },

      {
        title: "Limbo",
        genres: "Action, Shooter",
        release_date: "2010-07-21",
        price: "29.99",
        image_path: "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg",
        platforms: "PC, Xbox, Nintendo Switch"
      },

      {
        title: "God of War 2",
        genres: "Indie, Adventure, Puzzle",
        release_date: "2018-04-20",
        price: "69.99",
        image_path: "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
        platforms: "PC, Playstation"
      },

      {
        title: "Destiny 2",
        genres: "Action, Shooter",
        release_date: "2017-09-06",
        price: "59.99",
        image_path: "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg",
        platforms: "Playstation, Xbox, PC"
      },

      {
        title: "Team Fortress 2",
        genres: "Action, Shooter",
        release_date: "2007-10-10",
        price: "39.99",
        image_path: "https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg",
        platforms: "PC"
      },

      {
        title: "DOOM",
        genres: "Action, Shooter",
        release_date: "2016-05-13",
        price: "39.99",
        image_path: "https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg",
        platforms: "Xbox, Nintendo Switch, PC"
      },

    ]

    const games = await Promise.all(gamesToCreate.map(createGame));

    console.log("games created:", games)


    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    console.error('error creating games')
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
