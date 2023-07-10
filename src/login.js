import React, { useState } from "react";
import Login from "./components/login"; // Assuming the filename of the component is LoginComponent

const LoginPage = () => {
   
  return (
    <div>
      <h1>Login Page</h1>
      <Login /> {/* Render the Login component */}
    </div>
  );
};

export default LoginPage;