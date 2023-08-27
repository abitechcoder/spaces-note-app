import { getUserAccountByEmail } from "../user/userService.js";
import { signInUser } from "../util/jwtAuthentication.js";
import { validatePassword } from "../util/password.js";
import { APIErrors } from "./errorHandlers.js";

export const  signIn=async(req,res,next)=>{

    try {
        const { email, password } = req.body;
            if (!email || !password) {
                return next( APIErrors.invalidRequest("All fields are required"));
            }
            //  checking if account already exit
            const userAccount= await getUserAccountByEmail(email)
            // console.log(userAccount);
            if (!userAccount) {
                return next( APIErrors.notFound(`There is no account with the email ${email}`));
            } 
         const hashedPassword=userAccount.password
            if (! await validatePassword(password,hashedPassword)){
                return next(APIErrors.invalidRequest("Invalid Password"))
            }
            const accessToken= await signInUser(email,password)
            // console.log(accessToken);
            res.cookie('access_token', accessToken, {
                // httpOnly: true
            })
            return  res.status(200).json({accessToken})
    } 
catch (error) {
        next(error)
    }
    }