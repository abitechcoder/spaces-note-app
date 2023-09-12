import React from "react";
import RecentNotesList from "./RecentNotesList";

function RecentNotes() {
  return (
    <div className="pt-[30px] grid gap-4">
      <h5 className="px-[20px] text-[14px] font-semibold font-sans text-white text-opacity-60">
        Recents
      </h5>
      <div className="grid gap-2">
        <RecentNotesList />
      </div>
    </div>
  );
}

export default RecentNotes;
