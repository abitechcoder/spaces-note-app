import React, { useContext } from "react";
import { RiCloseLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { MobileNavContext } from "../../context/MobileNavContext";
import MoreSectionComponent from "../more_section/MoreSectionComponent";
import { RecentNotes, NotesFolders, SearchIcon, SearchInput } from "./";
import { logout, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

function MobileMenu() {
  const { setIsMobileMenuOpen, isMobileMenuOpen } =
    useContext(MobileNavContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div
      className={`lg:hidden flex flex-col gap-4 justify-between fixed bg-[#181818] top-0 left-0 z-20 h-screen p-4 w-full ease-in-out duration-300 ${
        isMobileMenuOpen ? " translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-white">MobileMenu</h1>
        <RiCloseLine
          className="cursor-pointer h-10 w-10 text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </div>

      <div className="w-full h-full overflow-y-auto">
        <RecentNotes/>
        <div className="my-4">
          <NotesFolders />
        </div>
        <MoreSectionComponent />
      </div>

      <div
        onClick={() => onLogout()}
        className="py-[20px] flex items-center gap-4 cursor-pointer group"
      >
        <CiLogout className="text-white w-6 h-6 group-hover:text-red-700" />
        <p className="text-white font-bold group-hover:text-red-700">Logout</p>
      </div>
    </div>
  );
}

export default MobileMenu;
