import { categoryModel } from "./categoryModel.js";


export const createCategoryService = async(data) => {
    const newCategory = new categoryModel({
        title: data.title,
        userId: data.userId
    })
    newCategory.save()
    return newCategory
}

export const getAllCategoriesService = async() => {
    const allCategories = await categoryModel.find()
    return allCategories
} 

export const getCategoriesByUserIdService = async(userId) => {
  const userCategories = await categoryModel.find({userId: userId})
  return userCategories
}

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