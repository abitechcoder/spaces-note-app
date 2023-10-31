import { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { DashboardContext } from "../../context/DashboardContextProvider";

export default function EditNoteDialog({ isOpen, setIsOpen }) {
  const { setIsReadOnly, setIsEditDialogOpen } = useContext(DashboardContext);

  const handleEdit = () => {
    setIsReadOnly(false)
    setIsEditDialogOpen(false)
  }
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsEditDialogOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-white/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-start justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-lg bg-[#181818] p-4 grid gap-4">
          <Dialog.Title className="text-white font-bold font-inter">
            Edit Note
          </Dialog.Title>
          <p className="text-white">Are you sure you want to Edit this note?</p>

          <div className="flex gap-4">
            <button
              className="py-2 rounded-md cursor-pointer w-[70px] font-dm bg-[#7F6BFF] text-white"
              onClick={handleEdit}
            >
              Yes
            </button>
            <button
              className="py-2 rounded-md cursor-pointer w-[70px] font-dm bg-red-700 text-white"
              onClick={() => setIsEditDialogOpen(false)}
            >
              No
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
