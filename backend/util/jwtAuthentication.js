import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

 export const registerUser = async (email, password) => {
	const payload = {
		email,
		password,
	};
	const secret = process.env.JWT_SECRET;
	const option = {
		expiresIn: "5m",
	};
	 const token=await jwt.sign(payload, secret, option)
		 return token;
	
 }

export const verifyAccessToken=async(accessToken)=>{
const secret=process.env.JWT_SECRET
	const payload= jwt.verify(accessToken,secret)
		return payload
	}

