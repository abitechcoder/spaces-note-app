import { useEffect, useRef, useState } from "react";
import { LuFolderOpen, LuFolderPlus } from "react-icons/lu";
import CategoryComponent from "./CategoryComponent";
import { FiCheck } from "react-icons/fi";
import { useFolderCategoryContext } from "../../context/folderCategoryContex";

const FoldersComponent = () => {
	const [toggle, setToggle] = useState(true);
	const [folderName, setFolderName] = useState("");
	const { setFolderCategoryFunction } =
		useFolderCategoryContext();
	const textInputDivRef = useRef(null);

	const toggleCategoryHandler = () => {
		if (toggle === true) {
			textInputDivRef.current.classList.add("display");
			textInputDivRef.current.classList.remove("text-hidden");
		} else if (toggle === false) {
			textInputDivRef.current.classList.remove("display");
			textInputDivRef.current.classList.add("text-hidden");
		}
		setToggle((prv) => !prv);
	};
	const onchangeHandler = (e) => {
		setFolderName(e.target.value);
	};
	const saveFolderHandler = () => {
		const newFolder = {
			id: new Date().getMilliseconds(),
			category: folderName,
		};
		setFolderCategoryFunction(newFolder);
		setFolderName("");
		setToggle(false);
    toggleCategoryHandler()
	};

	// console.log(folderCategory);
	return (
		<div>
			<div className="flex justify-between text-white w-[85%] m-auto">
				<h2 className="text-sm text-gray-200/60">Folders</h2>
				<button
					className="cursor-pointer text-gray-200/60"
					onClick={toggleCategoryHandler}
				>
					<LuFolderPlus size={20} />
				</button>
			</div>

			<div
				ref={textInputDivRef}
				className=" hidden ml-[1.5rem] gap-[1rem] mt-[1rem]"
			>
				<LuFolderOpen size={20} color="#FFFFFF" />
				<input
					className="text-gray-300/60 bg-black/20 border border-gray-600"
					type="text"
					name="folder"
					value={folderName}
					onChange={onchangeHandler}
				/>
				<FiCheck
					size={20}
					color="#FFFFFF"
					cursor="pointer"
					onClick={saveFolderHandler}
				/>
			</div>
			<div>
				<CategoryComponent />
			</div>
		</div>
	);
};

export default FoldersComponent;
