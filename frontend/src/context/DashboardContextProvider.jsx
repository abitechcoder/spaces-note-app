import { createContext, useState } from "react";

export const DashboardContext = createContext(null);


export const DashboardContextProvider = ({children}) => {
    const [activeFolder, setActiveFolder] = useState(null);
    const [activeNote, setActiveNote] = useState(null);
    const [myNotes, setMyNotes] = useState(null);
    const [myFavourites, setMyFavourites] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

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
        setShowSearchResults
    }
  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  )
}
