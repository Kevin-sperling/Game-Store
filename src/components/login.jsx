import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL, loginUser } from "../api";
import jwt_decode from "jwt-decode";


import "../style/login.css";

const Login = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await loginUser(username, password);
    if (data && data.token) {
      console.log("Login successful", data);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("username", data.user.username);
      const decoded = jwt_decode(data.token);
      console.log(decoded, "decoded");

      setIsLoggedIn(true);
      navigate("/");
    } else {
      console.log("Login failed");
      setLoginError("Invalid username or password");
      setShowCredentialsError(true);
    }
  };

  return (
    <>
      <div className="loginForm">
        <form onSubmit={handleSubmit} className="registerLoginForm">
          <h1 className="pageName">Login</h1>
          <input
            type="text"
            id="username"
            placeholder="username"
            minLength="8"
            onChange={(event) => {
              event.preventDefault();
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
              event.preventDefault();
              setPassword(event.target.value);
            }}
            required
          />
          {showCredentialsError ? (
            <div className="error custom-error">{loginError}</div>
          ) : null}
          <button type="submit">Login</button>
        </form>

        <div className="">
          <Link to="/register">
            Don't have an account? <br /> Sign up!
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
