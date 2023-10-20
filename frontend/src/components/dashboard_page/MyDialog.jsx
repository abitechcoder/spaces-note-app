import { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { DashboardContext } from "../../context/DashboardContextProvider";

export default function MyDialog({ isOpen, setIsOpen }) {
  const { setHandleDel } = useContext(DashboardContext);
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-white/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-start justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-lg bg-[#181818] p-4 grid gap-4">
          <Dialog.Title className="text-white font-bold font-inter">
            Delete Note
          </Dialog.Title>
          <p className="text-white">
            Are you sure you want to delete your note?
          </p>

          <div className="flex gap-4">
            <button
              className="py-2 rounded-md cursor-pointer w-[70px] font-dm bg-[#7F6BFF] text-white"
              onClick={() => setHandleDel(true)}
            >
              Yes
            </button>
            <button
              className="py-2 rounded-md cursor-pointer w-[70px] font-dm bg-red-700 text-white"
              onClick={() => setIsOpen(false)}
            >
              No
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
