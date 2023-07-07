import React, { useState, useEffect } from "react";

const Games = () => {
    const [games, setGames] = useState([]);

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

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <button onClick={console.log('games', games)}>Games</button>

    )
}

export default Games