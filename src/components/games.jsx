import React, { useState, useEffect } from "react";
import { BASE_URL } from "../api";

const Games = () => {
  const username = window.localStorage.getItem("username");

  const [games, setGames] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [image, setImage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/games`, {
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

  const getCart = async () => {
    console.log("userId:", userId);

    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      console.log("cart", result);
    } catch (err) {
      console.error(err);
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (game) => {
    localStorage.setItem("game", JSON.stringify(game));
    setTimeout(() => {
      window.location.pathname = `/game/${game.id}`;
    }, 300);
  };
  const deleteGame = async (gameId) => {
    try {
      const response = await fetch(`${BASE_URL}/games/${gameId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const result = await response.json();

      console.log(result, "delete success");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };
  const addGame = async () => {
    if (
      title === "" ||
      genre === "" ||
      releaseDate === "" ||
      price === "" ||
      image === "" ||
      platform === ""
    ) {
      return alert(`Please Fill All Fields!`);
    }

    const gameObj = {
      title,
      genre,
      release_date: releaseDate,
      price,
      image_path: image,
      platform,
    };
    try {
      const response = await fetch(`${BASE_URL}/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(gameObj),
      });
      const result = await response.json();

      console.log(result, "add success");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-evenly">
        <div className="text-xl font-bold mb-4">Post A Game</div>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
        />
        <input
          type="text"
          placeholder="genre"
          onChange={(e) => {
            setGenre(e.target.value);
          }}
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
        />
        <input
          type="text"
          placeholder="release_date"
          onChange={(e) => {
            setReleaseDate(e.target.value);
          }}
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
        />
        <input
          type="text"
          placeholder="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
        />
        <input
          type="text"
          placeholder="image_path"
          onChange={(e) => {
            setImage(e.target.value);
          }}
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
        />
        <input
          type="text"
          placeholder="platform"
          onChange={(e) => {
            setPlatform(e.target.value);
          }}
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
        />
        <button
          onClick={addGame}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-sm hover:bg-blue-600 transition-colors"
        >
          Add Game
        </button>
      </div>
      <div className="flex flex-wrap justify-evenly mt-8">
        {games.map((game) => (
          <div
            className="card card-compact w-96 bg-base-100 shadow-xl flex flex-col items-center my-4 mx-2 hover:bg-base-200 transition-colors"
            key={game?.id}
          >
            <div
              onClick={() => {
                handleClick(game);
              }}
              className="game-image-frame mb-2"
              style={{ height: "200px" }}
            >
              <img
                src={game?.image_path}
                alt={game?.title}
                className="game-image object-cover h-full w-full"
              />
            </div>
            <h2 className="text-white text-xl font-bold mb-2 text-center">
              {game.title}
            </h2>
            <div className="price absolute bottom-2 text-white right-2 font-bold">
              ${game?.price}
            </div>
            <h2 className="text-xl font-bold mb-2">{game?.id}</h2>
            <button
              className="btn btn-ghost hover:text-white active:text-violet-600"
              onClick={() => {
                deleteGame(game?.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Games;
