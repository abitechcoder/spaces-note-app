import { NoteModel } from "../note/noteModel.js";
import { categoryModel } from "./categoryModel.js";
import {
  createCategoryService,
  deleteCategoryByIdService,
  getAllCategoriesService,
  getCategoriesByUserIdService,
  getCategoryByIdService,
  updateCategoryByIdService,
} from "./categoryService.js";

export const createCategory = async (req, res) => {
  try {
    const { title, userId } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Category title is required" });
    }
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }
    const newCategory = await createCategoryService(req.body);
    res.status(200).json({
      message: "category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await getAllCategoriesService();
    res.status(200).json({
      messgae: "All categories fetched successfully",
      categories: allCategories,
    });
  } catch (error) {
    res.status(500).json({ Error: "internal server error!" });
  }
};

export const getCategoriesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }
    const categories = await getCategoriesByUserIdService(userId);
    res.status(200).json({
      message: "User Categories fetched successfully",
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { title } = req.body;
    if (!categoryId) {
      return res
        .status(401)
        .json({ success: false, message: "no category found" });
    }
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "title field is required" });
    }
    const updatedCategory = await updateCategoryByIdService(categoryId, title);
    res.status(200).json({
      success: true,
      message: "category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "internal server error" });
  }
};
// deleting note category 
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
// getting all note category using category id
    const category = await getCategoryByIdService(categoryId);
    // Preventing default folder (No category folder) deletion
    if (category.title === "No category") {
      // deleting all note associated with the No category folder
      await NoteModel.deleteMany({ categoryId: categoryId });
      return res.status(200).json({
        success: true,
        message: "Documents deleted but No category folder cannot be deleted",
      });
    } 
    // deleting category with all related notes
    else {
      await deleteCategoryByIdService(categoryId);
      await NoteModel.deleteMany({ categoryId: categoryId });
      res.status(200).json({
        success: true,
        message: "Folders and document deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
