import express from "express";
import {
	refreshUserAccessToken,
	signIn,
} from "./authController.js";
const authRoute = express.Router();

authRoute.route("/signin").post(signIn);
authRoute
	.route("/signin/refresh-token")
	.post(refreshUserAccessToken);
export default authRoute;
