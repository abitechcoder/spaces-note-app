import express from "express";
import {
	googleAuthController,
	refreshUserAccessToken,
	signIn,
} from "./authController.js";
import passport from "passport";
const authRoute = express.Router();

authRoute.route("/signin").post(signIn).get(googleAuthController);
authRoute.route("/google").get(
	passport.authenticate("google", {
		scope: ["email", "profile"],
	})
);

authRoute.route("/google/callback").get(
	passport.authenticate("google", {
		failureRedirect: "/failed",
	}),
	async (req, res,next) => {
		req=req.user._json
		try {
			next()
			// res.status(200).json({data:req})
			res.redirect("/auth/signin");
			// res.redirect("http://localhost:5173/login");
		} catch (error) {
			res.send(error);
		}
	}
);
authRoute.route("/signin/refresh-token").post(refreshUserAccessToken);
export default authRoute;
