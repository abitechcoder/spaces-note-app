import React from "react";
import { HeroImage, GooglePlayDark, AppleStoreDark } from "../../assets";

function Hero() {
  return (
    <section className="text-black relative">
      <div className="custom-container grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2">
        <div className="grid md:place-items-center">
          <div className="grid gap-6 md:gap-8">
            <p className="font-clash font-[500] text-center md:text-left text-3xl md:text-4xl lg:text-5xl leading-normal md:leading-[50px] lg:leading-[70px]">
              Enjoy note taking with your friends
            </p>
            <p className="font-dm text-sm text-[#A1A1A1] text-center md:text-left">
              Put down your thoughts down in one app, share with your friends
              and loved ones.
            </p>
            <div className="flex justify-between md:justify-start gap-0 md:gap-8">
              <img
                src={GooglePlayDark}
                alt="Download app from Google Play Store"
              />
              <img
                src={AppleStoreDark}
                alt="Download app from Apple App Store"
              />
            </div>
          </div>
        </div>
        <div className="relative flex justify-center">
          <img src={HeroImage} className="max-h-[70vh]" alt="" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
