import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import {
  NewNoteDialog,
  Main,
  SideMenu,
  MyDialog,
} from "../components/dashboard_page";

import { DashboardContext } from "../context/DashboardContextProvider";

function Dashboard() {
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {isDialogOpen, setIsDialogOpen} = useContext(DashboardContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
      <>
        <section className="h-screen grid grid-cols-[320px_1fr] bg-[#181818]">
          <SideMenu setIsOpen={setIsOpen}/>
          <Main />
        </section>
        <NewNoteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        <MyDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
      </>
  );
}

export default Dashboard;
