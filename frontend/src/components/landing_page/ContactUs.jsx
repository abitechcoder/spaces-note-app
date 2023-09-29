import React from "react";
import { ContactAvatar } from "../../assets";

function ContactUs() {
  return (
    <div id="contact">
      <div className="h-[500px] custom-container">
        <div className="h-full grid place-items-center">
          <div className="w-full md:w-[70%] bg-[#A1A1A1] bg-opacity-10 rounded md:rounded-lg py-10">
            <div className="grid gap-3 md:gap-6 place-items-center px-4">
            <img src={ContactAvatar} alt="" />
            <div>
              <h4 className="text-center font-dm font-bold text-base md:text-xl">Do you have any questions?</h4>
              <p className="text-center text-[#667085] text-sm md:text-lg font-dm">
                We are available 24/7 to answer any question you have about
                Spaces
              </p>
            </div>
            <button className="bg-black text-white custom-button font-dm">
              Send a message
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
