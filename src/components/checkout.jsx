import React, { useState, useEffect } from "react";
import { BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
  return (
    <>
      <h1 className="card-title">
        <b>Checkout</b>
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

export default Checkout;
