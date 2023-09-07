import { useState } from "react";
import { categoryList } from "../../util/folderCategoryList";
import CategoryComponent from "./CategoryComponent.jsx";
// import { LuFolder, LuFolderOpen } from "react-icons/lu";

const CategoryComponentList = () => {
	const [category,setCategory]=useState("")
const onclickHandler=(e)=>{
	setCategory(e.target.value) 
}
console.log(category)
	const renderCategoryList = categoryList.map((list) => {
		return (
			<li key={list.id} onClick={onclickHandler} >
				<CategoryComponent Category={list.category} Id={list.id}/>
			</li>
		);
	});
	return <ul className="">{renderCategoryList}</ul>;
};

export default CategoryComponentList;
