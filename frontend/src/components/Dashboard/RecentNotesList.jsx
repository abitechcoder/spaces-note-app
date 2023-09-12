import { CgFileDocument } from "react-icons/cg";
import { useFolderCategoryContext } from "../../context/folderCategoryContex";
import { useState } from "react";

const RecentNotesList = () => {
  const { notes, setNoteIdHandler } = useFolderCategoryContext();
  const [activeNoteId, setActiveNoteId] = useState(0);

  const handleClick = (id) => {
    setActiveNoteId(id);
  };
  const recentNotes = notes.sort((noteA, noteB) =>
    Number(new Date(noteB.date) - Number(new Date(noteA.date)))
  );

  const renderRecentNote = recentNotes.slice(0, 3).map((note, index) => {
    return (
      <div
        key={note.id}
        className={`px-[20px] py-[10px] flex gap-2 cursor-pointer hover:bg-[#312EB5] ${
          activeNoteId === note.id ? "bg-[#312EB5]" : ""
        }`}
        onClick={() => handleClick(note.id)}
      >
        <CgFileDocument size={20} color="#ffffff" opacity={1} />
        <p className="text-white">{note.title}</p>
      </div>
    );
  });
  return <ul>{renderRecentNote}</ul>;
};

export default RecentNotesList;
