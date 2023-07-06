const express = require("express");
const { getAllGames, getGamesByGenre, createGame, updateGame, deleteGame } = require("../db/games");
const { requireAdmin } = require("./utils");
const gamesRouter = express.Router();

gamesRouter.get('/', async (req, res, next) => {
    try {
        const games = await getAllGames();

        res.send(games)
    } catch (error) {
        next(error)
    }
});

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

gamesRouter.get('/:genre', async (req, res, next) => {

    //this wont work with the way tables are currently setup//

    const { genre } = req.params

    try {
        const games = await getGamesByGenre(genre)

        res.send(games);

    } catch (error) {
        next(error)
    }

})



module.exports = gamesRouter;