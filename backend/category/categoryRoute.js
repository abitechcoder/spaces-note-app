import express from "express";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategoriesByUserId,
	updateCategory,
} from "./categoryController.js";
import { verifyUserAccessToken } from "../middleware/authController.js";

export const categoryRoute = express.Router();
categoryRoute.use(verifyUserAccessToken);
categoryRoute.route("/").post(createCategory).get(getAllCategories);
categoryRoute.route("/user/:userId").get(getCategoriesByUserId);
categoryRoute
	.route("/:categoryId")
	.get(getCategoriesByUserId)
	.put(updateCategory)
	.delete(deleteCategory);
