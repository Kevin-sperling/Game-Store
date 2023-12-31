const client = require("../client");

async function createShoppingCart({ shopperId, quantity, gamesId }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        INSERT INTO cart ("shopperId", quantity, "gamesId")
        VALUES ($1, $2, $3)
        RETURNING *;
    `,
      [shopperId, quantity, gamesId]
    );

    return cart;
  } catch (err) {
    console.log(err);
  }
}

const getShoppingCart = async (cartId) => {
  try {
    const { rows: games } = await client.query(`
      SELECT games_cart.*, games.* FROM games_cart 
      JOIN games ON games_cart."productId" = games.id
      WHERE games_cart."cartId" = ${cartId}
      `);

    return games;
  } catch (error) {
    throw error;
  }
};

const getCartByShopperId = async () => {
  try {
    const { rows: cart } = await client.query(`
      SELECT cart."shopperId" as "cartId", games_cart.*
      FROM games_cart
      JOIN cart
      ON games_cart."cartId" = cart."shopperId"
      `);

    const userCartWithGames = await attachProductsToProductCart(cart);

    return userCartWithGames;
  } catch (error) {
    throw error;
  }
};

async function createGamesCart({ productId, cartId }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO games_cart ("productId", "cartId")
        VALUES ($1, $2)
        RETURNING *;
    `,
      [productId, cartId]
    );

    return rows;
  } catch (err) {
    console.log(err);
  }
}

const getShoppingCartItemsByUser = async (id) => {
  try {
    const {
      rows: [shopperId],
    } = await client.query(
      `
          SELECT * FROM cart 
          WHERE "shopperId"=$1;
      `,
      [id]
    );

    if (!shopperId) {
      return [];
    }

    return shopperId;
  } catch (error) {
    throw error;
  }
};

async function updateCart({ id, orderTotal, quantity }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    if (setString.length < 0) return undefined;

    const {
      rows: [newShoppingCart],
    } = await client.query(
      `
       UPDATE games
       SET ${setString}
       WHERE id=${fields.id}
       RETURNING *;
       `,
      Object.values(fields)
    );
    return newShoppingCart;
  } catch (error) {
    throw error;
  }
}

async function getCartItemById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * FROM cart WHERE id = ($1);
      `,
      [id]
    );
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const destroyShoppingCartItem = async (id) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          DELETE FROM cart
          WHERE "productId"=$1
          RETURNING *
          `,
      [id]
    );

    return product;
  } catch (error) {
    throw error;
  }
};

async function addGameToCart({ shopperId, gameId, quantity, price }) {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
        INSERT INTO cart ("shopperId", "gamesId", quantity, price, created_at)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        RETURNING *;
      `,
      [shopperId, gameId, quantity, price]
    );

    return game;
  } catch (err) {
    console.log(err);
  }
}

async function increaseQuantity({ gameTitle }) {
  try {
    const { rows } = await client.query(
      `
        UPDATE cart
        SET quantity = quantity + 1
        WHERE product_id = (
            SELECT id
            FROM games
            WHERE title = '${gameTitle}'
        )
        `,
      [gameTitle]
    );
  } catch (err) {
    console.log(err);
  }
}

async function removeGameFromCart({ userId, cartId }) {
  try {
    const { rows } = await client.query(
      `
        DELETE FROM cart
        WHERE id = $1
        AND user_id = $2
        RETURNING *;
        `,
      [cartId, userId]
    );

    return rows;
  } catch (err) {
    console.log(err);
  }
}

// async function viewCartItems(userId) {

//     try {
//         const { rows } = await client.query(`
//             SELECT *
//             FROM cart
//             WHERE user_id = $1;
//         `, [userId]);

//         return rows;
//     } catch (err) {
//         console.log(err);
//     }
// }

async function viewGamesinCart(userId) {
  try {
    const { rows } = await client.query(
      `
        SELECT c.id AS cart_id, g.title, g.genre, g.release_date, g.price, g.image_path, g.platform
        FROM cart c
        JOIN games g ON c.product_id = g.id
        WHERE c.user_id = $1;
      `,
      [userId]
    );

    return rows;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createShoppingCart,
  getShoppingCart,
  getCartByShopperId,
  createGamesCart,
  getShoppingCartItemsByUser,
  updateCart,
  getCartItemById,
  destroyShoppingCartItem,
  addGameToCart,
  removeGameFromCart,
  viewGamesinCart,
  increaseQuantity,
};
