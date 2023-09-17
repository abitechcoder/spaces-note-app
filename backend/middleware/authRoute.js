import express from "express";

import {
	authenticateWithGoogle,
	callback,
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
		// successRedirect:"http://localhost:5173/login",
		failureRedirect: "/failed",
	}),
	(req, res) => {
		// console.log(req);
		res.cookie=("use",req.user)
		res.redirect('http://localhost:5173/login');
	}
);
authRoute.route("/logout").get(() => {});

// authRoute.route("/signin").get(

// 	(req,res)=>{
// 	const user=req.user
// 	console.log(user);
// 	console.log(req.cookies);
// 	res.status(200).json({success:"success",user})

// }
// );

// authRoute.route("/google").get(
// 	passport.authenticate("google", {
// 		scope: ["email", "profile"],
// 	})
// );
// authRoute.route("/google/callback").get(
// 	passport.authenticate("google", {
// 		// successRedirect:"/auth/signin",
// 		// successRedirect:"http://localhost:5173/login",
// 		failureRedirect: "/failed"
// 	}),

// 	(req,res)=>{
// 		res.status(200).json("success")
// 	}
// );

authRoute.route("/signin/refresh-token").post(refreshUserAccessToken);
export default authRoute;
