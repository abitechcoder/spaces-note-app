import express from 'express'
import { 
    createNote,
    deleteNote,
    getAllNotes,
    getNotesById,
    updateNote,
<<<<<<< HEAD
    updateFavourite
=======
    getNotesByUserId
>>>>>>> 1a62ccf9566d93fddc4574e90ae02c8781d8c378
 } from './noteControler.js'
 import { verifyUserAccessToken } from "../middleware/authController.js";
export const noteRoute = express.Router();
noteRoute.use(verifyUserAccessToken);
noteRoute.route("/").post(createNote).get(getAllNotes);
<<<<<<< HEAD
noteRoute.route('/:id').get(getNotesById).patch(updateNote).delete(deleteNote).put(updateFavourite)
noteRoute.route('/favourite/:noteId').patch(updateFavourite)
=======
noteRoute.route("/:id").get(getNotesById).patch(updateNote).delete(deleteNote);
noteRoute.route("/user/:userId").get(getNotesByUserId);

>>>>>>> 1a62ccf9566d93fddc4574e90ae02c8781d8c378
