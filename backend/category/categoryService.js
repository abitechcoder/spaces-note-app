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

export const deleteCategoryByIdService=async(categoryId)=>{
    return await categoryModel.findByIdAndDelete(categoryId)
}

export const updateCategoryByIdService=async(categoryId,title)=>{
    return await categoryModel.findByIdAndUpdate(categoryId,{title},{new:true})
}
