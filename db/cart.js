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

async function increaseQuantity({ gameTitle }) {
    try {
        const { rows } = await client.query(`
        UPDATE cart
        SET quantity = quantity + 1
        WHERE product_id = (
            SELECT id
            FROM games
            WHERE title = '${gameTitle}'
        )
        `, [gameTitle]);
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
        const { rows } = await client.query(`
        SELECT c.id AS cart_id, g.title, g.genre, g.release_date, g.price, g.image_path, g.platform
        FROM cart c
        JOIN games g ON c.product_id = g.id
        WHERE c.user_id = $1;
      `, [userId]);


        return rows;
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    addGameToCart,
    removeGameFromCart,
    viewGamesinCart,
    increaseQuantity
}