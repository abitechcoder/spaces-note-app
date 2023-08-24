import { createUserAccountService } from "./userService.js"
import { APIErrors } from "../middleware/errorHandlers.js"

export const createUserAccountController=async(req,res,next)=>{
    const error=APIErrors.notFound("All fields are required")
   try {
    const {email,password}=req.body
    if (!email || !password){
       return res.status(error.status).json({error:error.message})
    }
    const userAccount= await createUserAccountService(email,password)
    res.status(200).json({success:"true",userAccount})
   } catch (error) {
    next (error)
    res.status(400).json({success:"false",error:error.message})
   }
}