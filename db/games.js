const client = require("./client");

async function createGame({
  title,
  genre,
  release_date,
  price,
  image_path,
  platform,
}) {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
        INSERT INTO games(title, genre, release_date, price, image_path, platform)
        VALUES($1, $2, $3, $4, $5, $6)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
        `,
      [title, genre, release_date, price, image_path, platform]
    );

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
        `);

    const games = await Promise.all(
      gameIds.map((game) => getGameById(game.id))
    );

    return games;
  } catch (err) {
    console.log(err);
  }
}

async function getGamesByGenre(genre) {
  //this wont work with the way tables are currently setup//
  try {
    const { rows } = await client.query(
      `
            SELECT * 
            FROM games 
            WHERE genre = $1
            `,
      [genre]
    );

    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function getGameById(id) {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
    SELECT *
    FROM games
    WHERE id=$1
    `,
      [id]
    );

    return game;
  } catch (err) {
    console.log(err);
  }
}


async function deleteGame(id) {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
        DELETE FROM games
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );

async function updateGame({ id, ...fields }) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}" = $${index + 2}`).join(`, `);

    try {
        const { rows: [game] } = await client.query(`
        UPDATE games
        SET ${setString}
        WHERE id = $1
        RETURNING *
        `, [id, ...Object.values(fields)])

        return game;
    } catch (err) {
        console.log(err);
    }


}




    return game;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {

    createGame,
    getAllGames,
    getGamesByGenre,
    getGameById,
    updateGame,
    deleteGame,

}

