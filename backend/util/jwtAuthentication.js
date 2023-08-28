import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (email, password) => {
  const payload = {
    email,
    password,
	refreshToken:""
  };
  const secret = process.env.JWT_SECRET;
  const option = {
    expiresIn: "30s",
  };
  const Token = jwt.sign(payload, secret, option);
  return Token;
};

export const verifyAccessToken = async (accessToken) => {
  const secret = process.env.JWT_SECRET;
  const payload = jwt.verify(accessToken, secret);
  return payload;
};

export const generateRefreshToken=async(email, password)=>{
	const payload = {
		email,
		password,
	  };
	  const secret = process.env.JWT_REFRESH_SECRET;
	  const option = {
		expiresIn: "1y",
	  };
	const refreshToken=jwt.sign(payload,secret,option)
	return refreshToken
}