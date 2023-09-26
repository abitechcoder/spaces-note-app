import { userModel } from "../user/userModel.js";
import { generateRefreshToken, verifyRefreshAccessToken, registerUser, verifyAccessToken } from "../util/jwtAuthentication.js";
//signing in user using JWT service
export const registerUserService = async (email) => {
  return await registerUser(email );
};
//verifying user access token with JWT
export const verifyUserAccessTokenService = async (accessToken) => {
  return await verifyAccessToken(accessToken);
};
// Generation refresh token using user email and password
export const generateRefreshTokenService=async(email)=>{
    return await generateRefreshToken(email)
}
// Verifying user refresh token using JWT
export const verifyRefreshUserAccessTokenService=async(refreshToken)=>{
  return await verifyRefreshAccessToken(refreshToken)
}
// Finding a user with user email to update the user's refresh token
export const findAndUpdateUserRefreshTokenByEmailService=async(email,update)=>{
  return await userModel.findOneAndUpdate({email},{refreshToken:update},{new:true})
}