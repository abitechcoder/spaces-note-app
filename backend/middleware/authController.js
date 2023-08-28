import { getUserAccountByEmail } from "../user/userService.js";
import { validatePassword } from "../util/password.js";
import {
	registerUserService,
	verifyUserAccessTokenService,
} from "./authService.js";
import { APIErrors } from "./errorHandlers.js";

export const registerUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(APIErrors.invalidRequest("All fields are required"));
		}
		//  checking if account already exit
		const userAccount = await getUserAccountByEmail(email);
		// console.log(userAccount);
		if (!userAccount) {
			return next(
				APIErrors.notFound(`There is no account with the email ${email}`)
			);
		}
		//validate user password
		const hashedPassword = userAccount.password;
		if (!(await validatePassword(password, hashedPassword))) {
			return next(APIErrors.invalidRequest("Invalid Password"));
		}
		const accessToken = await registerUserService(email, password);
		// console.log(accessToken);
		res.cookie("access_token", accessToken, {
			// httpOnly: true
		});
		return res.status(200).json({ accessToken });
	} catch (error) {
		next(error);
	}
};

export const verifyUserAccessToken = async (req, res, next) => {
	const header = req.headers["authorization"].split(" ");
	const access_token = header[1];
	const payload = await verifyUserAccessTokenService(access_token);
    if(!payload){
        return next(APIErrors.unAuthenticated())
    }
	res.status(200).json({message:"Log in successful",payload})
	try {
	} catch (error) {
		next(error);
	}
};
