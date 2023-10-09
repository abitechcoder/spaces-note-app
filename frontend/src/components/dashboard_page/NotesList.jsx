import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/DashboardContextProvider";

function NotesList() {
  const { activeFolder, setActiveNote, activeNote, myNotes, myFavourites } =
    useContext(DashboardContext);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if(myFavourites) {
      const notes = myNotes?.filter(
        (note) => note.favourite === myFavourites
      );
      setFilteredNotes(notes);
      setTitle("Favourites")
    } else {
      const notes = myNotes?.filter(
        (note) => note.categoryId === activeFolder?._id
      );
      setFilteredNotes(notes);
      setTitle(activeFolder?.title)
    }
    
  }, [activeNote, activeFolder, myNotes, myFavourites]);

  const handleClick = (data) => {
    console.log("Active Note:", data)
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
          </span>
          {/* {note?.description.substring(0, 25) + " . . ."} */}
        </p>
      </div>
    );
  });
  return (
    <div className={`bg-[#1c1c1c]  p-4 overflow-y-auto`}>
      <h2 className="text-white font-bold text-xl font-sans">
        {title}
      </h2>
      {filteredNotes?.length === 0 ? (
        <div className="h-screen grid place-items-center">
          <p className="text-gray-300/60">No note created yet!</p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4">{renderNotes}</div>
      )}
    </div>
  );
}

export default NotesList;
