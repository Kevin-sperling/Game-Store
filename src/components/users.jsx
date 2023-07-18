import React, { useState, useEffect } from "react";
import { BASE_URL } from "../api";
const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/users/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.error) {
        console.log(result.error);
        return;
      }
      setUsers(result);
    } catch (err) {
      console.error(err);
    }
  };

  const promoteToAdmin = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_admin: true,
        }),
      });

      const result = await response.json();
      console.log("promote to admin:", result);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("delete user:", result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="justify-center">
      {" "}
      <div className="flex flex-wrap">
        {users.map((user, i) => (
          <div
            className="card card-compact w-96 bg-base-100 shadow-xl"
            key={user.id}
          >
            {i === 0 && (
              <>
                <h1>USERS</h1>
                <br />
              </>
            )}
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.is_admin}</div>
            {!user.is_admin && (
              <>
                <button
                  className="btn btn-ghost hover:text-white active:text-violet-600"
                  onClick={() => promoteToAdmin(user.id)}
                >
                  promote to admin
                </button>{" "}
                <br />
                <button
                  className="btn btn-ghost hover:text-white active:text-violet-600"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete User
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
