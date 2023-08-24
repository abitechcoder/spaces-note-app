import {
  createUserAccountService,
  getAllAccountService,
  isAccountExist,
} from "./userService.js";
import { APIErrors } from "../middleware/errorHandlers.js";
import { json } from "express";

export const createUserAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw APIErrors.invalidRequest("All fields are required");
    }
    //  checking if account already exit
    if (await isAccountExist(email)) {
      throw APIErrors.duplicatePosible();
    } else {
      const userAccount = await createUserAccountService(email, password);
      return res.status(200).json({ success: "true", userAccount });
    }
  } catch (error) {
    next(error);
    res.status(error.status).json({ success: "false", error: error.message });
  }
};
// getting all account from database
export const getAllAccount = async (req, res, next) => {
  try {
    const accounts = await getAllAccountService();
   //  returning Database empty to client if there is no record in the database
    if (accounts.length===0) {
     return res.status(200).json({success:"true",message:"Database empty"})
    } 
    return res.status(200).json({ success: "true", accounts });
  } catch (error) {
    next(error);
    res.status(error.status), json({ success: "false", error: error.message });
  }
};
