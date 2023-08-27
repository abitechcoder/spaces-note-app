import { Router }  from "express";
import { createUserAccount, deleteUserAccountById, getAllAccount, getUseAccountById } from "./userControler.js";
export const userRouter=Router()
userRouter.route("/").post(createUserAccount).get(getAllAccount)
userRouter.route("/:userId").delete(deleteUserAccountById).get(getUseAccountById)

