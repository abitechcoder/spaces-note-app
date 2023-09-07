import React, { frameElement } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { moreList } from "../../util/moreList";
const MoreSectionComponent = () => {
  const moreSectionComponentList = moreList.map((list) => {
    return (
      <li key={list.id} className="text-gray-300/60 mb-[1rem] mt-[-0.5rem] cursor-pointer" >
        <div className="flex gap-[2rem] ml-[1rem] items-center">
          {<list.icon size={20}/>}
          <p>{list.name}</p>
        </div>
      </li>
    );
  });

  return (
    <>
      <h2 className="text-sm ml-[1rem] text-gray-300/60 mt-[1rem]">More</h2>;
      <ul>
      {moreSectionComponentList}
      </ul>
    </>
  );
};

export default MoreSectionComponent;
