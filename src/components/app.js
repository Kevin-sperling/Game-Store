import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { BASE_URL } from "../api";
import Navbar from "./navbar";
import Footer from "./footer";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import SingleGameView from "./singlegameview";
import Cart from "./cart";
import Checkout from "./checkout";

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

  const fetchUserId = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      setUserId(result.id);
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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/game/:id" element={<SingleGameView />} />
        <Route exact path="/register" element={<Register />} />
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
