import React, { useState } from "react";
import {Routes, Route,} from "react-router-dom";
import HomePage from "./home";
import LoginPage from "./login";
import Register from "./register";

const App = () => {
    const[isUserLoggedIn,setIsUserLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const setIsLoggedIn  = (isLoggedIn) => {
        setIsUserLoggedIn(isLoggedIn);
    }

  return (
    <Routes>
     
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isUserLoggedIn} setUser={setUser} />} />
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
