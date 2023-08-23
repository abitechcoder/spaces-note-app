import { Router }  from "express";
import { createUserAccountController } from "./userControler.js";
export const userRouter=Router()
userRouter.route("/").post(createUserAccountController)

