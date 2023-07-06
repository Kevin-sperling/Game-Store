const express = require("express");
<<<<<<< HEAD
const {
  getAllGames,
  getGamesByGenre,
  deleteGame,
  createGame,
} = require("../db/games");
=======

const { getAllGames, getGamesByGenre, createGame, updateGame, deleteGame } = require("../db/games");
const { requireAdmin } = require("./utils");

>>>>>>> 22e33c7e18f3f0886f894f8674d52852564aad95
const gamesRouter = express.Router();

// GET /api/games
gamesRouter.get("/", async (req, res, next) => {
  try {
    const games = await getAllGames();

    res.send(games);
  } catch (error) {
    next(error);
  }
});


// GET /api/games/:genre
gamesRouter.get("/:genre", async (req, res, next) => {
  //this wont work with the way tables are currently setup//

gamesRouter.post('/', async (req, res, next) => {

    try {
        const gameData = {
            title: title,
            genre: genre,
            release_date: release_date,
            price: price,
            image_path: image_path,
            platform: platform,
        }

        const game = createGame(gameData);

        res.send(game)
    } catch (error) {
        next(error)
    }

})

gamesRouter.patch('/:id', requireAdmin, async (req, res, next) => {
    const { gameId } = req.params;
    const { title, genre, release_date, price, image_path, platform } = req.body;

    const updateFields = {};

    if (title) {
        updateFields.title = title
    }
    if (genre) {
        updateFields.genre = genre
    }
    if (release_date) {
        updateFields.release_date = release_date
    }
    if (price) {
        updateFields.price = price
    }
    if (image_path) {
        updateFields.image_path = image_path
    }
    if (platform) {
        updateFields.platform = platform
    }

    try {

        const updatedGame = await updateGame({ id: gameId, ...updateFields });

        res.send(updatedGame)

    } catch (error) {
        next(error)
    }

});

gamesRouter.delete('/:id', requireAdmin, async (req, res, next) => {
    const { gameId } = req.params;

    try {
        const deletedGame = await deleteGame(gameId);

        res.send(deletedGame);

    } catch (error) {
        next(error)
    }

})


  const { genre } = req.params;

  try {
    const games = await getGamesByGenre(genre);

    res.send(games);
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
// POST /api/games
gamesRouter.post("/", async (req, res, next) => {
  const { title, genre, release_date, price, image_path, platform } = req.body;

  const gameData = {};

  try {
    gameData.title = title;
    gameData.genre = genre;
    gameData.release_date = release_date;
    gameData.price = price;
    gameData.image_path = image_path;
    gameData.platform = platform;

    const newGame = await createGame(gameData);

    res.send(newGame);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/games/:id
gamesRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedGame = await deleteGame(id);
=======
>>>>>>> 22e33c7e18f3f0886f894f8674d52852564aad95


module.exports = gamesRouter;
