<<<<<<< HEAD
import React, { useContext } from "react";
import LogoWhite from "../assets/LogoWhite.png";
import { CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import {CgFileDocument} from "react-icons/cg"
import Spaces from "../components/Dashboard/Spaces";
import Reflection from "../components/Dashboard/Reflection"
import { TextContext } from '../util/TextContext.jsx'




function Dashboard() {
  const { text, setText}  = useContext(TextContext)
  

const  textHandler = () => {
  setText("true")
}



  return (
    <section className="h-screen grid grid-cols-[300px_350px_1fr] bg-[#181818]">
      <div className="py-[30px]">
        <div className="px-[20px]">
          <div className="flex items-center justify-between">
            <img src={LogoWhite} alt="" className="h-[50px]" />
            <CiSearch size={25} color="#ffffff" />
          </div>
          <button className="mt-[30px] w-full p-[10px] rounded-lg bg-[#ffffff] bg-opacity-5 text-white flex justify-center items-center gap-2">
            <AiOutlinePlus className="inline-block" size={25} />
            <p className="font-bold font-sans" onClick={textHandler}>New Note</p>
          </button>
        </div>
=======
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
>>>>>>> 1a62ccf9566d93fddc4574e90ae02c8781d8c378

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
<<<<<<< HEAD
            <div className="px-[20px] py-[10px] flex gap-2">
              <CgFileDocument size={20} color="#ffffff" opacity={0.6}/>
              <p className="text-white text-opacity-60">Project proposal</p>
            </div>
            <div className="px-[20px] py-[10px] flex gap-2">
              <CgFileDocument size={20} color="#ffffff" opacity={0.6}/>
              <p className="text-white text-opacity-60">Travel itinerary</p>
            </div>
          </div>
        </div>
        <div><Spaces/></div>
      </div>
      <div>Personal</div>
      <div><Reflection/></div>
    </section>
  )
=======

            {/* List of Recent Notes */}
            <RecentNotes />
            {/* Folder category section starts here*/}
            <div className="mt-5">
              {/* <FoldersComponent /> */}
              <NotesFolders />
              <MoreSectionComponent />
            </div>
            {/* Folder category section ends here*/}

            <div className="flex mt-8 justify-start">
              <button
                onClick={() => onLogout()}
                className="py-2 px-8 bg-red-700 hover:bg-red-500 text-white rounded-lg"
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
>>>>>>> 1a62ccf9566d93fddc4574e90ae02c8781d8c378
}

export default Dashboard;
