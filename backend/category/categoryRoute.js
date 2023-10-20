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
// categoryRoute.use(verifyUserAccessToken);
categoryRoute.route("/test").get(getAllCategories);
categoryRoute.route("/test/user/:userId").get(getCategoriesByUserId);
categoryRoute.route("/").post(verifyUserAccessToken,createCategory).get(verifyUserAccessToken,getAllCategories);
categoryRoute.route("/user/:userId").get(verifyUserAccessToken,getCategoriesByUserId);
categoryRoute
	.route("/:categoryId")
	.get(getCategoriesByUserId)
	.put(updateCategory)
	.delete(deleteCategory);
