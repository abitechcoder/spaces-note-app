import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

 export const signInUser = async (email, password) => {
	const payload = {
		email,
		password,
	};
	const secret = process.env.JWE_SECRET||"AESREWGDFDE7865YTUGGKHOHL";
    // console.log(secret);
	const option = {
		expiresIn: "5m",
	};
	const token = jwt.sign(payload, secret, option);
	return token;
};

export const validateUser=async(accessToken)=>{
const secret=process.env.JWE_SECRET||"AESREWGDFDE7865YTUGGKHOHL"
	const validate=jwt.verify(accessToken,secret)
	return validate
}