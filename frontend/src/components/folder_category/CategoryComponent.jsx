
const CategoryComponent = ({ Category, Id, }) => {
	return (
		<label
			htmlFor={Id}
			className="flex gap-5 text-gray-200/60 w-[100%] m-auto mt-5 cursor-pointer relative"
		>
			<input
				type="radio"
				id={Id}
				name="category"
				value={Category}
				className="text-base "
			/>
			<p  className="absolute pl-[4rem]"> <span>{Category}</span> </p>
		</label>
	);
};

export default CategoryComponent;