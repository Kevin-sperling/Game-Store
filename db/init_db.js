const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

const { createGame } = require("./models/games");
const { createUser, getUserByUsername } = require("./models/users");
const { createShoppingCart, createGamesCart } = require("./models/cart");

async function dropTables() {
  console.log("Dropping All Tables...");
  client.connect();
  try {
    await client.query(`
    DROP TABLE IF EXISTS games_cart;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function buildTables() {
  // client.connect();
  try {
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
      "shopperId" INTEGER REFERENCES users(id),
      "gamesId" INTEGER REFERENCES games(id),
      price DECIMAL(10, 2),
      quantity INTEGER,
      created_at TIMESTAMP
    );
    
    CREATE TABLE games_cart (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES games(id),
      "cartId" INTEGER REFERENCES cart(id)
    );
    `);

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

const gamesToCreate = [
  {
    id: "1",
    title: "Grand Theft Auto V",
    genre: "Action, Adventure",
    release_date: "2013-09-17",
    price: "59.99",
    image_path:
      "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    platform: "Playstation, Xbox, PC",
  },

  {
    id: "2",
    title: "Portal 2",
    genre: "Puzzle, Shooter",
    release_date: "2011-04-18",
    price: "39.99",
    image_path:
      "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
    platform: "Playstation, Xbox, PC",
  },

  {
    id: "3",
    title: "The Elder Scrolls V: Skyrim",
    genre: "Action, RPG",
    release_date: "2011-11-11",
    price: "49.99",
    image_path:
      "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
    platform: "PC, Nintendo Switch",
  },

  {
    id: "4",
    title: "BioShock Infinite",
    genre: "Action, RPG",
    release_date: "2013-03-26",
    price: "49.99",
    image_path:
      "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg",
    platform: "Playstation, Xbox, PC, Nintendo Switch",
  },

  {
    id: "5",
    title: "Red Dead Redemption 2",
    genre: "Action, Adventure",
    release_date: "2018-10-26",
    price: "59.99",
    image_path:
      "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    platform: "Playstation, Xbox, PC",
  },

  {
    id: "6",
    title: "Borderlands 2",
    genre: "Action, Shooter, RPG",
    release_date: "2012-09-18",
    price: "59.99",
    image_path:
      "https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg",
    platform: "Playstation, PC",
  },

  {
    id: "7",
    title: "Half-Life 2",
    genre: "Action, Shooter",
    release_date: "2004-11-16",
    price: "29.99",
    image_path:
      "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg",
    platform: "PC",
  },

  {
    id: "8",
    title: "Limbo",
    genre: "Action, Shooter",
    release_date: "2010-07-21",
    price: "29.99",
    image_path:
      "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg",
    platform: "PC, Xbox, Nintendo Switch",
  },

  {
    id: "9",
    title: "God of War 2",
    genre: "Indie, Adventure, Puzzle",
    release_date: "2018-04-20",
    price: "69.99",
    image_path:
      "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
    platform: "PC, Playstation",
  },

  {
    id: "10",
    title: "Destiny 2",
    genre: "Action, Shooter",
    release_date: "2017-09-06",
    price: "59.99",
    image_path:
      "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg",
    platform: "Playstation, Xbox, PC",
  },

  {
    id: "11",
    title: "Team Fortress 2",
    genre: "Action, Shooter",
    release_date: "2007-10-10",
    price: "39.99",
    image_path:
      "https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg",
    platform: "PC",
  },

  {
    id: "12",
    title: "DOOM",
    genre: "Action, Shooter",
    release_date: "2016-05-13",
    price: "39.99",
    image_path:
      "https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg",
    platform: "Xbox, Nintendo Switch, PC",
  },
];

const usersToCreate = [
  {
    username: "albert",
    password: "bertie99",
    email: "albert@home.com",
    is_admin: false,
  },
  {
    username: "sandra123",
    password: "sandra123",
    email: "sandra@home.com",
    is_admin: false,
  },
  {
    username: "glamgal",
    password: "glamgal123",
    email: "glamgal@home.com",
    is_admin: false,
  },
  {
    username: "administrator",
    password: "password",
    email: "admin@home.com",
    is_admin: true,
  },
];

async function createInitialUsers() {
  try {
    console.log("creating initial users");
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:", users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialGames() {
  try {
    console.log("creating initial games");

    const games = await Promise.all(gamesToCreate.map(createGame));

    console.log("games created:", games);
    console.log("Finished creating games!");
  } catch (error) {
    console.error("Error creating games!");
    throw error;
  }
}

async function createInitialCart() {
  try {
    console.log("creating initial cart");
    const user = await getUserByUsername(usersToCreate[0].username);
    console.log("user", user);

    const shoppingCartToCreate = [
      { id: 1, gamesId: 1, shopperId: user.id, orderTotal: 99999, quantity: 2 },
    ];
    const shoppingCarts = await Promise.all(
      shoppingCartToCreate.map((shoppingCart) =>
        createShoppingCart(shoppingCart)
      )
    );
    console.log("Shopping Cart Created:", shoppingCarts);

    const gamesOnShoppingCartToCreate = [
      { productId: 1, cartId: shoppingCarts[0].id },
    ];
    const gamesOnCart = await Promise.all(
      gamesOnShoppingCartToCreate.map((gamesCart) => createGamesCart(gamesCart))
    );
    console.log("products on cart ===>", gamesOnCart);
    console.log("Finished creating shopping carts");
  } catch (error) {
    console.error("Error creating shopping carts!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    //await client.connect();
    await dropTables();
    await buildTables();
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    await createInitialUsers();
    await createInitialGames();
    await createInitialCart();
  } catch (error) {
    throw error;
  }
}

rebuildDB()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
