import { Router }  from "express";
import { changeUserPassword, createUserAccount, createUserProfile, deleteUserAccountById, getAllAccount, getUserProfileExtendedByUserId, getUseAccountById, updateUserProfileByUserId, getAllUserProfileExtended, deleteUserProfileByUserId } from "./userController.js";
export const userRouter=Router()
userRouter.route("/").post(createUserAccount).get(getAllAccount)
userRouter.route("/profile").get(getAllUserProfileExtended)
userRouter.route("/profile/:userId")
.get(getUserProfileExtendedByUserId)
.put(updateUserProfileByUserId)
.delete(deleteUserProfileByUserId)
userRouter.route("/change-password").post(changeUserPassword)
userRouter.route("/:userId").delete(deleteUserAccountById).get(getUseAccountById)

