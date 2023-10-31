// import Link  from "react-router-dom"
// import { Attributes } from "react";
import PropType from "prop-types";

const FooterComponent = ({ Title, Menu }) => {
  const list = Menu.map((list, index) => {
    return (
      <a key={index} className="text-base" href={list.path} target="_blank">
        {list.name}
      </a>
    );
  });
  return (
    <div className="flex flex-col">
      <h2 className="text-gray-400 text-sm mt-4 lg:mt-0">{Title}</h2>
      {list}
    </div>
  );
};
FooterComponent.PropType = {
  Menu: PropType.any,
  key: PropType.number,
  Title: PropType.string,
};
export default FooterComponent;
