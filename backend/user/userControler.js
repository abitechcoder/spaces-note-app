import { createUserAccountService } from "./userService.js"

export const createUserAccountController=async(req,res)=>{
   try {
    const {email,password}=req.body
    if (!email || !password){
        return res.status(400).json("Email and password fields are required")
    }
    const userAccount= await createUserAccountService(email,password)
    res.status(200).json({success:"true",userAccount})
   } catch (error) {
    res.status(400).json({success:"false",error:error.message})
   }
}