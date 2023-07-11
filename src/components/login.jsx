import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./index.js";

const Login = (props) => {

  const { isLoggedIn, setIsLoggedIn } = props;
  console.log('props', props);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await loginUser(username, password);
    if (data && data.token) {
      console.log('data:', data);
      console.log("Logging in...");
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("username", data.user.username);

      // setToken(data.token);
      setIsLoggedIn(true);
      navigate('/')
    } else {
      console.log("Login failed");
      setLoginError("Invalid username or password");
      setShowCredentialsError(true);
    }
  };

  return (
    <div className="loginForm">
      <form
        onSubmit={handleSubmit}
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
        <Link to="/register">
          Don't have an account? <br /> Sign up!
        </Link>
      </div>
    </div>

  );
};

export default Login;
