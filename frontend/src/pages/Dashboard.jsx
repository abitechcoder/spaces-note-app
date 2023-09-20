import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

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
  NotesFolders,
  NotesList,
  Main,
} from "../components/dashboard_page";
import { useFolderCategoryContext } from "../context/folderCategoryContex";
import NoteCategoryComponent from "../components/folder_category/NoteCategoryComponent";
import { TextContext } from "../util/TextContext.jsx";
import {
  DashboardContextProvider,
} from "../context/DashboardContextProvider";

function Dashboard() {
  const { text, setText } = useContext(TextContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const textHandler = () => {
    setText(!text);
  };
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <DashboardContextProvider>
      <>
        <section className="h-screen grid grid-cols-[320px_1fr] bg-[#181818]">
          <div className="py-[30px] overflow-y-scroll">
            <div className="w-[300px] px-[20px] bg-[#181818]">
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
              {/* <FoldersComponent /> */}
              <NotesFolders />
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
          <Main />
        </section>
        <NewNoteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    </DashboardContextProvider>
  );
}

export default Dashboard;
