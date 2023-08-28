import React from "react";

function Feature({ image, title, text }) {
  return (
    <div className="w-full grid gap-2">
      <img src={image} className="mx-auto" alt="" />
      <h3 className="text-center text-[#101828] text-lg md:text-xl font-bold font-dm">{title}</h3>
      <p className="text-base text-[#667085] leading-normal text-center font-dm">
        {text}
      </p>
    </div>
  );
}

export default Feature;
