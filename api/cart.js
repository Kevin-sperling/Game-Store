const express = require("express");
const { requireUser } = require("./utils");
const { viewCartItems, addGameToCart, removeGameFromCart, viewGamesinCart, increaseQuantity } = require("../db/cart");
const cartRouter = express.Router();

cartRouter.get('/:userId', async (req, res, next) => {

    const { userId } = req.params;

    try {
        const cart = await viewGamesinCart(userId);

        res.send(cart)


    } catch (err) {
        console.log(err);
    }
})

cartRouter.post('/:userId', async (req, res, next) => {

    const { userId } = req.params;
    const { gameId, quantity } = req.body

    try {
        const addGame = await addGameToCart({ userId, gameId, quantity })

        res.send(addGame);

    } catch (err) {
        console.log(err);
    }


});

cartRouter.post('/:userId/:gameTitle', async (req, res, next) => {

    const { userId, gameTitle } = req.params;
    // const { gameId, quantity } = req.body

    try {
        const addGame = await increaseQuantity({ gameTitle })

        res.send(addGame);

    } catch (err) {
        console.log(err);
    }


});

cartRouter.delete('/:userId/:cartId', async (req, res, next) => {
    const { userId, cartId } = req.params;

    try {
        const removeGame = await removeGameFromCart({ userId, cartId })

        res.send(removeGame);

    } catch (err) {
        console.log(err);
    }


});



module.exports = cartRouter;