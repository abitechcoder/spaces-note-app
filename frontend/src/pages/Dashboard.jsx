import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useCategories } from "../hooks/dataFetcher";
import { logout, reset } from "../features/auth/authSlice";

import { LogoWhite } from "../assets";
import { CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";

import { FoldersComponent } from "../components/folder_category";
import MoreSectionComponent from "../components/more_section/MoreSectionComponent";
import {
  RecentNotes,
  NewNoteDialog,
  Reflection,
} from "../components/Dashboard";
import { useFolderCategoryContext } from "../context/folderCategoryContex";
import NoteCategoryComponent from "../components/folder_category/NoteCategoryComponent";
import { TextContext } from "../util/TextContext.jsx";

function Dashboard() {
  const { noteId } = useFolderCategoryContext();
  console.log("Note Id: ", noteId);
  const { text, setText } = useContext(TextContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(true);
  // const { categories, isLoading, isError } = useCategories();

  // if (!isError) {
  //   console.log("Categories: ", categories);
  // }

  const { user } = useSelector((state) => state.auth);

  const textHandler = () => {
    setText(!text);
  };
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <>
      <section className="h-screen grid grid-cols-[300px_350px_1fr] bg-[#181818]">
        <div className="py-[30px] overflow-y-scroll">
          <div className="w-[280px] px-[20px] bg-[#181818]">
            <div className="flex items-center justify-between">
              <img src={LogoWhite} alt="" className="h-[50px]" />
              <CiSearch size={25} color="#ffffff" />
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="mt-[30px] w-full p-[10px] rounded-lg bg-[#ffffff] bg-opacity-5 text-white flex justify-center items-center gap-2"
            >
              <AiOutlinePlus className="inline-block" size={25} />
              <p className="font-bold font-sans">New Note</p>
            </button>
          </div>

          {/* List of Recent Notes */}
          <RecentNotes />
          {/* Folder category section starts here*/}
          <div className="mt-5">
            <FoldersComponent />
            <MoreSectionComponent />
          </div>
          {/* Folder category section ends here*/}

          <div className="flex justify-center mt-8">
            <button
              onClick={() => onLogout()}
              className="py-[15px] bg-red-700 hover:bg-red-500 text-white w-[80%] rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="bg-[#1c1c1c]"></div>
        <div></div>
      </section>
      <NewNoteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Dashboard;
