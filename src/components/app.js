import React, { useState, useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { BASE_URL } from "../api";

import Navbar from "./navbar";
import Users from "./users";
import Admin from "./admin";
import Games from "./games";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import SingleGameView from "./singlegameview";
import Cart from "./cart";
import Checkout from "./checkout";
import Footer from "./footer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [games, setGames] = useState([]);
  const [userId, setUserId] = useState("");

  const checkToken = async () => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  // setUsername(window.localStorage.getItem("username"));

  const getUserId = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      setUserId(result.id);

      console.log("result.id", result.id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkToken();
    getUserId();
  }, []);

  console.log("userId", userId);
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Games
              games={games}
              setGames={setGames}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          }
        />
        <Route exact path="/game/:id" element={<SingleGameView />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route
          exact
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              setUser={setUser}
              user={user}
              username={username}
              setUsername={setUsername}
            />
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <Cart
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          }
        />
        <Route
          exact
          path="/checkout"
          element={
            <Checkout
              user={user}
              setUser={setUser}
              // shoppingCart={shoppingCart}
              // setShoppingCart={setShoppingCart}
            />
          }
        />
        {/* <Route exact path="/register" element={(props) => (
            <Register {...props} isLoggedIn={isUserLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
        )} /> */}
        {/* <Route path="/login" element={(props) => (
            <LoginPage {...props} setIsLoggedIn={setIsLoggedIn}/>
        )} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
