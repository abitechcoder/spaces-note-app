import { CgFileDocument } from "react-icons/cg";
import { useFolderCategoryContext } from "../context/folderCategoryContex";

const RecentComponent = () => {
	const { notes, setNoteIdHandler } = useFolderCategoryContext();
	const onclickHandler = (e) => {
		setNoteIdHandler(e.target.value);
	};
	const recentNotes = notes.sort((noteA, noteB) =>
		Number(new Date(noteB.date) - Number(new Date(noteA.date)))
	);

	const renderRecentNote = recentNotes.slice(0, 3).map((note, index) => {
		return (
			<li key={note.id} className=" mb-6 h-[3rem]">
				<label htmlFor={index}>
					<input
						type="radio"
						name="recent-note"
						id={index}
						value={note.id}
						onClick={onclickHandler}
						className="recent-note-radio"
					/>
					<div className="flex gap-6 -mt-[2.5rem] items-center ml-5">
						<CgFileDocument size={20} color="#ffffff" opacity={1} />
						<p className="text-white">{note.title}</p>
					</div>
				</label>
			</li>
		);
	});
	return <ul>{renderRecentNote}</ul>;
};

export default RecentComponent;
