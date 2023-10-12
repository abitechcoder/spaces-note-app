import React, { useState } from "react";
import { LogoWhite } from "../../assets";
import { AiOutlinePlus } from "react-icons/ai";
import MoreSectionComponent from "../more_section/MoreSectionComponent";
import { RecentNotes, NotesFolders, SearchIcon, SearchInput } from "./";
import { logout, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

function SideMenu({ setIsOpen }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div className="py-[30px] overflow-y-scroll">
      <div className="w-[300px] px-[20px] bg-[#181818]">
        <div className="flex items-center justify-between">
          <img src={LogoWhite} alt="" className="h-[50px]" />
          <SearchIcon
            showSearchInput={showSearchInput}
            setShowSearchInput={setShowSearchInput}
          />
        </div>
        {showSearchInput && <SearchInput />}
        <button
          onClick={() => setIsOpen(true)}
          className="mt-[20px] w-full p-[10px] rounded-lg bg-[#ffffff] bg-opacity-5 text-white flex justify-center items-center gap-2"
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

      <div className="flex mt-8 justify-start">
        <button
          onClick={() => onLogout()}
          className="py-2 px-8 bg-red-700 hover:bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideMenu;
