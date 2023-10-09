import React, { useContext, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { moreList } from "../../util/moreList";
import { DashboardContext } from "../../context/DashboardContextProvider";

const MoreSectionComponent = () => {
  const { setActiveFolder, setActiveNote, setMyFavourites, setShowSearchResults } =
    useContext(DashboardContext);
    const [activeItem, setActiveItem] = useState(null);

  const handleClick = (id) => {
    switch (id) {
      case "1":
        setActiveFolder(null);
        setActiveNote(null);
        setMyFavourites(true);
        setShowSearchResults(false);
        setActiveItem(id);
        break;
      case "2":
        alert("Trash selected");
        setActiveFolder(null);
        setActiveNote(null);
        setMyFavourites(null);
        setActiveItem(id);
        setShowSearchResults(false);
        break;
      case "3":
        alert("Archived Notes selected");
        setActiveFolder(null);
        setActiveNote(null);
        setMyFavourites(null);
        setActiveItem(id);
        setShowSearchResults(false);
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
