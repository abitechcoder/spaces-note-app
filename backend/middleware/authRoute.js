import express from "express"
import { signIn } from "./authController.js"
const authRoute=express.Router()

authRoute.route("/").post(signIn)


export default authRoute