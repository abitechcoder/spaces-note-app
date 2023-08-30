import React from "react";
import { Logo } from "../assets";

function Dashboard() {
  return (
    <section className="max-h-screen grid grid-cols-3 bg-[#181818]">
      <div className="">
        <div className="flex items-center">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div></div>
      <div></div>
    </section>
  );
}

export default Dashboard;
