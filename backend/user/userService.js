import { userModel, userProfileModel } from "./userModel.js";

// creating a user account service
export const createUserAccountService = async (email, password) => {
  const userAccount = new userModel({
    email,
    password,
    refreshToken:""
  });
  return await userAccount.save();
};
// checking if a user account exit using uer email
export const isAccountExist = async (email) => {
  if (await userModel.findOne({ email })) {
    return true;
  } else return false;
};
// Fetching all users using their email address
export const getUserAccountByEmailService=async(email)=>{
return await userModel.findOne({email})
}
// Fetching all user account services
export const getAllAccountService = async () => {
  return await userModel.find();
};
// Fetching a user account using user id service
export const getUserAccountByIdService=async(userId)=>{
  return await userModel.findById(userId)
}
// Deleting a user account using the user id service
export const deleteUserAccountService=async(userId)=>{
  return await userModel.findByIdAndDelete(userId)
}

// Changing user password service
export const changUserPasswordService=async(email,newPassword)=>{
return	await userModel.findOneAndUpdate({email},{password:newPassword},{new:true})
	
}

// create user profile  service
export const createUserProfileService=async(userId)=>{
  const userProfile=new userProfileModel({userId})
  return await userProfile.save()
}
// getting user profile together with the user account using user id
export const getUserProfileExtendedByUserIdService=async(pipeline)=>{
  return await userProfileModel.aggregate(pipeline).exec()
}
// getting user profile using the user id
export const getUserProfileByUserId=async(userId)=>{
  return await userProfileModel.findOne({userId})
}
//updating user profile using the user account id
export const updateUserProfileService=async(userId,update)=>{
  return await userProfileModel.findOneAndUpdate({userId},update,{new:true})
}
// getting user profile using user id
export const getUserProfileByUserIdService=async(userId)=>{
return await userProfileModel.findOne({userId})
}

// deleting user profile using the user id

export const deleteUserProfileByUserIdService= async(userId)=>{
  return await userProfileModel.findOneAndDelete({userId})
}