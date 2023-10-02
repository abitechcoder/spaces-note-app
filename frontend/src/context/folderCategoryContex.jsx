import { createContext, useContext, useEffect, useReducer } from "react";
import reducer, { Actions, initialState } from "../reducer/reducer.jsx";
const FolderCategoryContext = createContext(initialState.categoryList);

export const FolderCategoryProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { categoryList } = state;
useEffect(() => {
  localStorage.setItem("categoryList",JSON.stringify(categoryList))

}, [categoryList])


	const setFolderCategoryFunction = (payload) => {
		dispatch({
			type: Actions.SET_FOLDER_CATEGORY,
			payload,
		});
	};
	const setNoteCategoryFunction = (payload) => {
		dispatch({
			type: Actions.SET_NOTE_CATEGORY,
			payload,
		});
	};

	const resetCategoryNoteHandler = () => {
		dispatch({
			type: Actions.RESET_NOTE_CATEGORY,
		});
	};
	const setCategoryHandler = (payload) => {
		dispatch({
			type: Actions.SET_CATEGORY,
			payload,
		});
	};
	const setNoteIdHandler = (payload) => {
		dispatch({
			type: Actions.SET_NOTE_ID,
			payload,
		});
	};
	const values = {
		folderCategory: categoryList,
		setFolderCategoryFunction,
		notes: state.notes,
		categorizedNote: state.categorizedNote,
		setNoteCategoryFunction,
		resetCategoryNoteHandler,
		setCategoryHandler,
		category: state.category,
		noteId: state.noteId,
		setNoteIdHandler,
	};

	return (
		<FolderCategoryContext.Provider value={values}>
			{children}
		</FolderCategoryContext.Provider>
	);
};

export const useFolderCategoryContext = () => {
	const folderContext = useContext(FolderCategoryContext);
	if (!folderContext) {
		return null;
	}
	return folderContext;
};
