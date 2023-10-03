import React from 'react'

const TextInput = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`w-full rounded md:rounded-lg py-2 px-4 border-[1.5px] bg-[#f7f7f] border-[#898989] border-opacity-30 ${props.className}`}
  />
));

export default TextInput;


