import React from "react";
import { Smartphone, GooglePlay, AppStore } from "../../assets";

function Hero() {
  return (
    <section className="bg-white text-black py-12 h-[90vh] relative overflow-hidden">
      <div className="custom-container grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2">
        <div className="grid gap-6 md:gap-12">
          <p className="font-clash font-[500] text-center md:text-left text-3xl md:text-4xl lg:text-5xl leading-normal md:leading-[50px] lg:leading-[70px]">
            Enjoy note taking with your friends
          </p>
          <p className="font-dm text-sm text-[#A1A1A1]">
            Put down your thoughts down in one app, share with your friends and
            loved ones.
          </p>
          <div className="flex justify-between md:justify-start gap-0 md:gap-8">
            <img src={GooglePlay} alt="Download app from Google Play Store" />
            <img src={AppStore} alt="Download app from Apple App Store" />
          </div>
        </div>
        <div className="relative flex justify-center">
          <img src={Smartphone} alt="" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
