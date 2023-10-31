import React from "react";
import { file } from "./img";
import { BsFolder } from "react-icons/bs";

function EmptyFolderState() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="w-[80%] lg:w-[460px] grid gap-3 place-items-center">
        <BsFolder className="w-10 h-10 lg:w-20 lg:h-20 text-white/50" />
        <h1 className="text-white font-bold text-md lg:text-xl">
          Select a folder to view
        </h1>
        <p className="text-center text-white/60">
          Choose a folder from the folders section on the left to view your
          saved notes, or create a new folder where you can save your new note.
        </p>
      </div>
    </div>
  );
}

export default EmptyFolderState;
