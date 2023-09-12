import { categoryModel } from "./categoryModel.js";


export const createCategoryService = async(data) => {
    const newCategory = new categoryModel({
        title: data.title,
    })
    newCategory.save()
    return newCategory
}

export const getAllCategoriesService = async() => {
    const allCategories = await categoryModel.find()
    return allCategories
} 
// export const getNotesByIdService = async(id) => {
//   const account = await NoteModel.findById(id)
//   return account
// }

// export const updateNoteService = async (id, data) => {
//     const updatedNote = await NoteModel.findByIdAndUpdate(id, {
//         title: data.title,
//         description: data.description
//     }, {new: true})
//     return updatedNote
// }

// export const deleteNoteService = async (req, res) => {
//    const deleteNote = await NoteModel.findByIdAndDelete(id)
//    return deleteNote
// }