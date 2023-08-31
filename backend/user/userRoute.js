import { Router }  from "express";
import { changeUserPassword, createUserAccount,deleteUserAccountById, getAllAccount, getUserProfileExtendedByUserId, getUseAccountById, updateUserProfileByUserId, getAllUserProfileExtended} from "./userController.js";
import { verifyUserAccessToken } from "../middleware/authController.js";
export const userRouter=Router()
userRouter.route("/").post(createUserAccount).get(verifyUserAccessToken,getAllAccount)
userRouter.route("/profile").get(verifyUserAccessToken,getAllUserProfileExtended)
userRouter.route("/profile/:userId")
.get(verifyUserAccessToken,getUserProfileExtendedByUserId)
.put(verifyUserAccessToken,updateUserProfileByUserId)
userRouter.route("/change-password/:userId").put(verifyUserAccessToken,changeUserPassword)
userRouter.route("/:userId").delete(verifyUserAccessToken,deleteUserAccountById).get(verifyUserAccessToken,getUseAccountById)

