import { userModel } from "./userModel.js";

// export
export const createUserAccountService = async (email, password) => {
  const userAccount = new userModel({
    email,
    password,
  });
  return await userAccount.save();
};

export const isAccountExist = async (email) => {
  if (await userModel.findOne({ email })) {
    return true;
  } else return false;
};

export const getAllAccountService = async () => {
  return await userModel.find();
};
