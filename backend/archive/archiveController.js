import { APIErrors } from "../middleware/errorHandlers.js";
import { createNoteService, deleteNoteService } from "../note/noteService.js";
import {
	addToArchiveService,
	deleteArchiveNoteByIdService,
	getAllArchiveNotesService,
    getArchiveNoteByIdService,
} from "./archiveService.js";

export const addToArchive = async (req, res, next) => {
	try {
		const { noteId} = req.params;
		if (!noteId) {
			return next(APIErrors.notFound("No note selected!"));
		}
		const deletedNote = await deleteNoteService(noteId);
		const archivedNote = await addToArchiveService(deletedNote);
		res.status(200).json({
			success: true,
			message: "note archived successfully",
			archivedNote,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteArchiveNote = async (req, res, next) => {
	try {
    const {noteId} = req.params;
		if (!noteId) {
			return next(APIErrors.notFound("no note is selected!"));
		}
		const archivedNote = await getArchiveNoteByIdService(noteId);
		if (!archivedNote) {
			return next(APIErrors.notFound("no note found"));
		}
		const deletedArchivedNote = await deleteArchiveNoteByIdService(noteId);
		res.status(200).json({
			success: true,
			message: "archived Note deleted successfully",
			deletedArchivedNote,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllArchivedNote = async (req, res, next) => {
	try {
		const archivedNotes = await getAllArchiveNotesService();
		res.status(200).json({ success: true, archivedNotes });
	} catch (error) {
		next(error);
	}
};

export const restoreNote=async(req,res,next)=>{
    try {
        const {noteId}=req.params
        const data= await getArchiveNoteByIdService(noteId)
        if(!data){
            return next(APIErrors.notFound("no note found!"))
        }
        const restoredNote = await createNoteService(data)
        await deleteArchiveNoteByIdService(noteId)
        res.status(200).json({
            success:true,
            message:"note restored successfully",
            restoredNote
        })
    } catch (error) {
       next(error) 
    }
}