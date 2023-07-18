import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, fetchUserData } from "../api";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState({ is_admin: false });
  const token = window.localStorage.getItem("token");

  const checkAdmin = async () => {
    if (token) {
      try {
        const data = await fetchUserData();
        console.log(data);
        if (data.is_admin) {
          setAdmin(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

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

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
