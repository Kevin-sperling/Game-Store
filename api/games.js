const express = require("express");
const {
  getAllGames,
  getGamesByGenre,
  deleteGame,
  createGame,
} = require("../db/games");
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

  const { genre } = req.params;

  try {
    const games = await getGamesByGenre(genre);

    res.send(games);
  } catch (error) {
    next(error);
  }
});

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

    res.send(deletedGame);
  } catch (error) {
    next(error);
  }
});

module.exports = gamesRouter;
