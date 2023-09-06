import { useState } from "react";
import { LuFolder, LuFolderOpen } from "react-icons/lu";

const CategoryComponent = ({ Category, Id }) => {
	// const [isSelected, setIsSelected] = useState(false);
	const [category, setCategory] = useState("");
	const OnchangeHandler = (e) => {
		setCategory(e.target.value);
	};
	console.log(category);
	// const toggle = () => {
	// 	setIsSelected((prev) => !prev);
	// };
	return (
		<label
			htmlFor={Id}
			className="flex gap-5 text-gray-200/60 w-[85%] m-auto mt-5 cursor-pointer relative"
		>
			<input
				type="radio"
				id={Id}
				name="category"
				value={Category}
				onChange={OnchangeHandler}
				className="text-base "
			/>
			{Category}
		</label>
	);
};

export default CategoryComponent;

{
	/* <div className="" >
<LuFolder size={20} />
</div>
<div className="hidden">
<LuFolderOpen size={20} />
</div> */
}
