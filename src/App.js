// src/App.js
import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { Route, Routes } from "react-router-dom";
import "./fclConfig";

import Admin from "./components/Admin";
import Header from "./components/Header";
import Home from "./components/Home";
import FlowMosaic from "./components/FlowMosaic";
import Timeline from "./components/Timeline";
import NavigationMenu from "./components/NavigationMenu";
import BlogPosts from "./components/BlogPosts";

const adminAddress = "0xdbf7a2a1821c9ffa"; // Replace with your actual admin address

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);

  const logIn = () => {
    fcl.authenticate();
  };

  const logOut = () => {
    fcl.unauthenticate();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header
        user={user}
        logIn={logIn}
        logOut={logOut}
        toggleMenu={toggleMenu}
      />
      <NavigationMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        user={user}
        adminAddress={adminAddress}
      />
      <div
        className={`transition-opacity duration-300 ${
          isMenuOpen ? "opacity-50" : "opacity-100"
        }`}
      >
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
          <Route path="/flow-mosaic" element={<FlowMosaic />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/blogposts" element={<BlogPosts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
