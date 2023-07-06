const express = require("express");
const { getAllGames, getGamesByGenre, deleteGame } = require("../db/games");
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
