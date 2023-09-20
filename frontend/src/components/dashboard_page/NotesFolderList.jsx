import React, {useState, useContext} from "react";
import { useCategories, useUserCategories } from "../../hooks/dataFetcher";
import { LuFolderOpen, LuFolderClosed } from "react-icons/lu";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { useSelector } from "react-redux";

function NotesFolderList() {
  const { user } = useSelector((state) => state.auth);
  const {activeFolder, setActiveFolder, setActiveNote} = useContext(DashboardContext);
  const { data } = useUserCategories(user?.userAccount._id);
  
  const handleClick = (data) => {
    setActiveFolder(data);
    setActiveNote(null);
  };

  const FoldersList = data?.categories.map((folder) => {
    return (
        <div
        key={folder._id}
        className={`px-[20px] py-[10px] mt-2 flex items-center gap-4 cursor-pointer hover:bg-gray-500/30 ${
          activeFolder?._id === folder._id ? "bg-gray-500/30" : ""
        }`}
        onClick={() => handleClick(folder)}
      >
        {activeFolder?._id === folder._id ? (<LuFolderOpen size={20} className="text-white"/>) : (<LuFolderClosed size={20} className="text-gray-200/60"/>)}
        <p className={`font-bold ${activeFolder?._id === folder._id ? "text-white" : "text-gray-200/60"}`}>{folder.title}</p>
      </div>
    );
  });

  return <>{FoldersList}</>;
}

export default NotesFolderList;
