import express from 'express'
import { 
    createNote,
    deleteNote,
    getAllNotes,
    getNotesById,
    updateNote,
    updateFavourite,
    getNotesByUserId,
    saveToTrash
 } from './noteControler.js'
 import { verifyUserAccessToken } from "../middleware/authController.js";
 
export const noteRoute = express.Router();

noteRoute.use(verifyUserAccessToken);
noteRoute.route("/").post(createNote).get(getAllNotes);
noteRoute.route("/:id").get(getNotesById).patch(updateNote).delete(deleteNote);
noteRoute.route("/user/:userId").get(getNotesByUserId);
noteRoute.route('/favourite/:noteId').patch(updateFavourite);
noteRoute.route('/trash/:noteId').patch(saveToTrash);
