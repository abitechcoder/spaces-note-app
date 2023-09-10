import { categoryList } from "../util/folderCategoryList";
import { notes } from "../util/note";

export const Actions = {
	SET_FOLDER_CATEGORY: "setFolderCategory",
    SET_NOTE_CATEGORY:"setNoteCategory",
    RESET_NOTE_CATEGORY:"resetNoteCategory",
    SET_CATEGORY:"setCategory",
    SET_NOTE_ID:"setNoteId"
};

export const initialState = {
	categoryList,
    notes,
    categorizedNote:JSON.parse(localStorage.getItem("filteredNote")) ,
    category:JSON.parse(localStorage.getItem("category")),
    noteId:""
};
const reducer = (state, action) => {
	switch (action.type) {
		case Actions.SET_FOLDER_CATEGORY:
			return { ...state,categoryList:[...state.categoryList, action.payload]};
            case Actions.SET_NOTE_CATEGORY:
                return {...state,categorizedNote:[...state.categorizedNote,action.payload]};
            case Actions.RESET_NOTE_CATEGORY:
                return {...state,categorizedNote:[]}
            case Actions.SET_CATEGORY:
                return{...state,category:state.category=action.payload}
            case Actions.SET_NOTE_ID:
                return {...state,noteId:state.noteId=action.payload}
		default:
			return state;
	}
};

export default reducer;
