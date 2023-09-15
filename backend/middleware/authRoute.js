import express from "express";
import {
	googleAuthController,
	refreshUserAccessToken,
	signIn,
} from "./authController.js";
import passport from "passport";
const authRoute = express.Router();

authRoute.route("/signin").post(signIn).get(googleAuthController);
authRoute.route("/google").get(passport.authenticate('google', {
	scope:
		['email', 'profile']
}
));
authRoute.route("/google/callback").get( passport.authenticate('google', {
	failureRedirect: '/failed',
}),
 (req, res) =>{
	res.redirect('/auth/signin')

});
authRoute.route("/signin/refresh-token").post(refreshUserAccessToken);
export default authRoute;
