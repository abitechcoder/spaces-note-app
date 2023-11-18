import React, { useState, useContext, useEffect } from "react";
import { Main, EditProfileSection } from "./";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

function MainSection({ handleIsOpen }) {
  const { user } = useSelector((state) => state.auth);
  const email = user?.userAccount.email;
  const { setCanViewProfile, setCanEditProfile, canEditProfile } = useContext(DashboardContext);

  return (
    <div className="grid grid-rows-[60px_1fr] w-full">
      <header
        onClick={() => setCanViewProfile(true)}
        className="hidden lg:flex justify-end px-8 items-center hover:cursor-pointer shadow shadow-black/60"
      >
        <div className="flex gap-3 items-center group bg-black hover:bg-black/40 px-4 py-2 rounded-md">
          <CgProfile className="w-7 h-7 text-white/60 group-hover:text-white" />
          <p className="text-white text-sm group-hover:font-bold">
            {email?.substring(0, email.indexOf("@"))}
          </p>
        </div>
      </header>
      {canEditProfile ? <EditProfileSection/> : <Main setIsOpen={handleIsOpen} />}
    </div>
  );
}

export default MainSection;
