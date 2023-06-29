const express = require("express");
const { getAllGames, getGamesByGenre } = require("../db/games");
const gamesRouter = express.Router();

gamesRouter.get('/', async (req, res, next) => {
    try {
        const games = await getAllGames();

        res.send(games)
    } catch (error) {
        next(error)
    }
});


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