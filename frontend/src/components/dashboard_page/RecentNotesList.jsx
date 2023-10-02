import { CgFileDocument } from "react-icons/cg";
import { useFolderCategoryContext } from "../../context/folderCategoryContex";
import { useState } from "react";
import { useUserNotes } from "../../hooks/dataFetcher";
import { useSelector } from "react-redux";

const RecentNotesList = () => {
  const {user} = useSelector((state) => state.auth);
  const {notes} = useUserNotes(user?.userAccount._id);
  const [activeNoteId, setActiveNoteId] = useState(0);

  const handleClick = (id) => {
    setActiveNoteId(id);
  };
  const recentNotes = notes?.sort((noteA, noteB) =>
    Number(new Date(noteB.updatedAt) - Number(new Date(noteA.updatedAt)))
  );

  const renderRecentNote = recentNotes?.slice(0, 3).map((note, index) => {
    return (
      <div
        key={note._id}
        className={`px-[20px] py-[10px] flex gap-2 cursor-pointer hover:bg-[#312EB5] ${
          activeNoteId === note?._id ? "bg-[#312EB5]" : ""
        }`}
        onClick={() => handleClick(note?._id)}
      >
        <CgFileDocument size={20} color="#ffffff" opacity={1} />
        <p className="text-white">{note?.title}</p>
      </div>
    );
  });
  return <ul>
    {renderRecentNote}
    </ul>;
};

export default RecentNotesList;
