import React, { useState, useContext } from "react";
import { useUserCategories } from "../../hooks/dataFetcher";
import { LuFolderOpen, LuFolderClosed } from "react-icons/lu";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { useSelector } from "react-redux";
import { deleter } from "../../util/fetcher";
import { toast } from "react-toastify";
import { mutate } from "swr";

function NotesFolderList() {
  const { user } = useSelector((state) => state.auth);
  const { activeFolder, setActiveFolder, setActiveNote, setMyFavourites } =
    useContext(DashboardContext);
  const { categories } = useUserCategories(user?.userAccount._id);

  const handleClick = (category) => {
    setActiveFolder(category);
    setActiveNote(null);
    setMyFavourites(null);
  };

  const deleteCategory = async (category) => {
    alert(`${category.title} folder will be deleted`);
    try {
      await deleter(`/category/${category?._id}`);
      toast.success(`${category.title} folder deleted successfully`);
      mutate();
    } catch (error) {
      toast.error(`Error occured while deleting ${category.title} folder`);
    }
  };

  const FoldersList = categories?.map((folder) => {
    return (
      <div
        key={folder._id}
        className={`px-[20px] py-[10px] mt-2 flex items-center justify-between hover:bg-gray-500/30 ${
          activeFolder?._id === folder._id ? "bg-gray-500/30" : ""
        }`}
      >
        <div
          className="flex items-center cursor-pointer gap-4 flex-1"
          onClick={() => handleClick(folder)}
        >
          {activeFolder?._id === folder._id ? (
            <LuFolderOpen size={20} className="text-white" />
          ) : (
            <LuFolderClosed size={20} className="text-gray-200/60" />
          )}
          <p
            className={`font-bold ${
              activeFolder?._id === folder._id
                ? "text-white"
                : "text-gray-200/60"
            }`}
          >
            {folder.title}
          </p>
        </div>
        <RiDeleteBin7Line
          className="h-5 w-5 text-red-700 cursor-pointer"
          onClick={() => deleteCategory(folder)}
        />
      </div>
    );
  });

  return <>{FoldersList}</>;
}

export default NotesFolderList;
