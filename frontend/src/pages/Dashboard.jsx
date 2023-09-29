import React, { useContext } from "react";
import LogoWhite from "../assets/LogoWhite.png";
import { CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import {CgFileDocument} from "react-icons/cg"
import Spaces from "../components/Dashboard/Spaces";
import Reflection from "../components/Dashboard/Reflection"
import { TextContext } from '../util/TextContext.jsx'




function Dashboard() {
  const { text, setText}  = useContext(TextContext)
  

const  textHandler = () => {
  setText("true")
}



  return (
    <section className="h-screen grid grid-cols-[300px_350px_1fr] bg-[#181818]">
      <div className="py-[30px]">
        <div className="px-[20px]">
          <div className="flex items-center justify-between">
            <img src={LogoWhite} alt="" className="h-[50px]" />
            <CiSearch size={25} color="#ffffff" />
          </div>
          <button className="mt-[30px] w-full p-[10px] rounded-lg bg-[#ffffff] bg-opacity-5 text-white flex justify-center items-center gap-2">
            <AiOutlinePlus className="inline-block" size={25} />
            <p className="font-bold font-sans" onClick={textHandler}>New Note</p>
          </button>
        </div>

        <div className="pt-[30px] grid gap-4">
          <h5 className="px-[20px] text-[14px] font-semibold font-sans text-white text-opacity-60">Recents</h5>
          <div className="grid gap-2">
            <div className="px-[20px] py-[10px] flex gap-2 bg-[#312EB5]">
              <CgFileDocument size={20} color="#ffffff" opacity={1}/>
              <p className="text-white">Reflection on the Month of June</p>
            </div>
            <div className="px-[20px] py-[10px] flex gap-2">
              <CgFileDocument size={20} color="#ffffff" opacity={0.6}/>
              <p className="text-white text-opacity-60">Project proposal</p>
            </div>
            <div className="px-[20px] py-[10px] flex gap-2">
              <CgFileDocument size={20} color="#ffffff" opacity={0.6}/>
              <p className="text-white text-opacity-60">Travel itinerary</p>
            </div>
          </div>
        </div>
        <div><Spaces/></div>
      </div>
      <div>Personal</div>
      <div><Reflection/></div>
    </section>
  )
}

export default Dashboard;
