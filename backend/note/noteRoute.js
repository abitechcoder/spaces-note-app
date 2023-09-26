import express from 'express'
import { 
    createNote,
    deleteNote,
    getAllNotes,
    getNotesById,
    updateNote,
    getNotesByUserId
 } from './noteControler.js'
import { verifyUserAccessToken } from '../middleware/authController.js'

export const noteRoute = express.Router()
noteRoute.use(verifyUserAccessToken)
noteRoute.route('/').post(createNote).get(getAllNotes)
noteRoute.route('/:id').get(getNotesById).patch(updateNote).delete(deleteNote)
noteRoute.route("/user/:userId").get(getNotesByUserId)