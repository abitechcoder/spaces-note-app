import { Router }  from "express";
import { createUserAccount, deleteUserAccount, getAllAccount, getUseAccountById } from "./userControler.js";
export const userRouter=Router()
userRouter.route("/").post(createUserAccount).get(getAllAccount)
userRouter.route("/:userId").delete(deleteUserAccount).get(getUseAccountById)

