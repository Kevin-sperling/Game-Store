import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";

const SingleGameView = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const game = JSON.parse(localStorage.getItem("game")) || {};
  const username = localStorage.getItem("username");

  const fetchUserId = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setUserId(result.id);
    } catch (err) {
      console.error(err);
    }
  };

  const addGameToCart = async (gameId) => {
    console.log("gameId:", gameId);
    console.log("userId:", userId);
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: `${userId}`,
          gameId: `${gameId}`,
          quantity: "1",
        }),
      });
      const result = await response.json();
      console.log("addToCart result", result);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleAddToCart = (gameId) => {
    addGameToCart(gameId);
    navigate("/");
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="max-w-3xl bg-gray-900 rounded-lg shadow-lg ring-2 ring-white mt-[-4in]">
        <div className="flex">
          <div className="flex-1 p-8">
            <h2 className="text-3xl font-bold mb-4 text-white">{game.title}</h2>
            <div className="text-white">Genre: {game.genre}</div>
            <div className="text-white">Available on: {game.platform}</div>
            <div className="text-white">${game.price}</div>
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
              onClick={() => handleAddToCart(game.id)}
            >
              Add to Cart
            </button>
          </div>
          <div className="flex-1">
            <img
              src={game.image_path}
              alt={game.title}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGameView;
