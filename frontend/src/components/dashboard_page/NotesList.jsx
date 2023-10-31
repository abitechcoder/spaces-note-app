import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { fetcher } from "../../util/fetcher";

function NotesList() {
  const {
    activeFolder,
    setActiveNote,
    activeNote,
    myNotes,
    myFavourites,
    showSearchResults,
    showTrashedNotes,
    showArchivedNotes,
    searchInput,
  } = useContext(DashboardContext);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [title, setTitle] = useState(null);

  const getArchivedNotes = async () => {
    const response = await fetcher("/archive/note");
    setFilteredNotes(response?.archivedNotes);
    setTitle("Archived Notes:");
  };

  useEffect(() => {
    if (myFavourites) {
      const notes = myNotes?.filter((note) => note.favourite === myFavourites && note.isTrashed === false);
      setFilteredNotes(notes);
      setTitle("Favourites");
    } else if (showSearchResults) {
      const notes = myNotes?.filter((note) => {
        return searchInput === ""
          ? myNotes
          : note.title.toLowerCase().includes(searchInput.toLowerCase());
      });
      // console.log("Search:", notes);
      setFilteredNotes(notes);
      setTitle("Search Results:");
    } else if (showTrashedNotes) {
      const notes = myNotes?.filter(
        (note) => note.isTrashed === true
      );
      setFilteredNotes(notes);
      setTitle("Trashed Notes:");
    } else if (showArchivedNotes) {
      getArchivedNotes();
    } else {
      const notes = myNotes?.filter(
        (note) =>
          note.categoryId === activeFolder?._id && note.isTrashed === false
      );
      setFilteredNotes(notes);
      setTitle(activeFolder?.title);
    }
  }, [
    activeNote,
    activeFolder,
    myNotes,
    myFavourites,
    showSearchResults,
    showArchivedNotes,
    showTrashedNotes,
    searchInput,
  ]);

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
          </span>
          {/* {note?.description.substring(0, 25) + " . . ."} */}
        </p>
      </div>
    );
  });
  return (
    <div className={`bg-[#1c1c1c] ${activeNote && "hidden lg:block"} h-full p-4 overflow-y-auto`}>
      <h2 className="text-white font-bold text-xl font-sans">{title}</h2>
      {filteredNotes?.length === 0 ? (
        <div className="flex flex-1 flex-col h-full items-center justify-center">
          <p className="text-gray-300/60">No notes found!</p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4">{renderNotes}</div>
      )}
    </div>
  );
}

export default NotesList;
