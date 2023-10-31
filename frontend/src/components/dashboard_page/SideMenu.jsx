import React, { useState } from "react";
import { LogoWhite } from "../../assets";
import { AiOutlinePlus } from "react-icons/ai";
import {CiLogout} from "react-icons/ci"
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
    <div className="py-[20px] hidden lg:flex flex-col justify-between">
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

      <div className="md:h-[300px] lg:h-[400px] overflow-y-auto">
        {/* List of Recent Notes */}
        <RecentNotes />
        {/* Folder category section starts here*/}
        <div className="mt-5">
          {/* <FoldersComponent /> */}
          <NotesFolders />
          <MoreSectionComponent />
        </div>
        {/* Folder category section ends here*/}
      </div>

      <div className="flex justify-start">
        <div onClick={() => onLogout()}
          className="py-[20px] px-6 flex items-center gap-4 cursor-pointer group">
            <CiLogout className="text-white w-6 h-6 group-hover:text-red-700" />
            <p className="text-white font-bold group-hover:text-red-700">Logout</p>
          </div>
      </div>
    </div>
  );
}

export default SideMenu;
