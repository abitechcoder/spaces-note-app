import express from 'express'
import { 
    createCategory,
    // deleteCategory,
    getAllCategories,
    // getNotesById,
    // updateNote
 } from './categoryController.js'

export const categoryRoute = express.Router()

categoryRoute.route('/').post(createCategory).get(getAllCategories)
// noteRoute.route('/:id').get(getNotesById).patch(updateNote).delete(deleteNote)