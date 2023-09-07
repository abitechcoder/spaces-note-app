import React, { useEffect, useRef, useState } from "react";
import { LuFolderOpen, LuFolderPlus } from "react-icons/lu";
import CategoryComponent from "./CategoryComponent";

const FoldersComponent = () => {
  const [toggle, setToggle] = useState(true);
  const textInputDivRef = useRef(null);
  const addCategoryHandler = () => {
    if (toggle === true) {
      textInputDivRef.current.classList.add("display");
      textInputDivRef.current.classList.remove("text-hidden");
    } else if (toggle === false) {
      textInputDivRef.current.classList.remove("display");
      textInputDivRef.current.classList.add("text-hidden");
    }
    setToggle((prv) => !prv);
  };

  useEffect(() => {
	textInputDivRef.current.innerHtml=""
  

  }, [])
  
  return (
    <div>
      <div className="flex justify-between text-white w-[85%] m-auto">
        <h2 className="text-sm text-gray-200/60">Folders</h2>
        <button
          className="cursor-pointer text-gray-200/60"
          onClick={addCategoryHandler}
        >

          <LuFolderPlus size={20}  />
        </button>
      </div>

      <div ref={textInputDivRef} className=" hidden ml-[1.5rem] gap-[1rem] mt-[1rem]">
		<LuFolderOpen size={20} color="#FFFFFF"/>
        <input className= "text-gray-300/60 bg-black/20 border border-gray-600" type="text" />
      </div>
      <div>
        <CategoryComponent />
      </div>
    </div>
  );
};

export default FoldersComponent;
