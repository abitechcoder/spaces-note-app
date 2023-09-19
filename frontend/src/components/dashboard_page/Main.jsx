import React, { useContext, useEffect } from "react";
import { NotesList, EditNote, EmptyNoteState, EmptyFolderState } from "./";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { useSelector } from "react-redux";
import { useUserNotes } from "../../hooks/dataFetcher";

function Main() {
  const { user } = useSelector((state) => state.auth);
  const { data } = useUserNotes(user?.userAccount._id);
  const { activeFolder, activeNote } = useContext(DashboardContext);
  const { setMyNotes } = useContext(DashboardContext);

  useEffect(() => {
    setMyNotes(data?.notes);
  }, [user?.userAccount._id, activeFolder?._id, activeNote?._id]);
  return (
    <main
      className={`h-screen grid ${
        activeFolder && "grid-cols-[350px_1fr]"
      } bg-[#181818]`}
    >
      {activeFolder && <NotesList />}
      <div className="w-full">
        {activeFolder ? (
          activeNote ? (
            <EditNote />
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
