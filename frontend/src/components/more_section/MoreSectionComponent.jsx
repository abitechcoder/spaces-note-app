import React, { useContext, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { moreList } from "../../util/moreList";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { MobileNavContext } from "../../context/MobileNavContext";

const MoreSectionComponent = ({handleMenuOpen}) => {
  const { setActiveFolder, setActiveNote, setMyFavourites, setShowSearchResults, setShowTrashedNotes, setShowArchivedNotes } =
    useContext(DashboardContext);
    const [activeItem, setActiveItem] = useState(null);
    const { setIsMobileMenuOpen } =
    useContext(MobileNavContext);

  const handleClick = (id) => {
    switch (id) {
      case "1":
        setActiveFolder(null);
        setActiveNote(null);
        setMyFavourites(true);
        setShowArchivedNotes(false);
        setShowTrashedNotes(false);
        setShowSearchResults(false);
        setActiveItem(id);
        setIsMobileMenuOpen(false)
        break;
      case "2":
        setActiveFolder(null);
        setActiveNote(null);
        setMyFavourites(null);
        setShowArchivedNotes(false);
        setShowTrashedNotes(true);
        setActiveItem(id);
        setShowSearchResults(false);
        setIsMobileMenuOpen(false)
        break;
      case "3":
        setActiveFolder(null);
        setActiveNote(null);
        setMyFavourites(null);
        setShowArchivedNotes(true);
        setShowTrashedNotes(false);
        setActiveItem(id);
        setShowSearchResults(false);
        setIsMobileMenuOpen(false)
    }
  };

  const moreSectionComponentList = moreList.map((list) => {
    return (
      <li
        key={list.id}
        className={`hover:text-[#312EB5] mb-[1rem] mt-[-0.5rem] cursor-pointer ${activeItem === list.id ? "text-[#4d4bca]" : "text-gray-300/60"}`}
        onClick={() => handleClick(list.id)}
      >
        <div className="flex gap-[2rem] items-center">
          {<list.icon size={20} />}
          <p>{list.name}</p>
        </div>
      </li>
    );
  });

  return (
    <div className="px-[20px]">
      <h2 className="text-sm font-bold text-gray-300/60 mt-[1rem]">More</h2>;
      <ul>{moreSectionComponentList}</ul>
    </div>
  );
};

export default MoreSectionComponent;
