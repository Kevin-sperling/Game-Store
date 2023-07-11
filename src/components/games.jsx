import React, { useState, useEffect } from "react";

const Games = () => {
    const [games, setGames] = useState([]);
    const [userId, setUserId] = useState('');
    const username = window.localStorage.getItem("username");


    const fetchData = async () => {

        try {
            const response = await fetch(`http://localhost:4000/api/games/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();


            setGames(result)
        } catch (err) {
            console.error(err);
        }

    }



    const getCart = async () => {
        console.log('userId:', userId);

        try {
            const response = await fetch(`http://localhost:4000/api/cart/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

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
        fetchData();
        fetchUserId();

    }, [])

    const handleClick = (game) => {
        localStorage.setItem("game", JSON.stringify(game))
        setTimeout(() => {
            window.location.pathname = `/game/${game.id}`
        }, 300);
    }

    return (
        <>
            <button onClick={() => getCart()}><b>Click here to view cart in console</b></button>
            <div>

                {
                    games.map((game) =>
                        <div className="card card-compact w-96 bg-base-100 shadow-xl" key={game.id}>

                            <div onClick={() => { handleClick(game) }}>
                                <img src={game.image_path} alt={game.title} />
                            </div>
                            <h2 className="card-title">{game.title}</h2>

                        </div>
                    )
                }

            </div>
        </>
    )
}

export default Games