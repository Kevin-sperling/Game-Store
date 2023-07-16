import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";

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
      setTimeout(() => {
        window.location.pathname = "/login";
      }, 300);
    } else {
      console.error();
      const errorMessage = "Username already taken.";
      setRegisterError(errorMessage);
      setShowCredentialsError(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black mt-[-3.5in]">
      <div className="max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          REGISTER
        </h1>
        <form onSubmit={createAccount} className="registerLoginForm">
          <input
            type="text"
            value={username}
            id="username"
            placeholder="Username"
            minLength="8"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
            className="w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded"
          />
          <input
            type="text"
            value={email}
            id="email"
            placeholder="Email"
            minLength="8"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
            className="w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded"
          />
          <input
            type="password"
            value={password}
            id="password"
            placeholder="Password"
            minLength="8"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
            className="w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded"
          />
          <input
            type="password"
            value={confirmPassword}
            id="confirm_password"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            required
            className="w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded"
          />
          {password !== confirmPassword && (
            <div className="text-red-500 mb-4">Passwords do not match</div>
          )}
          {showCredentialsError && (
            <div className="text-white mb-4">{registerError}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
