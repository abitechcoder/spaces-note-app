import React, {useContext} from "react";
import { CiSearch } from "react-icons/ci";
import { DashboardContext } from "../../context/DashboardContextProvider";

function SearchIcon({ showSearchInput, setShowSearchInput }) {
    const {setShowSearchResults, setActiveFolder, setMyFavourites} = useContext(DashboardContext);
  const handleShowSearch = () => {
    setShowSearchInput(!showSearchInput);
    setShowSearchResults(true)
    setActiveFolder(null);
    setMyFavourites(null);
  };
  return (
    <CiSearch
      size={25}
      color="#ffffff"
      onClick={handleShowSearch}
      className="cursor-pointer"
    />
  );
}

export default SearchIcon;
