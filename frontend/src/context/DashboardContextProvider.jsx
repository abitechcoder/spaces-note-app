import { createContext, useState } from "react";

export const DashboardContext = createContext(null);


export const DashboardContextProvider = ({children}) => {
    const [activeFolder, setActiveFolder] = useState(null);
    const [activeNote, setActiveNote] = useState(null);
    const [myNotes, setMyNotes] = useState(null);
    const [myFavourites, setMyFavourites] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [showTrashedNotes, setShowTrashedNotes] = useState(false);
    const [showArchivedNotes, setShowArchivedNotes] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [handleDel, setHandleDel] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);

    const value = {
        activeFolder,
        setActiveFolder,
        activeNote,
        setActiveNote,
        myNotes,
        setMyNotes,
        myFavourites,
        setMyFavourites,
        showSearchResults,
        setShowSearchResults,
        showTrashedNotes,
        setShowTrashedNotes,
        showArchivedNotes,
        setShowArchivedNotes,
        searchInput,
        setSearchInput,
        isDialogOpen,
        setIsDialogOpen,
        handleDel,
        setHandleDel,
        isEditDialogOpen,
        setIsEditDialogOpen,
        isReadOnly,
        setIsReadOnly
    }
  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  )
}
