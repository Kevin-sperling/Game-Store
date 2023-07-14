import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./home";
import LoginPage from "./login";
import Register from "./register";
import SingleGame from "./singleGame";
import Cart from "./cart";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // const setIsLoggedIn = (isLoggedIn) => {
  //   setIsUserLoggedIn(isLoggedIn);
  // };

  const [userId, setUserId] = useState("");
  console.log("userId", userId);

  const username = window.localStorage.getItem("username");

  const fetchUserId = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/${username}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      setUserId(result.id);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   fetchUserId();

  // }, []);

  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/game/:id" element={<SingleGame />} />
      <Route exact path="/register" element={<Register />} />
      <Route
        exact
        path="/login"
        element={
          <LoginPage
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            setUser={setUser}
          />
        }
      />
      <Route exact path="/cart" element={<Cart userId={userId} />} />
      {/* <Route exact path="/register" element={(props) => (
            <Register {...props} isLoggedIn={isUserLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
        )} /> */}
      {/* <Route path="/login" element={(props) => (
            <LoginPage {...props} setIsLoggedIn={setIsLoggedIn}/>
        )} /> */}
    </Routes>
  );
};

export default App;
