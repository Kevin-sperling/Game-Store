import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";

import styles from "../style/register.css";
import Navbar from "./navbar";


const Register = ({ setIsLoggedIn, isLoggedIn, setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, []);

  const createAccount = async (event) => {
    event.preventDefault();
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });
    if (response.ok) {
      console.log(response);
      const result = await response.json();
      console.log(result);
      // const token = result.token;
      // window.localStorage.setItem("token", token);
      // setIsLoggedIn(true);
      setTimeout(() => {
        window.location.pathname = "/login";
      }, 300);
    } else {
      console.error;
      const errorMessage = "login" && "Username already taken.";
      setRegisterError(errorMessage);
      setShowCredentialsError(true);
    }
  };

  return (
    <>
    <Navbar />
      <h1 className="pageName">REGISTER</h1>
      <form onSubmit={createAccount} className="registerLoginForm">
        <input
          type="text"
          value={username}
          id="username"
          placeholder="username"
          minLength="8"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />
        <input
          type="text"
          value={email}
          id="email"
          placeholder="email"
          minLength="8"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
        <input
          type="password"
          value={password}
          id="password"
          placeholder="password"
          minLength="8"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />
        <input
          type="password"
          value={confirmPassword}
          id="confirm_password"
          name="confirm_password"
          placeholder="confirm password"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
          required
        />
        {password !== confirmPassword && <div>Passwords do not match</div>}
        {showCredentialsError ? (
          <div className="error">{registerError}</div>
        ) : null}
        <button type="submit">Create Account</button>
      </form>
    </>
  );
};

export default Register;
