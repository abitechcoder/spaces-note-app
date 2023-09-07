import React, { useRef } from "react";
import { LuFolderPlus } from "react-icons/lu";

const HeaderInputComponent = () => {
    const textInputDivRef=useRef(null)
	return (
		<div>
			<div className="flex justify-between text-white w-[85%] m-auto">
				<h2 className="text-sm text-gray-200/60">Folders</h2>
				<button className="cursor-pointer text-gray-200/60" >
					<LuFolderPlus size={20} />
				</button>
			</div>
			<div ref={textInputDivRef} className="hidden">
				<input type="text" />
			</div>
		</div>
	);
};

export default HeaderInputComponent;
