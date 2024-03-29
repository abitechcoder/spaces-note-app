import { Router } from "express";
import {
	changeUserPassword,
	createUserAccount,
	deleteUserAccountById,
	getAllAccount,
	getUserProfileExtendedByUserId,
	getUseAccountById,
	updateUserProfileByUserId,
	getAllUserProfileExtended,
	uploadUserProfileImage,
	getUserProfileImage,
} from "./userController.js";
import { verifyUserAccessToken } from "../middleware/authController.js";
import { upload } from "../util/imageUploadHandler.js";
export const userRouter = Router();
userRouter
	.route("/")
	.post(createUserAccount)
	.get(verifyUserAccessToken, getAllAccount);
userRouter
	.route("/uploadimage/:userId")
	.put(verifyUserAccessToken,upload.single("upload"), uploadUserProfileImage)
	.get(verifyUserAccessToken,getUserProfileImage);
userRouter
	.route("/profile")
	.get(verifyUserAccessToken, getAllUserProfileExtended);
userRouter
	.route("/profile/:userId")
	.get(verifyUserAccessToken, getUserProfileExtendedByUserId)
	.put(verifyUserAccessToken, updateUserProfileByUserId);
userRouter
	.route("/change-password/:userId")
	.put(verifyUserAccessToken, changeUserPassword);
userRouter
	.route("/:userId")
	.delete(verifyUserAccessToken, deleteUserAccountById)
	.get(verifyUserAccessToken, getUseAccountById);
