import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';



const SingleGame = () => {
    const [userId, setUserId] = useState('');

    const navigate = useNavigate();

    const game = JSON.parse(localStorage.getItem("game")) || {}

    const username = window.localStorage.getItem("username");

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


    const addGameToCart = async (gameId) => {
        console.log('gameId:', gameId)
        console.log('userId:', userId);
        try {
            const response = await fetch(`http://localhost:4000/api/cart/${userId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: `${userId}`,
                    gameId: `${gameId}`,
                    quantity: '1'
                })
            })
            const result = await response.json();
            console.log('addToCart result', result);


        } catch (err) {
            console.error(err);
            throw err
        }

    }

    const handleAddToCart = (gameId) => {
        addGameToCart(gameId);
        navigate('/');
    };

    useEffect(() => {
        fetchUserId();
    }, [])

    return (<div> <div key={game.id}>
        <h2>{game.title}</h2>
        <div>{game.genre}</div>
        <div>{game.platform}</div>
        <div>{game.price}</div>
        <button onClick={() => handleAddToCart(game.id)}>Add to Cart</button>

        <img src={game.image_path} alt={game.title} />


    </div></div>)
}

export default SingleGame