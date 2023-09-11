import { useState } from "react";
import { useFolderCategoryContext } from "../../context/folderCategoryContex";



const CategoryComponent = () => {
  const [category, setCategory] = useState("");
  const {folderCategory}=useFolderCategoryContext()
  const onclickHandler = (e) => {
    setCategory(e.target.value);
  };
  console.log(category);
  const renderCategoryList = folderCategory.map((list) => {
    return (
      <li key={list.id} onClick={onclickHandler} className="cursor-pointer">
        <label
          htmlFor={list.id}
          className="flex gap-5 text-gray-200/60 w-[100%] m-auto mt-5 cursor-pointer relative"
        >
          <input
            type="radio"
            id={list.id}
            name="category"
            value={list.category}
            className="text-base "
          />
          <p className="absolute pl-[4rem]">
            <span>{list.category}</span>{" "}
          </p>
        </label>
      </li>
    );
  });
  return <ul className="">{renderCategoryList}</ul>;
};

export default CategoryComponent;
