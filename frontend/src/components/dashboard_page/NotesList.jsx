import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/DashboardContextProvider";

function NotesList() {
  const { activeFolder, setActiveNote, activeNote, myNotes } =
    useContext(DashboardContext);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const notes = myNotes?.filter(
      (note) => note.categoryId === activeFolder?._id
    );
    setFilteredNotes(notes);
    console.log("Notes:", notes);
  }, [activeNote, activeFolder, myNotes]);

  const handleClick = (data) => {
    setActiveNote(data);
  };

  const renderNotes = filteredNotes?.map((note) => {
    return (
      <div
        key={note._id}
        className={`px-3 py-3 gap-4 cursor-pointer hover:bg-white/10 rounded-md ${
          activeNote?._id === note._id ? "bg-white/10" : "bg-white/5"
        }`}
        onClick={() => handleClick(note)}
      >
        <h2 className="text-white mb-2 font-sans font-bold text-lg">
          {note?.title}
        </h2>
        <p className="text-gray-300/60">
          <span className="mr-2 text-gray-300/30">
            {note?.createdAt.substring(0, 10).split("-").reverse().join("-")}
          </span>{" "}
          {note?.description.substring(0, 25) + " . . ."}
        </p>
      </div>
    );
  });
  return (
    <div className={`bg-[#1c1c1c]  p-4 overflow-y-auto`}>
      <h2 className="text-white font-bold text-xl font-sans">
        {activeFolder?.title}
      </h2>
      <div className="mt-4 grid gap-4">{renderNotes}</div>
    </div>
  );
}

export default NotesList;
