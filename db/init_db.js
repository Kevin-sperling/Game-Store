const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

const { createGame } = require("./games");
const { createUser } = require("./users");

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
      password varchar(255) NOT NULL,
      email varchar(255) UNIQUE NOT NULL,
      is_admin BOOLEAN NOT NULL DEFAULT false
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
    console.log("creating initial games");

    const gamesToCreate = [
      {
        id: "1",
        title: "Grand Theft Auto V",
        genres: "Action, Adventure",
        release_date: "2013-09-17",
        price: "59.99",
        image_path:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        platform: "Playstation, Xbox, PC",
      },

      {
        id: "2",
        title: "Portal 2",
        genres: "Puzzle, Shooter",
        release_date: "2011-04-18",
        price: "39.99",
        image_path:
          "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
        platform: "Playstation, Xbox, PC",
      },

      {
        id: "3",
        title: "The Elder Scrolls V: Skyrim",
        genres: "Action, RPG",
        release_date: "2011-11-11",
        price: "49.99",
        image_path:
          "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
        platform: "PC, Nintendo Switch",
      },

      {
        id: "4",
        title: "BioShock Infinite",
        genres: "Action, RPG",
        release_date: "2013-03-26",
        price: "49.99",
        image_path:
          "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg",
        platform: "Playstation, Xbox, PC, Nintendo Switch",
      },

      {
        id: "5",
        title: "Red Dead Redemption 2",
        genres: "Action, Adventure",
        release_date: "2018-10-26",
        price: "59.99",
        image_path:
          "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
        platform: "Playstation, Xbox, PC",
      },

      {
        id: "6",
        title: "Borderlands 2",
        genres: "Action, Shooter, RPG",
        release_date: "2012-09-18",
        price: "59.99",
        image_path:
          "https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg",
        platform: "Playstation, PC",
      },

      {
        id: "7",
        title: "Half-Life 2",
        genres: "Action, Shooter",
        release_date: "2004-11-16",
        price: "29.99",
        image_path:
          "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg",
        platform: "PC",
      },

      {
        id: "8",
        title: "Limbo",
        genres: "Action, Shooter",
        release_date: "2010-07-21",
        price: "29.99",
        image_path:
          "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg",
        platform: "PC, Xbox, Nintendo Switch",
      },

      {
        id: "9",
        title: "God of War 2",
        genres: "Indie, Adventure, Puzzle",
        release_date: "2018-04-20",
        price: "69.99",
        image_path:
          "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
        platform: "PC, Playstation",
      },

      {
        id: "10",
        title: "Destiny 2",
        genres: "Action, Shooter",
        release_date: "2017-09-06",
        price: "59.99",
        image_path:
          "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg",
        platform: "Playstation, Xbox, PC",
      },

      {
        id: "11",
        title: "Team Fortress 2",
        genres: "Action, Shooter",
        release_date: "2007-10-10",
        price: "39.99",
        image_path:
          "https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg",
        platform: "PC",
      },

      {
        id: "12",
        title: "DOOM",
        genres: "Action, Shooter",
        release_date: "2016-05-13",
        price: "39.99",
        image_path:
          "https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg",
        platform: "Xbox, Nintendo Switch, PC",
      },
    ];

    const games = await Promise.all(gamesToCreate.map(createGame));

    console.log("games created:", games);

    try {
      const usersToCreate = [
        {
          username: "albert",
          password: "bertie99",
          email: "albert@home.com",
          is_admin: "false",
        },
        {
          username: "sandra",
          password: "sandra123",
          email: "sandra@home.com",
          is_admin: "false",
        },
        {
          username: "glamgal",
          password: "glamgal123",
          email: "glamgal@home.com",
          is_admin: "false",
        },
        {
          username: "admin",
          password: "password",
          email: "admin@home.com",
          is_admin: "true",
        },
      ];
      const users = await Promise.all(usersToCreate.map(createUser));

      console.log("Users created:", users);
      console.log("Finished creating users!");
    } catch (error) {
      console.error("Error creating users!");
      throw error;
    }

    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    console.error("error creating games");
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
