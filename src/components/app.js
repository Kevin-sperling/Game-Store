import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={(props) => (
            <Register {...props} isLoggedIn={isUserLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
        )} />
        <Route path="/login" component={(props) => (
            <LoginPage {...props} setIsLoggedIn={setIsLoggedIn}/>
        )} />
      </Switch>
    </Router>
  );
};

export default App;
