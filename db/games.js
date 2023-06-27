const client = require("./client");

async function createGame({ title, genre, release_date, price, platform }) {
    try {
        const { rows: [game] } = await client.query(`
        INSERT INTO games(title, genre, release_date, price, platform)
        VALUES($1, $2, $3, $4, $5)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        ` [title, genre, release_date, price, platform]);

        return game;

    } catch (err) {
        console.log(err);
    }
}

async function getAllGames() {
    try {
        const { rows: gameIds } = await client.query(`
        SELECT *
        FROM games        
        `)

        const games = await Promise.all(gameIds.map(
            game => getGameById(game.id)
        ));

        return games
    } catch (err) {
        console.log(err);
    }
}

async function getGameById(id) {
    try {
        const { rows: [game] } = await client.query(`
    SELECT *
    FROM games
    WHERE id=$1
    `, [id]);

        return game;
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    createGame,
    getAllGames,
    getGameById

}