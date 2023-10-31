import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import {
  NewNoteDialog,
  Main,
  SideMenu,
  DeleteNoteDialog,
  EditNoteDialog,
  MobileMenu
} from "../components/dashboard_page";

import { DashboardContext } from "../context/DashboardContextProvider";

function Dashboard() {
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {isDialogOpen, setIsDialogOpen, isEditDialogOpen, setIsEditDialogOpen} = useContext(DashboardContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
      <>
        <section className="h-screen lg:grid lg:grid-cols-[320px_1fr] bg-[#181818]">
          <MobileMenu/>
          <SideMenu setIsOpen={setIsOpen}/>
          <Main setIsOpen={setIsOpen} />
        </section>
        <NewNoteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        <DeleteNoteDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
        <EditNoteDialog isOpen={isEditDialogOpen} setIsOpen={setIsEditDialogOpen} />
      </>
  );
}

export default Dashboard;
