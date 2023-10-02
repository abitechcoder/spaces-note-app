import express from "express";

import {
  googleAuthController,
  refreshUserAccessToken,
  signIn,
  signOut,
} from "./authController.js";
// import passport from "passport";
const authRoute = express.Router();

authRoute.route("/signin").post(signIn)
authRoute.route("/signin/refresh-token").post(refreshUserAccessToken);
authRoute.route("/signout").post(signOut);
authRoute.route("/google/signin").post(googleAuthController);
// authRoute.route("/google/callback").get(
//   passport.authenticate("google", {
//     failureRedirect: "/failed",
//   }),
//   async (req, res) => {
// 	console.log(req.user);
// 	req.session.user=req.user
//   res.redirect("http://localhost:5173/login");
//   }
// );
// signing out from google authentication end point
authRoute.route("/google/signout").get(() => {});

export default authRoute;
