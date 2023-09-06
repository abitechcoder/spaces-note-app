import { Fragment, useState } from "react";
import { categoryList } from "../../util/folderCategoryList";
import CategoryComponent from "./CategoryComponent.jsx";
import { LuFolder, LuFolderOpen } from "react-icons/lu";

const CategoryComponentList = () => {
	// const [category,setCategory]=useState("")

	const renderCategoryList = categoryList.map((list) => {
		return (
			<Fragment key={list.id}>
				<div id={list.category} className="">
					<LuFolder size={20} />
				</div>
				<div className="hidden">
					<LuFolderOpen size={20} />
				</div>
				<CategoryComponent Category={list.category} Id={list.id} />
			</Fragment>
		);
	});
	return <div>{renderCategoryList}</div>;
};

export default CategoryComponentList;
