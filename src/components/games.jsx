import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/games.css";

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
  const [admin, setAdmin] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/games/`, {
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
      const response = await fetch(`http://localhost:4000/api/cart/${userId}`, {
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
    console.log("username from games", username);
    try {
      const response = await fetch(`http://localhost:4000/api/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("User fetch failed");
      }

      const result = await response.json();
      console.log("result", result);

      setUserId(result.id);
      setAdmin(username);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchData();
    fetchUserId();
  }, []);

  const navigate = useNavigate();

  const handleClick = (game) => {
    localStorage.setItem("selectedGameId", game.id);
    navigate(`/game/${game.id}`);
  };

  const deleteGame = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/games/${gameId}`, {
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
      const response = await fetch(`http://localhost:4000/api/games`, {
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
      <button onClick={() => getCart()}>
        <b>Click here to view cart in console</b>
      </button>
      {admin === "administrator" && (
        <div className="">
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
          {username === "administrator" && <button onClick={addGame}> Add Game</button>}
        </div>
      )}
      <div className="games-container">
        {games.map((game) => (
          <div className="card card-compact bg-base-100 shadow-xl" key={game?.id} onClick={() => handleClick(game)}>
            <div>
              <img className="game-image" src={game?.image_path} alt={game?.title} />
            </div>
            <h2 className="card-title">{game.title}</h2>
            {username === "administrator" && <h2>{game?.id}</h2>}
            {username === "administrator" && (
              <button onClick={() => deleteGame(game?.id)}>Delete</button>
            )}
            <div className="price">${game.price}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Games;