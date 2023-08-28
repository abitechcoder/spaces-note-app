import { registerUser, verifyAccessToken } from "../util/jwtAuthentication.js"

export const registerUserService=async(email,password)=>{
    return await registerUser(email,password)

}

export const  verifyUserAccessTokenService=async(accessToken)=>{
    return await verifyAccessToken(accessToken)
}