import { createContext, useContext, useState } from "react";
import { categoryList } from "../util/folderCategoryList.js";

const initialSate = categoryList;
const FolderCategoryContext = createContext(initialSate);

export const FolderCategoryProvider = ({ children }) => {
	const [folderCategory, setFolderCategory] = useState(categoryList);

    const setFolderCategoryFunction=(category)=>
    setFolderCategory([...folderCategory,category])
	const values = {
		folderCategory,
		setFolderCategoryFunction,
	};
	return (
		<FolderCategoryContext.Provider value={values}>
			{children}
		</FolderCategoryContext.Provider>
	);
};

export const useFolderCategoryContext=()=>{
    const folderContext=useContext(FolderCategoryContext)
    if(!folderContext){
        return null
    }
    return folderContext
}