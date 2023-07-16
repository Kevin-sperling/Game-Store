import React, { useState, useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { BASE_URL } from "../api";

import Navbar from "./navbar";
import Users from "./users";
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
  const [user, setUser] = useState(null);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [games, setGames] = useState([]);

  const [userId, setUserId] = useState("");

  // const setIsLoggedIn = (isLoggedIn) => {
  //   setIsUserLoggedIn(isLoggedIn);
  // };

  console.log("userId", userId);

  const username = window.localStorage.getItem("username");
  const id = window.localStorage.setItem(userId, "id");
  console.log("id", id);

  const fetchUserId = async () => {
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
    fetchUserId();
  }, []);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Games />} />
        <Route exact path="/game/:id" element={<SingleGameView />} />
        <Route exact path="/register" element={<Register />} />
        <Route />
        <Route
          exact
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              setUser={setUser}
            />
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <Cart
              userId={userId}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
              games={games}
              setGames={setGames}
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
