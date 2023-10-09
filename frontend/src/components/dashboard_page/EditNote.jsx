import React, { useContext, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BsFolder } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { toast } from "react-toastify";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { DropdownMenu } from "./";
import { patcher } from "../../util/fetcher";
import { mutate } from "swr";
import { useSelector } from "react-redux";

function EditNote({categories}) {
  const { user } = useSelector((state) => state.auth);
  const { activeNote, activeFolder } = useContext(DashboardContext);
  const [note, setNote] = useState(activeNote?.description);
  const [noteFolder, setNoteFolder] = useState(null);

  useEffect(() => {
    setNote(activeNote?.description);
    const filteredFolder = categories?.filter((category) => category?._id === activeNote?.categoryId)[0];
    setNoteFolder(filteredFolder);
  }, [activeNote]);

  const updateNote = async () => {
    const data = {
      title: activeNote?.title,
      description: note,
    };

    try {
      await patcher(`/note/${activeNote?._id}`, data);
      toast.success("Note saved successfully!");
      mutate(`/note/user/${user?.userAccount._id}`);
    } catch (error) {
      toast.error("Sorry, error occured while saving note");
    }
  };
  return (
    <>
      <div className="py-6 px-8">
        <div className="grid gap-4">
          <div className="grid grid-cols-[1fr_32px]">
            <h1 className="text-white font-bold text-2xl">
              {activeNote?.title}
            </h1>

            <DropdownMenu noteId={activeNote?._id} />
          </div>
          <div className="grid gap-2">
            <div className="grid gap-10 grid-cols-[100px_1fr] py-4 border-b-2 border-white/10">
              <div className="flex items-center gap-4">
                <BiCalendar className="w-6 h-6 text-white/60" />
                <p className="text-white/60">Date</p>
              </div>
              <p className="text-white">
                {activeNote?.createdAt
                  .substring(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
              </p>
            </div>
            <div className="grid gap-10 grid-cols-[100px_1fr] py-4 border-b-2 border-white/10">
              <div className="flex items-center gap-4">
                <BsFolder className="w-6 h-6 text-white/60" />
                <p className="text-white/60">Folder</p>
              </div>
              <p className="text-white">{noteFolder?.title}</p>
            </div>
          </div>
        </div>
        <ReactQuill
          theme="snow"
          placeholder={"Write your Note here"}
          className="mt-8 h-[350px] text-white"
          value={note}
          onChange={setNote}
        />
        <div className="w-full flex justify-center">
          <button
            onClick={updateNote}
            className="px-12 py-3 bg-[#523cdb] text-white font-bold cursor-pointer rounded-full absolute bottom-10 right-10"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default EditNote;
