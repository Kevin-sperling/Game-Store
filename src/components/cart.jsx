import React, { useState, useEffect } from "react";

const Cart = () => {
  const [games, setGames] = useState([]);
  const [userId, setUserId] = useState('');
  const username = window.localStorage.getItem("username");

  console.log('userId', userId);

  const token = window.localStorage.getItem("token");


  const getCart = async () => {
    console.log('userId:', userId);

    try {
      const response = await fetch(`http://localhost:4000/api/cart/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      setGames(result)

      console.log('cart', result);

    } catch (err) {
      console.error(err);
    }

  }

  const fetchUserId = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${username}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json();

      setUserId(result.id)

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUserId();
    getCart();

  }, [])






  return (
    <>


      {
        games.map((game) =>
          <div className="card card-compact w-96 bg-base-100 shadow-xl" key={game.id}>

            <div >
              <img src={game.image_path} alt={game.title} />
            </div>
            <h2 className="card-title">{game.title}</h2>
            <div>{game.price}</div>

          </div>
        )
      }
    </>



  );
};

export default Cart;
