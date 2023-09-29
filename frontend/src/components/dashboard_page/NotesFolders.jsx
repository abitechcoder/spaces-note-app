import { useRef, useState } from "react";
import { LuFolderOpen, LuFolderPlus } from "react-icons/lu";
import { HiOutlineXMark } from "react-icons/hi2";
import { FiCheck } from "react-icons/fi";
import NotesFolderList from "./NotesFolderList";
import { poster } from "../../util/fetcher";
import { CategoryComponent } from "../folder_category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUserCategories } from "../../hooks/dataFetcher";

function NotesFolders() {
  const [toggle, setToggle] = useState(true);
  const [folderName, setFolderName] = useState("");
  const textInputDivRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const {categories, mutate} = useUserCategories(user?.userAccount._id)

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

  const saveFolderHandler = async () => {
    const newFolder = {
      title: folderName,
      userId: user.userAccount._id,
    };

    try {
      if (user) {
        await poster("/category", newFolder);
      }
      // mutate(`/category/user/${user.userAccount._id}`);
      mutate([...categories, newFolder]);
      setFolderName("");
      setToggle(false);
      toggleCategoryHandler();
      toast.success("Folder created successfully");
    } catch (error) {
      toast.error("Error occured while creating notes folder");
    }
  };

  const handleClose = () => {
    setFolderName("");
    setToggle(false);
    toggleCategoryHandler();
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
        className=" hidden ml-[1.5rem] gap-3 mt-[1rem]"
      >
        <LuFolderOpen size={20} color="#FFFFFF" />
        <input
          className="text-gray-300/60 bg-black/20 border border-gray-600"
          type="text"
          name="folder"
          value={folderName}
          onChange={onchangeHandler}
        />
        {folderName.length > 1 ? (
          <FiCheck
            size={20}
            color="#FFFFFF"
            cursor="pointer"
            onClick={saveFolderHandler}
          />
        ) : (
          <HiOutlineXMark
            size={20}
            color="#FFFFFF"
            cursor="pointer"
            onClick={handleClose}
          />
        )}
      </div>
      <NotesFolderList />
    </div>
  );
}

export default NotesFolders;
