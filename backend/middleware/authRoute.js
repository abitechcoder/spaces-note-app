import express from "express"
import { refreshUserAccessToken, registerUser } from "./authController.js"
const authRoute=express.Router()

authRoute.route("/signin").post(registerUser)
authRoute.route("/signin/refresh-token").post(refreshUserAccessToken)


export default authRoute