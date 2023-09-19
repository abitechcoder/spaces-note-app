import { useRef, useState } from "react";
import { LuFolderOpen, LuFolderPlus } from "react-icons/lu";
import { FiCheck } from "react-icons/fi";
import NotesFolderList from "./NotesFolderList";
import { poster } from "../../util/fetcher";
import { CategoryComponent } from "../folder_category";
import { mutate } from "swr";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function NotesFolders() {
  const [toggle, setToggle] = useState(true);
  const [folderName, setFolderName] = useState("");
  const textInputDivRef = useRef(null);
  const {user} = useSelector((state) => state.auth);

  

  const toggleCategoryHandler = () => {
    if (toggle === true) {
      textInputDivRef.current.classList.add("display");
      textInputDivRef.current.classList.remove("text-hidden");
    } else if (toggle === false) {
      textInputDivRef.current.classList.remove("display");
      textInputDivRef.current.classList.add("text-hidden");
    }
    setToggle((prev) => !prev);
  };

  const onchangeHandler = (e) => {
    setFolderName(e.target.value);
  };

  const saveFolderHandler = async() => {
    console.log("USER in Note list:", user)
    const newFolder = {
      title: folderName,
      userId: user.userAccount._id,
    };

    try {
      if(user) {
        await poster("/category", newFolder);
      }
      mutate(`/category/user/${user.userAccount._id}`)
      setFolderName("");
      setToggle(false);
      toggleCategoryHandler();
    } catch (error) {
      toast.error("Error occured while creating notes folder")
    }
  };

  return (
    <div>
      <div className="flex justify-between text-white w-full px-[20px]">
        <h2 className="text-sm text-gray-200/60 font-bold">Folders</h2>
        <button
          className="cursor-pointer text-gray-200/60"
          onClick={toggleCategoryHandler}
        >
          <LuFolderPlus size={20} />
        </button>
      </div>

      <div
        ref={textInputDivRef}
        className=" hidden ml-[1.5rem] gap-[1rem] mt-[1rem]"
      >
        <LuFolderOpen size={20} color="#FFFFFF" />
        <input
          className="text-gray-300/60 bg-black/20 border border-gray-600"
          type="text"
          name="folder"
          value={folderName}
          onChange={onchangeHandler}
        />
        <FiCheck
          size={20}
          color="#FFFFFF"
          cursor="pointer"
          onClick={saveFolderHandler}
        />
      </div>
        <NotesFolderList/>
    </div>
  );
}

export default NotesFolders;
