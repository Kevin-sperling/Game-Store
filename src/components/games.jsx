import React, { useState, useEffect } from "react";

const Games = () => {
    const [games, setGames] = useState([]);
    // const [gameId, setGameId] = useState('');

    const fetchData = async () => {

        try {
            const response = await fetch('http://localhost:4000/api/games', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            console.log('games', result);
            setGames(result)
        } catch (err) {
            console.error(err);
        }

    }

    const addGameToCart = async (gameId) => {
        try {
            const response = await fetch('http://localhost:4000/api/cart', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameId: `${gameId}`,
                })
            })
            const result = response.json();

        } catch (err) {
            console.error(err);
        }

    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div>
                {
                    games.map((game) =>
                        <div key={game.id}>
                            <h2>{game.title}</h2>
                            <img src={game.image_path} alt={game.title} />
                            <div>{game.genre}</div>
                            <div>{game.platform}</div>
                            <div>{game.price}</div>
                            <button onClick={() => addGameToCart(game.id)}>Add to Cart</button>
                            <div>---------------------------</div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Games