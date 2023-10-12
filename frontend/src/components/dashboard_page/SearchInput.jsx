import React, {useContext} from "react";
import { DashboardContext } from "../../context/DashboardContextProvider";

function SearchInput() {
    const {setSearchInput} = useContext(DashboardContext);

  return (
    <input
      type="text"
      placeholder="Search here..."
      onChange={(e) => setSearchInput(e.target.value)}
      className="p-2 mt-[20px] rounded-md w-[100%] bg-[#ffffff] bg-opacity-5 text-white"
    />
  );
}

export default SearchInput;
