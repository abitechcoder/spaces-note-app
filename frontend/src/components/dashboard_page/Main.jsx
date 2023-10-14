import React, { useContext, useEffect } from "react";
import {
  NotesList,
  EditNote,
  EmptyNoteState,
  EmptyFolderState,
  TrashedNoteState,
} from "./";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { useSelector } from "react-redux";
import { useUserNotes, useUserCategories } from "../../hooks/dataFetcher";

function Main() {
  const { user } = useSelector((state) => state.auth);
  const { notes } = useUserNotes(user?.userAccount._id);
  const {
    activeFolder,
    activeNote,
    myFavourites,
    showSearchResults,
    setMyNotes,
    showTrashedNotes,
    showArchivedNotes,
  } = useContext(DashboardContext);
  const { categories } = useUserCategories(user?.userAccount._id);

  useEffect(() => {
    setMyNotes(notes);
  }, [notes]);

  // useEffect(() => {
  //   alert(`Active Note: ${activeNote}`)
  // }, [activeNote])

  // , user?.userAccount._id, activeFolder?._id, activeNote?._id
  return (
    <main
      className={`h-screen grid ${
        (activeFolder ||
          myFavourites ||
          showSearchResults ||
          showArchivedNotes ||
          showTrashedNotes) &&
        "grid-cols-[350px_1fr]"
      } bg-[#181818]`}
    >
      {(activeFolder ||
        myFavourites ||
        showSearchResults ||
        showArchivedNotes ||
        showTrashedNotes) && <NotesList />}
      <div className="w-full">
        {activeFolder ||
        myFavourites ||
        showSearchResults ||
        showArchivedNotes ||
        showTrashedNotes ? (
          activeNote ? (
            showTrashedNotes ? (
              <TrashedNoteState />
            ) : (
              <EditNote categories={categories} />
            )
          ) : (
            <EmptyNoteState />
          )
        ) : activeNote ? (
          <EditNote categories={categories} />
        ) : (
          <EmptyFolderState />
        )}
      </div>
    </main>
  );
}

export default Main;
