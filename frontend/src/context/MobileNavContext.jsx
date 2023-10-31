import { createContext, useState } from "react";

export const MobileNavContext = createContext(null);

export const MobileNavContextProvider = ({children}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const value = {
        isMobileMenuOpen,
        setIsMobileMenuOpen
    }
 return (
    <MobileNavContext.Provider value={value}>
        {children}
    </MobileNavContext.Provider>
 )
}