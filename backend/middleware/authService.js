import { generateRefreshToken, registerUser, verifyAccessToken } from "../util/jwtAuthentication.js";
//sigin in a user
export const registerUserService = async (email, password) => {
  return await registerUser(email, password);
};
//checking if a person is signed in
export const verifyUserAccessTokenService = async (accessToken) => {
  return await verifyAccessToken(accessToken);
};

export const generateRefreshTokenService=async(email,password)=>{
    return await generateRefreshToken(email,password)
}