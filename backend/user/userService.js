import {userModel} from "./userAccountModel.js"

// export 
export const createUserAccountService=async(email,password)=>{
const userAccount=new userModel({
    email,
    password
})
return await userAccount.save()
}