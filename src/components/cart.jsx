import React, { useState, useEffect } from "react";
import { BASE_URL } from ".";

const Cart = ({ userId }) => {
  const [games, setGames] = useState([]);
  console.log("games:", games);
  // const [userId, setUserId] = useState('');

  const username = window.localStorage.getItem("username");

  const fetchCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setGames(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const increaseQuantity = async (gameTitle) => {
    console.log("gameTitle:", gameTitle);
    console.log("userId:", userId);
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}/${gameTitle}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("increase quantity", result);

      fetchCart();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteGameFromCart = async (cartId) => {
    console.log("cartId:", cartId);
    console.log("userId:", userId);
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      fetchCart();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <>
      <h1 className="card-title">
        <b>{username}'s Cart</b>
      </h1>
      <br />

      <button onClick={() => fetchCart()}>
        Click here to view cart in console
      </button>

      <br />
      <br />
      {games.length > 0 ? (
        <>
          {games.map((game) => (
            <div
              className="card card-compact w-96 bg-base-100 shadow-xl"
              key={game.id}
            >
              <h2 className="card-title">{game.title}</h2>
              <div>
                <img src={game.image_path} alt={game.title} />
              </div>

              <div>{game.price}</div>
              <div>
                <button onClick={() => increaseQuantity(game.title)}>
                  Add another to the cart
                </button>{" "}
                <br />
                <button onClick={() => deleteGameFromCart(game.cart_id)}>
                  Delete from cart
                </button>
              </div>
              <br />
              <br />
            </div>
          ))}

          <h1>
            <b>
              Total Price:{" "}
              {games.reduce((total, game) => total + parseFloat(game.price), 0)}
            </b>
          </h1>
          <button>Checkout</button>
        </>
      ) : (
        <>
          <div>Loading...</div>
          <button onClick={() => fetchCart()}>view cart</button>
        </>
      )}
    </>
  );
};

export default Cart;
