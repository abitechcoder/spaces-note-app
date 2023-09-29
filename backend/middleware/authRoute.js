import express from "express";

import {
	googleAuthController,
	refreshUserAccessToken,
	signIn,
	signOut,
} from "./authController.js";
import passport from "passport";
const authRoute = express.Router();

authRoute.route("/signin").post(signIn).get(googleAuthController);
authRoute.route("/signin/refresh-token").post(refreshUserAccessToken);
authRoute.route("/signout").post(signOut);
authRoute.route("/google").get(
	passport.authenticate("google", {
		scope: ["email", "profile"],
	})
);
authRoute.route("/google/callback").get(
	passport.authenticate("google", {
		failureRedirect: "/failed",
	}),
	(req, res) => {
		req = req.user;
		res.redirect("http://localhost:5173/dasboard");
	}
);
// signing out from google authentication end point
authRoute.route("/google/signout").get(() => {});

export default authRoute;
