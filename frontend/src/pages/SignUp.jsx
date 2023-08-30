import React from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { TextInput } from "../components/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "../components/landing_page";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <section className="min-h-[100vh] bg-white ">
      <div className="p-4 lg:p-0">
        <Navbar currentLocation={location.pathname} />
      </div>
      <div className="grid place-items-center text-black">
        <div className="w-full md:w-[70%] lg:w-[50%] px-4">
          <h1 className="font-inter text-2xl md:text-4xl pb-4 md:pb-8 text-center md:text-left">
            Sign-up
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 py-4 border-b-2">
            <button className="custom-button bg-[#f7f7f7] border-[1.5px] flex gap-2 items-center">
              <FaApple />
              <p className="font-dm font-bold">LOGIN WITH APPLE</p>
            </button>
            <button className="custom-button bg-[#f7f7f7] border-[1.5px] flex gap-2 items-center">
              <FaGoogle />
              <p className="font-dm font-bold">LOGIN WITH GOOGLE</p>
            </button>
          </div>
          <div className="py-8 grid gap-4">
            <TextInput type="email" placeholder="E-MAIL" />
            <div className="flex gap-2 items-center">
              <TextInput type="password" placeholder="PASSWORD" />
              <AiOutlineQuestionCircle size={30} color="#242424" />
            </div>
            <p className="text-gray-500 font-dm">FORGOT PASSWORD?</p>
          </div>

          <div className="grid place-items-center">
            <div className="flex items-center gap-4">
              <button className="custom-button font-dm bg-[#7F6BFF] text-white">
                SIGN UP
              </button>
              <button
                onClick={() => navigate("/login")}
                className="custom-button font-dm text-black"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
