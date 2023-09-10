import { useEffect, useState } from "react";
import { useFolderCategoryContext } from "../../context/folderCategoryContex";

const NoteCategoryComponent = () => {
	const { category } = useFolderCategoryContext();

	const [noteCategory, setNoteCategory] = useState([]);
	const onclickHandler = (e) => {
		const noteId = e.target.id;
		console.log(noteId);
	};

	useEffect(() => {
		setNoteCategory(JSON.parse(localStorage.getItem("filteredNote")));
	}, [category]);

	const renderNotes = noteCategory.map((note) => {
		return (
			<li key={note.id} className="bg-black/20 mb-5 w-[90%] m-auto h-[6rem] ">
				<label htmlFor={note.id}>
					<input
						type="radio"
						id={note.id}
						name="noteCategory"
						onClick={onclickHandler}
						className="note_category_radio  cursor-pointer"
					/>
					<div className="absolute -mt-[5rem] z-20 pl-5">
						<h2 className="text-white mb-2">{note.title}</h2>
						<p className="text-gray-300/60">
							<span className="mr-2 text-gray-300/30">{note.date}</span>{" "}
							{note.details.substring(0, 25) + " . . ."}
						</p>
					</div>
				</label>
			</li>
		);
	});
	return (
		<section>
			<h2 className="text-white m-5">{category}</h2>
			<ul>{renderNotes}</ul>
		</section>
	);
};

export default NoteCategoryComponent;
