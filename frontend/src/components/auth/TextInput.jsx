import React from "react";

function TextInput({...props}) {
  return (
    <input
      {...props}
      className="w-full rounded md:rounded-lg py-2 px-4 border-[1.5px] bg-[#f7f7f] border-[#898989] border-opacity-30"
    />
  );
}

export default TextInput;
