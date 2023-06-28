const express = require("express");
const { requireUser } = require("./utils");
const { viewCartItems, addGameToCart, removeGameFromCart } = require("../db/cart");
const cartRouter = express.Router();

cartRouter.get('/:userId', requireUser, async (req, res, next) => {
    const { userId } = req.params;

    try {
        const cart = await viewCartItems(userId)

        res.send(cart)


    } catch (err) {
        console.log(err);
    }
})

cartRouter.post('/:userId', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const { gameId } = req.body

    try {
        const addGame = await addGameToCart(gameId)

        res.send(addGame);

    } catch (err) {
        console.log(err);
    }


});

cartRouter.delete('/:userId', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const { gameId } = req.body;

    try {
        const removeGame = await removeGameFromCart(gameId)

        res.send(removeGame);

    } catch (err) {
        console.log(err);
    }


});



module.exports = cartRouter;