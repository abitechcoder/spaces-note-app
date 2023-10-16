import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// generation user access token function
export const registerUser = async (email) => {
	try {
		const payload = {
			email,
			refreshToken: "",
		};
		const secret = process.env.JWT_SECRET;
		const option = {
			expiresIn: "1d",
		};
		//   user access token
		const Token = jwt.sign(payload, secret, option);
		return Token;
	} catch (error) {
		console.log(error.message);
	}
};

//Verifying user access token
export const verifyAccessToken = async (accessToken) => {
	try {
		const secret = process.env.JWT_SECRET;
		const payload = jwt.verify(accessToken, secret);
		return payload;
	} catch (error) {
		console.log(error.message);
	}
};

// generating user refresh token function
export const generateRefreshToken = async (email) => {
	try {
		const payload = {
			email,
		};
		const secret = process.env.JWT_REFRESH_SECRET;
		const option = {
			expiresIn: "7d",
		};
		const refreshToken = jwt.sign(payload, secret, option);
		return refreshToken;
	} catch (error) {
		console.log(error.message);
	}
};

// verifying user refresh token function
export const verifyRefreshAccessToken = async (refreshToken) => {
	try {
		const secret = process.env.JWT_REFRESH_SECRET;
		// user refresh token
		const payload = jwt.verify(refreshToken, secret);
		return payload;
	} catch (error) {
		console.log(error.message);
	}
};
