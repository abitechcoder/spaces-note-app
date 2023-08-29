import {getUserAccountByEmailService } from "../user/userService.js";
import { validatePassword } from "../util/password.js";
import {
	generateRefreshTokenService,
  registerUserService,
  verifyRefreshUserAccessTokenService,
  verifyUserAccessTokenService,
  findAndUpdateUserRefreshTokenByEmailService
} from "./authService.js";
import { APIErrors } from "./errorHandlers.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(APIErrors.invalidRequest("All fields are required"));
    }
    //  checking if account already exit
    const userAccount = await getUserAccountByEmailService(email);
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
	// generating access token and storing it in the database
	const userRefreshToken=await generateRefreshTokenService(email,password)
	if(!accessToken){
		return next(APIErrors.unAuthenticated())
	}
	const result= await findAndUpdateUserRefreshTokenByEmailService(email,userRefreshToken)
    res.cookie("access_token", accessToken, {
      // httpOnly: true
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const verifyUserAccessToken = async (req, res, next) => {
	try {
	  const accessToken=req.cookies.access_token;
	if (!accessToken) {
	  return next(APIErrors.unAuthenticated());
	}
	const payload = await verifyUserAccessTokenService(accessToken);
	if (!payload){
		console.log(err);
	  return next(APIErrors.unAuthenticated())
	}
	req.email = payload.email;
	req.password = payload.email;
	req.refreshToken=payload.refreshToken
	 return next()
  
  } catch (error) {
    next(error);
  }
}

export const refreshUserAccessToken=async(req,res,next)=>{

  try {
    const {email}=req.body
    if(!email){
      return next(APIErrors.invalidRequest("Email is required"))
    }
    const userAccount= await getUserAccountByEmailService(email)
    if(! userAccount){
      return next(APIErrors.notFound(`There is no account with the email ${email}`))
    }
    const refreshToken=userAccount.refreshToken
    const password=userAccount.password
    if(!refreshToken){
      return next(APIErrors.notFound())
    }
    const payload=await verifyRefreshUserAccessTokenService(refreshToken)
    if(!payload){
      return next(APIErrors.unAuthenticated())
    }
    const accessToken=await registerUserService(email,password)
    res.cookie("access_token", accessToken)
    const refreshAccessToken=await generateRefreshTokenService(email,password)
    const result=await findAndUpdateUserRefreshTokenByEmailService(email,refreshAccessToken)
    if(! result){
       throw error
    }
    res.status(200).json({success:"true",message:"access token refreshed"})
  } catch (error) {
    next(error)
  }
}