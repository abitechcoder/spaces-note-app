import React from "react";
import { Logomark, Derick } from "../../assets";

function Testimonials() {
  const dots = [1, 2, 3, 4, 5];
  return (
    <div id="testimonials" className="bg-black text-white">
      <div className="custom-container ">
        <div className="grid gap-6 lg:gap-12 place-items-center">

        <img src={Logomark} alt="" />
        <p className="font-dm font-medium text-center text-lg lg:text-2xl md:w-[70%] lg:w-[50%]">
          I use Spaces for all my note taking when working on a project. I send
          it over to clients to crosscheck for me.
        </p>
        <div className="grid place-items-center gap-3">
          <img src={Derick} className="w-[50px]" alt="Image of Dericks" />
          <div>
            <h4 className="text-center font-bold text-base font-inter">Derick Tsorme</h4>
            <p className="text-center text-xs font-inter">Product Designer</p>
          </div>
        </div>
        <div className="flex gap-1">
          {dots.map((dot) => {
            if (dot === 3) {
              return (
                <div className="w-2 h-2 bg-white rounded-full" key={dot}></div>
              );
            } else {
              return (
                <div
                  className="w-2 h-2 bg-[#A1A1A1] rounded-full"
                  key={dot}
                ></div>
              );
            }
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Testimonials;
