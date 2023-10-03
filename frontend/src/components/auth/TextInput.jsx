import React from 'react'

<<<<<<< HEAD
function TextInput({...props}) {
  return (
    <div>
      <input
      {...props}
      className="w-full rounded md:rounded-lg py-2 px-4 border-[1.5px] bg-[#f7f7f] border-[#898989] border-opacity-30"
    />
    </div>
  )
}
=======
const TextInput = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`w-full rounded md:rounded-lg py-2 px-4 border-[1.5px] bg-[#f7f7f] border-[#898989] border-opacity-30 ${props.className}`}
  />
));
>>>>>>> 1a62ccf9566d93fddc4574e90ae02c8781d8c378

export default TextInput;


