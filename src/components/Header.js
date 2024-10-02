import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";

import "./Header.css";
let mode = true;
const setDarkMode = () => {
  document.querySelector("body").setAttribute("data-theme", "dark");
  mode =! mode;
  
};

const setLightMode = () => {
  document.querySelector("body").setAttribute("data-theme", "light");
  mode =! mode;
   
};

const toggleTheme = (e) => {
  if (mode == true)
     setDarkMode();
  else
     setLightMode()
  
};
const Header = () => {
  return (
    <div className="Header">
      <h2>Where in the world?</h2>
      <div className="lightmode d-flex justify-content-between ali" onClick={toggleTheme}>
         
        <FontAwesomeIcon icon={faMoon} className="icon" />
        <span>Dark mode</span>
      </div>
    </div>
  );
};

export default Header;
