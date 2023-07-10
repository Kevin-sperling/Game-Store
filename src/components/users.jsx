import React, { useState, useEffect } from "react";


const Users = () => {
    const [users, setUsers] = useState([]);


    const fetchData = async () => {

        try {
            const response = await fetch('http://localhost:4000/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();


            setUsers(result)

        } catch (err) {
            console.error(err);
        }

    }

    const promoteToAdmin = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    is_admin: true
                })
            });

            const result = await response.json();
            console.log("promote to admin:", result);

        } catch (err) {
            console.error(err);
        }

    }



    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <h1>USERS</h1> <br />
            {
                users.map((user) =>
                    <div key={user.id}>
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                        <div>{user.is_admin}</div>
                        {
                            !user.is_admin && (
                                <button onClick={() => promoteToAdmin(user.id)}>promote to admin</button>
                            )
                        }
                        <div>------------------</div>
                    </div>
                )
            }

        </>
    )
}

export default Users