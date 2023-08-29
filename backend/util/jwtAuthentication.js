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
    expiresIn: "5m",
  };
  const Token = jwt.sign(payload, secret, option);
  return Token;
};
//
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
		expiresIn: "1d",
	  };
	const refreshToken=jwt.sign(payload,secret,option)
	return refreshToken
}

export const verifyRefreshAccessToken=async(refreshToken)=>{
	const secret=process.env.JWT_REFRESH_SECRET
	const payload=jwt.verify(refreshToken,secret)
	return payload
}