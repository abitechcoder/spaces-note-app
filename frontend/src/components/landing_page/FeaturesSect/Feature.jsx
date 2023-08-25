import React from "react";

function Feature({ image, title, text }) {
  return (
    <div className="w-[358px] grid gap-2">
      <img src={image} className="mx-auto" alt="" />
      <h3 className="text-center text-[#101828] text-xl font-bold">{title}</h3>
      <p className="text-base text-[#667085] leading-normal text-center">
        {text}
      </p>
    </div>
  );
}

export default Feature;
