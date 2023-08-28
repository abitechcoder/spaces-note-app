import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../../assets";

function Navbar({ currentLocation }) {
  const navigate = useNavigate();
  return (
    <header>
      <nav className="container mx-auto sm:pt-3 md:pt-6 lg:px-8 flex items-center justify-between ">
        <Link to={"/"}>
        <img src={Logo} className="w-[120px] md:w-[170px]" alt="Website Logo" />
        </Link>
        {currentLocation == "/" && (<div className="font-sans text-lg flex items-center">
          <div className="hidden md:flex items-center gap-16 mr-[62px] lg:d">
            <NavLink to="#" className="font-dm">About</NavLink>
            <NavLink to="#"className="font-dm">Features</NavLink>
            <NavLink to="#" className="font-dm">FAQs</NavLink>
          </div>
          <button className="bg-black text-white custom-button font-dm" onClick={() => navigate("/login")}>
            Take Note
          </button>
        </div>)}
      </nav>
    </header>
  );
}

export default Navbar;
