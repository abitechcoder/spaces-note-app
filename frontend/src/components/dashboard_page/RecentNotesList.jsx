import { CgFileDocument } from "react-icons/cg";
import { useState, useContext } from "react";
import { useUserNotes } from "../../hooks/dataFetcher";
import { useSelector } from "react-redux";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { MobileNavContext } from "../../context/MobileNavContext";

const RecentNotesList = () => {
  const { user } = useSelector((state) => state.auth);
  const { notes } = useUserNotes(user?.userAccount._id);
  const [activeNoteId, setActiveNoteId] = useState(0);
  const {
    setActiveNote,
    setActiveFolder,
    setMyFavourites,
    setShowArchivedNotes,
    setShowTrashedNotes,
    setShowSearchResults,
  } = useContext(DashboardContext);
  const { setIsMobileMenuOpen } = useContext(MobileNavContext);

  const handleClick = (note) => {
    setActiveNoteId(note?._id);
    setActiveNote(note);
    setActiveFolder(null);
    setMyFavourites(false);
    setShowArchivedNotes(false);
    setShowTrashedNotes(false);
    setShowSearchResults(false);
    setIsMobileMenuOpen(false);
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
        onClick={() => handleClick(note)}
      >
        <CgFileDocument size={20} color="#ffffff" opacity={1} />
        <p className="text-white">{note?.title}</p>
      </div>
    );
  });
  return <ul>{renderRecentNote}</ul>;
};

export default RecentNotesList;
