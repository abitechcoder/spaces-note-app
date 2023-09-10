import { createContext, useState } from "react";

 

export const TextContext = createContext("")

 const TextContextProvider = (props) => {
    
    const [text, setText] = useState(false)
   
        return (
        <TextContext.Provider value={{text, setText}}>
            {props.children}
        </TextContext.Provider>
    )
}



export default TextContextProvider