import express from 'express'
import { 
    createCategory,
    // deleteCategory,
    getAllCategories,
    getCategoriesByUserId,
    // getNotesById,
    // updateNote
 } from './categoryController.js'
import { verifyUserAccessToken } from '../middleware/authController.js'

export const categoryRoute = express.Router()
categoryRoute.use(verifyUserAccessToken)
categoryRoute.route('/').post(createCategory).get(getAllCategories)
categoryRoute.route("/user/:userId").get(getCategoriesByUserId)
// noteRoute.route('/:id').get(getNotesById).patch(updateNote).delete(deleteNote)