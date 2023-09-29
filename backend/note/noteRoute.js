import express from 'express'
import { 
    createNote,
    deleteNote,
    getAllNotes,
    getNotesById,
    updateNote,
    updateFavourite
 } from './noteControler.js'

export const noteRoute = express.Router()

noteRoute.route('/').post(createNote).get(getAllNotes)
noteRoute.route('/:id').get(getNotesById).patch(updateNote).delete(deleteNote).put(updateFavourite)
noteRoute.route('/favourite/:noteId').patch(updateFavourite)
