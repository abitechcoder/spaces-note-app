// import Link  from "react-router-dom"
// import { Attributes } from "react";

const FooterComponent = ({ Title, Menu, key }) => {
  const list = Menu.map((list) => {
    return (
      <a key={key} className="text-base" href="">
        {list.name}
      </a>
    );
  });
  return (
    <div className="flex flex-col">
      <h2 className="text-gray-400 text-sm">{Title}</h2>
      {list}
    </div>
  );
};

export default FooterComponent;
