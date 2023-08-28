import express from "express"
import { registerUser } from "./authController.js"
const authRoute=express.Router()

authRoute.route("/signin").post(registerUser)


export default authRoute