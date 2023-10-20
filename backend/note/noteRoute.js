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

// noteRoute.use(verifyUserAccessToken);
noteRoute.route("/test").get(getAllNotes)
noteRoute.route("/test/user/:userId").get(getNotesByUserId);
noteRoute.route("/test/:id").get(getNotesById)
noteRoute.route("/").post(verifyUserAccessToken,createNote).get(verifyUserAccessToken,getAllNotes);
noteRoute.route("/user/:userId").get(verifyUserAccessToken,getNotesByUserId);
noteRoute.route("/:id").get(verifyUserAccessToken,getNotesById).patch(verifyUserAccessToken,updateNote).delete(verifyUserAccessToken,deleteNote);
noteRoute.route('/favourite/:noteId').patch(verifyUserAccessToken,updateFavourite);
noteRoute.route('/trash/:noteId').patch(verifyUserAccessToken,saveToTrash);
