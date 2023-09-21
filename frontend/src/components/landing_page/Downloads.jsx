import React from "react";
import { GooglePlay, AppStore, Smartphone } from "../../assets";

function Downloads() {
  return (
    <section id="downloads" className="bg-black text-white py-12 h-[600px] md:h-[500px] relative overflow-hidden">
      <div className="custom-container grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2">
        <div className="grid gap-8 lg:gap-12">
          <h4>
            Download <span className="font-bold font-dm">Spaces</span>
          </h4>
          <p className="font-clash text-center md:text-left text-2xl md:text-4xl lg:text-5xl leading-normal md:leading-[50px] lg:leading-[70px]">
            Join over 20,000+ users and make your life easier.
          </p>
          <div className="flex justify-between md:justify-start gap-0 md:gap-8">
            <img src={GooglePlay} alt="Download app from Google Play Store"  />
            <img src={AppStore} alt="Download app from Apple App Store" />
          </div>
        </div>
        <div className="relative flex justify-center">
            <img src={Smartphone} className="md:absolute md:left-24 top-[50%] max-h-[80vh]" alt="" />
        </div>
      </div>
    </section>
  );
}

export default Downloads;
