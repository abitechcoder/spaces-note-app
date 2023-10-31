import React, { useState, useContext, useEffect } from "react";
import {
  NotesList,
  EditNote,
  EmptyNoteState,
  EmptyFolderState,
  TrashedNoteState,
} from "./";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { useSelector } from "react-redux";
import { useUserNotes, useUserCategories } from "../../hooks/dataFetcher";
import { LogoWhite } from "../../assets";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { MobileNavContext } from "../../context/MobileNavContext";
import { AiOutlinePlus } from "react-icons/ai";

function Main({setIsOpen}) {
  const { user } = useSelector((state) => state.auth);
  const { notes } = useUserNotes(user?.userAccount._id);
  const {
    activeFolder,
    activeNote,
    myFavourites,
    showSearchResults,
    setMyNotes,
    showTrashedNotes,
    showArchivedNotes,
  } = useContext(DashboardContext);
  const { categories } = useUserCategories(user?.userAccount._id);
  const { setIsMobileMenuOpen } = useContext(MobileNavContext);
  const [showNoteList, setShowNoteList] = useState(false);

  useEffect(() => {
    setMyNotes(notes);
  }, [notes]);

  useEffect(() => {
    if (
      activeFolder ||
      myFavourites ||
      showSearchResults ||
      showArchivedNotes ||
      showTrashedNotes
    ) {
      setShowNoteList(true);
    } else {
      setShowNoteList(false);
    }
  }, [
    activeFolder,
    myFavourites,
    showSearchResults,
    showArchivedNotes,
    showTrashedNotes,
  ]);

  // useEffect(() => {
  //   alert(`Active Note: ${activeNote}`)
  // }, [activeNote])

  // , user?.userAccount._id, activeFolder?._id, activeNote?._id
  return (
    <main
      className={`h-screen w-full flex flex-col lg:grid ${
        (activeFolder ||
          myFavourites ||
          showSearchResults ||
          showArchivedNotes ||
          showTrashedNotes) &&
        "lg:grid-cols-[350px_1fr]"
      } bg-[#181818]`}
    >
      <nav className="lg:hidden w-full flex items-center justify-between py-4 px-4">
        <img src={LogoWhite} className="w-28 md:w-44" alt="Website Logo" />
        <div className="flex items-center gap-5">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full p-[10px] rounded-lg bg-[#ffffff] bg-opacity-5 text-white flex justify-center items-center gap-2"
          >
            <AiOutlinePlus className="inline-block" size={20} />
            <p className="font-bold font-sans text-sm">New</p>
          </button>
          <RiMenu3Line
            className="text-white cursor-pointer"
            size={30}
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </nav>
      {showNoteList && <NotesList />}
      <div className={`w-full h-full ${(showNoteList && !activeNote) ? "hidden lg:block" : ""}`}>
        {activeFolder ||
        myFavourites ||
        showSearchResults ||
        showArchivedNotes ||
        showTrashedNotes ? (
          activeNote ? (
            showTrashedNotes ? (
              <TrashedNoteState />
            ) : (
              <EditNote categories={categories} />
            )
          ) : (
            <EmptyNoteState />
          )
        ) : activeNote ? (
          <EditNote categories={categories} />
        ) : (
          <EmptyFolderState />
        )}
      </div>
    </main>
  );
}

export default Main;
