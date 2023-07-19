const express = require("express");

const {
  getAllGames,
  getGamesByGenre,
  createGame,
  updateGame,
  deleteGame,
  getGameById,
} = require("../db/models/games");
const { requireAdmin } = require("./utils");
const isAuthed = require("./middleware/isAuthed");
const isAdmin = require("./middleware/isAdmin");

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

gamesRouter.get("/:gameId", async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const games = await getGameById(gameId);

    res.send(games);
  } catch (error) {
    next(error);
  }
});

gamesRouter.post("/", isAuthed, isAdmin, async (req, res, next) => {
  try {
    const game = createGame({
      title: req.body.title,
      genre: req.body.genre,
      release_date: req.body.release_date,
      price: req.body.price,
      image_path: req.body.image_path,
      platform: req.body.platform,
    });

    res.send(game);
  } catch (error) {
    next(error);
  }
});

gamesRouter.delete("/:gameId", isAuthed, isAdmin, async (req, res, next) => {
  const { gameId } = req.params;

  console.log("reached");

  try {
    const deletedGame = await deleteGame(gameId);

    console.log(deletedGame, "deleted");

    res.send(deletedGame);
  } catch (error) {
    next(error);
  }
});

gamesRouter.patch("/:id", isAuthed, isAdmin, async (req, res, next) => {
  const { gameId } = req.params;
  const { title, genre, release_date, price, image_path, platform } = req.body;

  const updateFields = {};

  if (title) {
    updateFields.title = title;
  }
  if (genre) {
    updateFields.genre = genre;
  }
  if (release_date) {
    updateFields.release_date = release_date;
  }
  if (price) {
    updateFields.price = price;
  }
  if (image_path) {
    updateFields.image_path = image_path;
  }
  if (platform) {
    updateFields.platform = platform;
  }

  try {
    const updatedGame = await updateGame({ id: gameId, ...updateFields });

    res.send(updatedGame);
  } catch (error) {
    next(error);
  }
});

// POST /api/games
gamesRouter.post("/", requireAdmin, async (req, res, next) => {
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

module.exports = gamesRouter;
