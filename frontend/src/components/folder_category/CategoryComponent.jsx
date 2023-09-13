import { useFolderCategoryContext } from "../../context/folderCategoryContex";
const CategoryComponent = () => {
	const {
		notes,
		folderCategory,
		setNoteCategoryFunction,
		setCategoryHandler,
		resetCategoryNoteHandler,
	} = useFolderCategoryContext();
	// category filter function to filter out notes using category folder
	const categoryFilter = (category) => {
		const filteredNote = notes.filter((note) => note.category == category);
		if (filteredNote) {
			// console.log(filteredNote);
      resetCategoryNoteHandler()
			localStorage.setItem("filteredNote", JSON.stringify(filteredNote));
			// 	setting filtered note to  context
			setNoteCategoryFunction(filteredNote);
		}
	};

	const onclickHandler = (e) => {
    const category=e.target.value
	console.log(category);
    localStorage.setItem("category",JSON.stringify(category))
    setCategoryHandler(category)
		categoryFilter(category);
	};
	// mapping over folder category from context
	const renderCategoryList = folderCategory.map((list) => {
		return (
			<li key={list.id} className="cursor-pointer">
				<label
					htmlFor={list.id}
					className="flex gap-5 text-gray-200/60 w-[100%] m-auto mt-5 cursor-pointer relative"
				>
					<input
						type="radio"
						id={list.id}
						name="category"
						value={list.category}
						className="category_radio text-base "
						onClick={onclickHandler}
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
