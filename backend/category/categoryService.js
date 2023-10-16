import { categoryModel } from "./categoryModel.js";
import { NoteModel } from "../note/noteModel.js";

export const createCategoryService = async (data) => {
	const newCategory = new categoryModel({
		title: data.title,
		userId: data.userId,
	});
	newCategory.save();
	return newCategory;
};

export const getAllCategoriesService = async () => {
	const allCategories = await categoryModel.find();
	return allCategories;
};

export const getCategoriesByUserIdService = async (userId) => {
	const userCategories = await categoryModel.find({ userId: userId });
	return userCategories;
};

export const deleteCategoryByIdService = async (categoryId) => {
	await categoryModel.findByIdAndDelete(categoryId);
	await NoteModel.deleteMany({ categoryId: categoryId });
	return {
		success: true,
		message: "Folders and document deleted successfully",
	};
};

export const updateCategoryByIdService = async (categoryId, title) => {
	return await categoryModel.findByIdAndUpdate(
		categoryId,
		{ title },
		{ new: true }
	);
};

// deleting all category by userId Service
export const deleteAllCategoryByUserIdService = async (userId) => {
	return await categoryModel.deleteMany({ userId });
};
