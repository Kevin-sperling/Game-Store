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
    <>
      <div className="flex flex-col items-center mt-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-black text-white p-4">
          <h1 className="text-2xl text-center mb-4">Login</h1>
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
            className="w-full p-2 mb-2 bg-gray-800 text-white"
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
            className="w-full p-2 mb-2 bg-gray-800 text-white"
          />
          {showCredentialsError ? (
            <div className="text-white mb-2">{loginError}</div>
          ) : null}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-white mt-4">
          <Link to="/register">
            Don't have an account? <br /> Sign up!
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
