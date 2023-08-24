import { Router }  from "express";
import { createUserAccount, getAllAccount } from "./userControler.js";
export const userRouter=Router()
userRouter.route("/").post(createUserAccount).get(getAllAccount)

