import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../../assets";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import {Link as ScrollLink} from "react-scroll"

function Navbar({ currentLocation }) {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3 md:py-6">
        <Link to={"/"}>
          <img src={Logo} className="w-32 md:w-44" alt="Website Logo" />
        </Link>

        {currentLocation == "/" && (
          <div className="hidden md:flex items-center">
            <div className="flex mr-20 space-x-6">
            
              <ScrollLink to="features" smooth={true} spy={true} duration={500} className="font-dm cursor-pointer">
                Features
              </ScrollLink>
              <ScrollLink to="testimonials" smooth={true} spy={true} duration={500} className="font-dm cursor-pointer">
                Testimonials
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} spy={true} duration={500} className="font-dm cursor-pointer">
                Contact
              </ScrollLink>
              <ScrollLink to="downloads" smooth={true} spy={true} duration={500} className="font-dm cursor-pointer">
                Downloads
              </ScrollLink>
            </div>

            <button
              className="bg-black text-white custom-button font-dm"
              onClick={() => navigate("/login")}
            >
              Take Note
            </button>
          </div>
        )}

        <div className="md:hidden">
          {toggleMenu ? (
            <RiCloseLine
              className="text-black cursor-pointer"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              className="text-black cursor-pointer"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
        </div>
      </nav>

      <div
        className={`container mx-auto md:hidden ${
          toggleMenu ? "block" : "hidden"
        }`}
      >
        <div className="bg-white mt-2 py-4 px-6 rounded shadow">
          <NavLink to="#" className="block text-gray-800 font-dm mb-3 ">
            About
          </NavLink>
          <NavLink to="#" className="block text-gray-800 font-dm mb-3">
            Features
          </NavLink>
          <NavLink to="#" className="block text-gray-800 font-dm mb-3">
            FAQs
          </NavLink>
          <button
            className="bg-black text-white custom-button font-dm w-full"
            onClick={() => navigate("/login")}
          >
            Take Note
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
