import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import FlowConnectLogo from "../FlowConnect.svg"; // Import FlowConnect logo
import FlowMosaicLogo from "../FlowMosaic.svg";
import FlowTimelineLogo from "../FlowTimeline.svg";

const menuVariants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

function NavigationMenu({ isMenuOpen, toggleMenu, user, adminAddress }) {
  return (
    <>
      <motion.button
        onClick={toggleMenu}
        className={`px-6 py-3 bg-gray-900 text-gray-100 hover:bg-gray-700 rounded-md focus:outline-none shadow-lg ${
          isMenuOpen ? "fixed" : "absolute"
        } top-4 left-4 z-50`}
        animate={isMenuOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        ☰
      </motion.button>
      <motion.div
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-gray-800 fixed top-0 left-0 h-full w-64 p-4 pt-24 z-40"
      >
        <div className="flex flex-col space-y-4">
          <NavLink
            to="/"
            className="block w-full px-4 py-2 rounded focus:outline-none flex flex-col items-center border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition"
            onClick={toggleMenu}
          >
            <img src={FlowConnectLogo} alt="FlowConnect" className="h-8" />
            <span className="text-white mt-1">Home</span>
          </NavLink>
          <NavLink
            to="/flow-mosaic"
            className="block w-full px-4 py-2 rounded focus:outline-none flex justify-center border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition"
            onClick={toggleMenu}
          >
            <img src={FlowMosaicLogo} alt="FlowMosaic" className="h-8" />
          </NavLink>
          <NavLink
            to="/flow-timeline"
            className="block w-full px-4 py-2 rounded focus:outline-none flex justify-center border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition"
            onClick={toggleMenu}
          >
            <img src={FlowTimelineLogo} alt="FlowTimeline" className="h-8" />
          </NavLink>

          {user.loggedIn && user.addr === adminAddress && (
            <NavLink
              to="/admin"
              className="block w-full px-4 py-2 text-white rounded focus:outline-none border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition"
              onClick={toggleMenu}
            >
              Admin
            </NavLink>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default NavigationMenu;
