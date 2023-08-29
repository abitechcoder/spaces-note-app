import { Router }  from "express";
import { changeUserPassword, createUserAccount, createUserProfile, deleteUserAccountById, getAllAccount, getUerProfile, getUseAccountById } from "./userController.js";
export const userRouter=Router()
userRouter.route("/").post(createUserAccount).get(getAllAccount)
userRouter.route("/profile").post(createUserProfile)
userRouter.route("/profile/:userId").get(getUerProfile)
userRouter.route("/change-password").post(changeUserPassword)
userRouter.route("/:userId").delete(deleteUserAccountById).get(getUseAccountById)

