const express = require("express");
const { requireUser } = require("./utils");
const cartRouter = express.Router();
const {
  // viewCartItems,
  // addGameToCart,
  // removeGameFromCart,
  // viewGamesinCart,
  // increaseQuantity,
  getShoppingCartItemsByUser,
  getShoppingCart,
  addGameToCart,
} = require("../db/models/cart");
const { getGameById } = require("../db");

cartRouter.use((req, res, next) => {
  console.log("A request is being made to /cart");
  next();
});

cartRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const user = req.user;
    const id = user.id;
    const cart = req.body;
    console.log("cart", cart);
    const shoppingCart = await getShoppingCart(id);
    console.log("shoppingCart", shoppingCart);
    return res.send(shoppingCart);
  } catch (err) {
    console.log(err);
  }
});

cartRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const shopperId = req.user.id;

    const { price, quantity, gamesId } = req.body;
    const shoppingCart = await addGameToCart({
      shopperId,
      gamesId,
      quantity,
      price,
    });
    console.log(shoppingCart);
    res.send(shoppingCart);
  } catch (error) {
    return next(error);
  }
});

cartRouter.patch("/:shoppingCartId", requireUser, async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const { title, genre, release_date, price, image_path, platform } =
      req.body;
    const game = await getShoppingCartItemsByUser(gameId);

    if (req.user.id !== game.userId) {
      return next({
        name: "UnauthorizedUserError",
        message: "You cannot update a game that is not in your cart",
      });
    }

    const updateCart = await updateCart({
      id: productId,
      title,
      genre,
      release_date,
      price,
      image_path,
      platform,
    });
    return res.send(updateCart);
  } catch (error) {
    return next(error);
  }
});

cartRouter.delete("/:shoppingCartId", requireUser, async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const game = await getGameById(gameId);

    if (req.user.id !== game.userId) {
      return next({
        name: "UnauthorizedUserError",
        message: "You cannot delete a game that is not in your cart",
      });
    }

    const destroyShoppingCartItem = await destroyShoppingCartItem(gameId);
    game.success = true;
    return res.send(shoppingCart);
  } catch (error) {
    return next(error);
  }
});

// cartRouter.get("/:userId", async (req, res, next) => {
//   const { userId } = req.params;

//   try {
//     const cart = await viewGamesinCart(userId);

//     res.send(cart);
//   } catch (err) {
//     console.log(err);
//   }
// });

// cartRouter.post("/:userId", async (req, res, next) => {
//   const { userId } = req.params;
//   const { gameId, quantity } = req.body;

//   try {
//     const addGame = await addGameToCart({ userId, gameId, quantity });

//     res.send(addGame);
//   } catch (err) {
//     console.log(err);
//   }
// });

// cartRouter.post("/:userId/:gameTitle", async (req, res, next) => {
//   const { userId, gameTitle } = req.params;
//   // const { gameId, quantity } = req.body

//   try {
//     const addGame = await increaseQuantity({ gameTitle });

//     res.send(addGame);
//   } catch (err) {
//     console.log(err);
//   }
// });

// cartRouter.delete("/:userId/:cartId", async (req, res, next) => {
//   const { userId, cartId } = req.params;

//   try {
//     const removeGame = await removeGameFromCart({ userId, cartId });

//     res.send(removeGame);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = cartRouter;
