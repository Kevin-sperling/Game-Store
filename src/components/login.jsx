import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "/index.js";
import { fetchUserData } from "../util";
import { getAllGames } from "../../db/games";

const Login = (props) => {
  const { token, setToken, isLoggedIn, setIsLoggedIn } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await loginUser(username, password);
    if (data && data.token) {
      console.log("Logging in...");
      window.localStorage.setItem("token", token);
      setToken(data.token);
      setIsLoggedIn(true);
      navigate("/users/account");
    } else {
      console.log("Login failed");
    }

    return (
      <>
        <div className="loginForm">
          <form
            onSubmit={(element) => {
              element.preventDefault();
              handleSubmit();
            }}
            className="registerLoginForm"
          >
            <h1 className="pageName">Login</h1>
            <input
              type="text"
              id="username"
              placeholder="username"
              minLength="8"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              minLength="8"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            {showCredentialsError ? (
              <div className="error">{loginError}</div>
            ) : null}
            <button type="submit">Login</button>
          </form>

          <div className="">
            <Link to="users/register">
              Don't have an account? <br /> Sign up!
            </Link>
          </div>
        </div>
      </>
    );
  };
};

export default Login;
