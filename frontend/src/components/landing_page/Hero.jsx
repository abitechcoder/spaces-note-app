import React from "react";
import { HeroImage, GooglePlayDark, AppleStoreDark } from "../../assets";
import { GoogleLogin } from "@react-oauth/google";

function Hero() {
  // using google authentication
  const windowFeatures = "left=200,top=100,width=420,height=520";
  const onclickHandler = async () => {
    window.open(
      "http://127.0.0.1:5000/auth/google", "mozillaWindow",windowFeatures
    )


  };
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
              <GoogleLogin
               render={renderProps => (
                <button onClick={renderProps.onClick} style={{}}>This is my custom Google button</button>
              )}
              buttonText="Login"
              onSuccess={credentialResponse=>{
                console.log(credentialResponse);
                
              }}
              onError={()=>console.log("error occured")
              }
              />
             {/* <img
                className="cursor-pointer"
                src={GooglePlayDark}
                alt="Download app from Google Play Store"
                onClick={onclickHandler}
              /> */}
              <img
                className="cursor-pointer"
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
