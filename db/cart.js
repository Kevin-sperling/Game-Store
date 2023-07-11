const client = require("./client");

async function addGameToCart({ userId, gameId, quantity }) {


    try {
        const { rows: [game] } = await client.query(`
        INSERT INTO cart (user_id, product_id, quantity, price, created_at)
        VALUES ($1, $2, $3, (SELECT price FROM games WHERE id = $2), CURRENT_TIMESTAMP)
        RETURNING *;
      `, [userId, gameId, quantity]);

        return game;

    } catch (err) {
        console.log(err);
    }
}

async function removeGameFromCart({ gameId }) {
    try {
        const { rows } = await client.query(`
            UPDATE cart
            SET quantity = quantity - 1
            WHERE gameId = $1 AND quantity > 0
            RETURNING *;
        `, [gameId]);

        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function viewCartItems(userId) {

    try {
        const { rows } = await client.query(`
            SELECT *
            FROM cart 
            WHERE user_id = $1;
        `, [userId]);

        return rows;
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    addGameToCart,
    removeGameFromCart,
    viewCartItems
}