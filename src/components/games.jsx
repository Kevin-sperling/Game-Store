import React, { useState, useEffect } from "react";
import { BASE_URL, getAllGames, postGameToShoppingCart, getMyShoppingCart } from "../api/index.js";
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

  useEffect(() => {
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

  const handleAddToCart = async (event, game) => {
    event.preventDefault();
    let userId = window.localStorage.getItem("userId");
    console.log("userId:", userId);
    const myShoppingCart = await getMyShoppingCart();
    console.log("myShoppingCart:", myShoppingCart);

    if (!isLoggedIn) {
      alert("added to cart");
    } else {
      handleAddToCart();
    }

    const newShoppingCart = [...shoppingCart, ...myShoppingCart, game];
    setShoppingCart(newShoppingCart);
    localStorage.setItem("cart", JSON.stringify(newShoppingCart));
  };

  return (
    <>
      <div className="flex flex-wrap justify-evenly">
        <div className="addGame">Post A Game</div>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="genre"
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="release_date"
          onChange={(e) => {
            setReleaseDate(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="image_path"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="platform"
          onChange={(e) => {
            setPlatform(e.target.value);
          }}
        />
        <button onClick={addGame}>Add Game</button>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {games.map((game) => (
          <div className="card card-compact w-96 bg-base-100 shadow-xl" key={game?.id}>
            <div>
              <img src={game?.image_path} alt={game?.title} />
            </div>
            <h2 className="card-title">{game.title}</h2>
            <div className="price">${game?.price}</div>
            <button
              className="btn btn-ghost hover:text-white active:text-violet-600"
              onClick={() => {
                handleSingleView(game);
              }}
            >
              See Details
            </button>
            <button
              className="btn btn-ghost hover:text-white active:text-violet-600"
              onClick={(event) => {
                handleAddToCart(event, game);
              }}
            >
              Add to Cart
            </button>
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
