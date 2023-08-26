import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../assets";

function Navbar({ currentLocation }) {
  return (
    <header>
      <nav className="container mx-auto flex items-center justify-between p-6 lg:px-8">
        <img src={Logo} alt="Website Logo" />
        {currentLocation == "/" && (<div className="font-sans text-lg flex items-center">
          <div className="flex items-center gap-16 mr-[62px]">
            <p>About</p>
            <p>Features</p>
            <p>FAQs</p>
          </div>
          <button className="bg-black border-r rounded px-10 py-5 text-white">
            Take Note
          </button>
        </div>)}
      </nav>
    </header>
  );
}

export default Navbar;
