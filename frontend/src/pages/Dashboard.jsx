import React, { useContext } from "react";
import Reflection from "../components/Dashboard/Reflection";
import { LogoWhite } from "../assets";
import { CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { FoldersComponent } from "../components/folder_category";
import MoreSectionComponent from "../components/more_section/MoreSectionComponent";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router";
import { RecentNotes } from "../components/Dashboard";
import { useFolderCategoryContext } from "../context/folderCategoryContex";
import NoteCategoryComponent from "../components/folder_category/NoteCategoryComponent";
import { TextContext } from "../util/TextContext.jsx";

function Dashboard() {
  const { noteId } = useFolderCategoryContext();
  console.log("Note Id: ", noteId);
  const { text, setText } = useContext(TextContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <section className="h-screen grid grid-cols-[300px_350px_1fr] bg-[#181818]">
      <div className="py-[30px] overflow-y-scroll">
        <div className="w-[280px] px-[20px] bg-[#181818]">
          <div className="flex items-center justify-between">
            <img src={LogoWhite} alt="" className="h-[50px]" />
            <CiSearch size={25} color="#ffffff" />
          </div>
          <button className="mt-[30px] w-full p-[10px] rounded-lg bg-[#ffffff] bg-opacity-5 text-white flex justify-center items-center gap-2">
            <AiOutlinePlus className="inline-block" size={25} />
            <p className="font-bold font-sans" onClick={textHandler}>
              New Note
            </p>
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

        <div>
          <button
            onClick={() => onLogout()}
            className="py-[15px] bg-red-700 text-white w-[80%] mx-auto rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-[#1c1c1c]">{/* <NoteCategoryComponent /> */}</div>
      <div>{/* <Reflection /> */}</div>
    </section>
  );
}

export default Dashboard;
