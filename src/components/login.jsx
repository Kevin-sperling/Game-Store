import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL, loginUser } from "../api";
import jwt_decode from "jwt-decode";

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
    <div className="flex justify-center items-center h-screen bg-black mt-[-3.5in]">
      <div className="max-w-md bg-gray-1000 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="registerLoginForm">
          <input
            type="text"
            id="username"
            placeholder="Username"
            minLength="8"
            onChange={(event) => {
              event.preventDefault();
              setUsername(event.target.value);
            }}
            required
            className="w-full px-4 py-2 mb-4 bg-gray-200 text-gray-800 rounded"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            minLength="8"
            onChange={(event) => {
              event.preventDefault();
              setPassword(event.target.value);
            }}
            required
            className="w-full px-4 py-2 mb-4 bg-gray-200 text-gray-800 rounded"
          />
          {showCredentialsError ? (
            <div className="text-white mb-2">{loginError}</div>
          ) : null}
          <button
            type="submit"
            className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="text-white mt-4 text-center">
          <Link to="/register">
            Don't have an account? <br /> Sign up!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
