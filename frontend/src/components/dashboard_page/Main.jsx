import React, { useContext, useEffect } from "react";
import { NotesList, EditNote, EmptyNoteState, EmptyFolderState } from "./";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { useSelector } from "react-redux";
import { useUserNotes, useUserCategories } from "../../hooks/dataFetcher";

function Main() {
  const { user } = useSelector((state) => state.auth);
  const { notes } = useUserNotes(user?.userAccount._id);
  const { activeFolder, activeNote, myFavourites, showSearchResults, setMyNotes } = useContext(DashboardContext);
  const {categories} = useUserCategories(user?.userAccount._id)

  useEffect(() => {
    setMyNotes(notes);
  }, [notes]);

  // , user?.userAccount._id, activeFolder?._id, activeNote?._id
  return (
    <main
      className={`h-screen grid ${
        (activeFolder || myFavourites || showSearchResults) && "grid-cols-[350px_1fr]"
      } bg-[#181818]`}
    >
      {(activeFolder || myFavourites) && <NotesList />}
      <div className="w-full">
        {(activeFolder || myFavourites) ? (
          activeNote ? (
            <EditNote categories={categories} />
          ) : (
            <EmptyNoteState />
          )
        ) : (
          <EmptyFolderState />
        )}
      </div>
    </main>
  );
}

export default Main;
