import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import {
  NewNoteDialog,
  Main,
  SideMenu
} from "../components/dashboard_page";
import {
  DashboardContextProvider
} from "../context/DashboardContextProvider";

function Dashboard() {
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <DashboardContextProvider>
      <>
        <section className="h-screen grid grid-cols-[320px_1fr] bg-[#181818]">
          <SideMenu setIsOpen={setIsOpen}/>
          <Main />
        </section>
        <NewNoteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    </DashboardContextProvider>
  );
}

export default Dashboard;
