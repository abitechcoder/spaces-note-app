import { signInUser } from "../util/jwtAuthentication"

export const sinInUserService=async(email,password)=>{
    return await signInUser(email,password)

}