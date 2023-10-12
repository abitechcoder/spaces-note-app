import React, { useContext } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { deleter } from "../../util/fetcher";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function TrashedNoteState() {
  const { activeNote, setActiveNote } = useContext(DashboardContext);
  const { user } = useSelector((state) => state.auth);
  
  const deleteNoteHandler = async (noteId) => {
    try {
      await deleter(`/note/${noteId}`);
      toast.success("Note permanently deleted");
      mutate(`/note/user/${user?.userAccount._id}`);
    } catch (error) {
      console.log("ERROR:", error)
      toast.error("Error occured while deleting note");
    }
  };

  const deleteNote = () => {
    alert(`${activeNote?.title} note will be permanently deleted`)
    deleteNoteHandler(activeNote?._id);
    setActiveNote(null);
  }
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="w-[460px] grid gap-3 place-items-center">
        <FaClockRotateLeft className="w-20 h-20 text-white/50" />
        <h1 className="text-white font-bold text-xl">
          Restore "{activeNote?.title}"
        </h1>
        <p className="text-center text-white/60">
          Don't want to lose this note? It's not too late! Just click the
          'Restore' button and it will be added back to your list. It's that
          simple.
        </p>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-[#312EB5] text-white rounded-md">Restore</button>
          <button onClick={deleteNote} className="px-4 py-2 bg-red-700 text-white rounded-md">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TrashedNoteState;
