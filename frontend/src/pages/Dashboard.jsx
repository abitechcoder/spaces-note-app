import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import {
  NewNoteDialog,
  SideMenu,
  DeleteNoteDialog,
  EditNoteDialog,
  MobileMenu,
  ViewProfileDialog,
  MainSection,
} from "../components/dashboard_page";

import { DashboardContext } from "../context/DashboardContextProvider";

function Dashboard() {
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {
    isDialogOpen,
    setIsDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    canViewProfile,
    setCanViewProfile,
  } = useContext(DashboardContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="h-screen lg:grid lg:grid-cols-[320px_1fr] bg-[#181818]">
        <MobileMenu />
        <SideMenu setIsOpen={setIsOpen} />
        <MainSection handleIsOpen={setIsOpen} />
      </section>
      <NewNoteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <DeleteNoteDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
      <EditNoteDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
      />
      <ViewProfileDialog
        isOpen={canViewProfile}
        setIsOpen={setCanViewProfile}
      />
    </>
  );
}

export default Dashboard;
