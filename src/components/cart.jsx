import React, { useState, useEffect } from "react";

const Cart = () => {
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);

  console.log('test', games)
  const [userId, setUserId] = useState('');
  const username = window.localStorage.getItem("username");

  console.log('userId', userId);



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



  const getGamebyId = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/games/${gameId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };


  const displayGames = async () => {
    const gameInfoArray = await Promise.all(games.map((game) => getGamebyId(game.product_id)));
    console.log('gameInfoArray ', gameInfoArray);
    setCart(gameInfoArray);



  };


  useEffect(() => {
    fetchUserId();


    const timer = setTimeout(() => {
      getCart();
      displayGames();
    }, 3000);



    return () => clearTimeout(timer);
  }, []);



  return (
    <>
      <div>hello {username}</div>

      <button onClick={() => getCart()}><b>Click here to view cart in console</b></button>





      {
        cart.map((game) =>
          <div key={game.id}>
            <h2 >{game.title}</h2>
            <div >
              <img src={game.image_path} alt={game.title} />
            </div>

            <div>{game.price}</div>

          </div>
        )
      }
    </>

  );
};

export default Cart;
