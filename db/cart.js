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