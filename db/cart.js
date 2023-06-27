const client = require("./client");

async function addGameToCart({ gameId }) {
    try {
        const { rows } = await client.query(`
        INSERT INTO cart (gameId)
        VALUES ($1)
        RETURNING *
        `[gameId])

        return rows;
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

async function viewCartItems({ userId }) {
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