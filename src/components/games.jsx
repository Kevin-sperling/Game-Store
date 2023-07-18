import React, { useState, useEffect } from "react";

import {
  BASE_URL,
  getAllGames,
  postGameToShoppingCart,
  getMyShoppingCart,
} from "../api/index.js";

import "../style/games.css";

const Games = (props) => {
  const { isLoggedIn, setIsLoggedIn, shoppingCart, setShoppingCart } = props;

  const username = window.localStorage.getItem("username");

  const [games, setGames] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState({});

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/games`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const result = await response.json();

  //     setGames(result);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const getCart = async () => {
  //   console.log("userId:", userId);

  //   try {
  //     const response = await fetch(`${BASE_URL}/cart/${userId}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const result = await response.json();

  //     console.log("cart", result);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const fetchUserId = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/users/${username}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const result = await response.json();

  //     setUserId(result.id);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    // fetchData();

    (async () => {
      let games = await getAllGames();
      setGames(games);
    })();
  }, []);

  const handleSingleView = (game) => {
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

  const handleAddToCart = async (event, games) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ quantity: 1, price: games.price }),
      });
      const result = await response.json();

      console.log(result, "add success");
    } catch (err) {
      console.error(err);
    }

    const myShoppingCart = await getMyShoppingCart();
    console.log("myShoppingCart:", myShoppingCart);

    if (isLoggedIn) {
      alert("added to cart");
      handleAddToCart();
    } else {
      alert("there was a problem adding this item to the cart");
    }

    const newShoppingCart = [...myShoppingCart, games];
    setShoppingCart(newShoppingCart);
    localStorage.setItem("cart", JSON.stringify(newShoppingCart));
  };

  return (
    <>
      <div className="flex flex-wrap justify-evenly">
        <div className="addGame">Post A Game</div>
        <input
          type="text"
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
          placeholder="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
          placeholder="genre"
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        />
        <input
          type="text"
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
          placeholder="release_date"
          onChange={(e) => {
            setReleaseDate(e.target.value);
          }}
        />
        <input
          type="text"
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
          placeholder="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <input
          type="text"
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
          placeholder="image_path"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <input
          type="text"
          className="px-4 py-2 mb-4 bg-gray-800 text-white rounded"
          placeholder="platform"
          onChange={(e) => {
            setPlatform(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-sm hover:bg-blue-600 transition-colors"
          onClick={addGame}
        >
          Add Game
        </button>
      </div>
      <div className="flex flex-wrap justify-evenly mt-8">
        {games.map((game) => (
          <div
            className="card card-compact w-96 bg-base-100 shadow-xl flex flex-col items-center my-4 mx-2 hover:bg-base-200 transition-colors "
            key={game?.id}
          >
            <div>
              <img src={game?.image_path} alt={game?.title} className="" />
            </div>
            <h2 className="text-white text-xl font-bold mb-2 text-center">
              {game.title}
            </h2>
            <div className="price absolute bottom-2 text-white right-2 font-bold">
              ${game?.price}
            </div>

            {/* <h2 className="">{game?.id}</h2> */}

            <button
              className="game-image-frame mb-2"
              onClick={() => {
                handleSingleView(game);
              }}
            >
              See Details
            </button>
            <button
              className="game-image-frame mb-2"
              onClick={(event) => {
                handleAddToCart(event, game);
              }}
            >
              Add to Cart
            </button>
            <button
              className="game-image-frame mb-2"
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
