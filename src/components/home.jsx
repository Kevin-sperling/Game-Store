import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

import { getAPIHealth } from "../axios-services";
import Footer from "./footer";
// import HomeContent from "./homecontent";
import Navbar from "./navbar";
import Games from "./games";
import Users from "./users";
import Login from "./login";
import "../style/app.css";

const Home = (props) => {
  const [APIHealth, setAPIHealth] = useState("");
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <div className="overflow-hidden bg-black">{/* <HomeContent /> */}</div>
  );
};

export default Home;
