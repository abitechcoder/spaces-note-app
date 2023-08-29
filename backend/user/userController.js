import {
	changUserPasswordService,
	createUserAccountService,
	createUserProfileService,
	deleteUserAccountService,
	getAllAccountService,
	getUserAccountByEmailService,
	getUserAccountByIdService,
	getUserProfileByUserIdService,
	isAccountExist,
} from "./userService.js";
import { APIErrors } from "../middleware/errorHandlers.js";
import { hashPassword, validatePassword } from "../util/password.js";
export const createUserAccount = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(APIErrors.invalidRequest("All fields are required"));
		}
		//  checking if account already exit
		if (await isAccountExist(email)) {
			return next(APIErrors.invalidRequest("Account already exist"));
		}
		const hashedPassword = hashPassword(password);
		const userAccount = await createUserAccountService(email, hashedPassword);
		return res.status(200).json({
			 success: "true",
			 message:"account created successfully.",
			 userAccount });
	} catch (error) {
		next(error);
		res.status(error.status).json({ success: "false", error: error.message });
	}
};
// Fetching all user accounts from database
export const getAllAccount = async (req, res, next) => {
	try {
		const accounts = await getAllAccountService();
		//  returning Database empty to client if there is no record in the database
		if (accounts.length === 0) {
			return res
				.status(200)
				.json({ success: "true", message: "Database empty" });
		}
		return res.status(200).json({ success: "true", accounts });
	} catch (error) {
		next(error);
	}
};
// Fetch user account by id
export const getUseAccountById = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		if (!userId) {
			return next(APIErrors.invalidRequest("User ID required"));
		} else {
			const result = await getUserAccountByIdService(userId);
			if (!result) {
				return next(APIErrors.notFound());
			}
			res.status(200).json({ success: "true", result });
		}
	} catch (error) {
		next(error);
	}
};
// delete user account by id
export const deleteUserAccountById = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		if (!userId) {
			return next(APIErrors.invalidRequest("User ID required"));
		}
		if (!(await getUserAccountByIdService(userId))) {
			return next(APIErrors.notFound("No record found"));
		}
		const result = await deleteUserAccountService(userId);
		res.status(200).json({ 
			success: "true",
			message:"account deleted successfully",
			result });
	} catch (error) {
		next(error);
	}
};
// changing user password
export const changeUserPassword = async (req, res, next) => {
	try {
		const { email, password, newPassword } = req.body;
		if ((!email, !password, !newPassword)) {
			return next(APIErrors.invalidRequest("All fields are required"));
		}
		const userAccount = await getUserAccountByEmailService(email);
		if (!userAccount) {
			return next(
				APIErrors.notFound(`There is no user account with the email ${email}.`)
			);
		}
		const validatedPassword = await validatePassword(
			password,
			userAccount.password
		);
		if (!validatedPassword) {
			return next(APIErrors.invalidRequest("Enter valid password"));
		}
		const hashedPassword = hashPassword(newPassword);
		const result = await changUserPasswordService(email, hashedPassword);
		if (!result) {
			throw error;
		}
		res
			.status(200)
			.json({ success: "true", message: "password change successful." });
	} catch (error) {
		next(error);
	}
};

// creating user profile
export const createUserProfile=async(req,res,next)=>{
	try {
		const body=req.body
		const userId=body.userId
		console.log(body.userId);
		if (!body.userId){
			return next(APIErrors.invalidRequest("user id is required"))
		}
		const result=await getUserProfileByUserIdService(userId)
		if(result){
			return next(APIErrors.invalidRequest("User profile already exist"))
		}
		const useProfile= await createUserProfileService(body)
		res.status(200).json({success:"true",useProfile})
	} catch (error) {
		next(error)
	}
}

// Fetch user profile using uer account id

export const getUerProfile=async(req,res,next)=>{
	try {
		const userId=req.params.userId
		if(! userId){
			return next(APIErrors.invalidRequest("User id is required."))
		}
		const pipeline=[
			{
				$lookup:{
					from:"users",
					localField:"userId",
					foreignField:"_id",
					as:"userAccount"
			}
		},
		{
			$project:{
				__v:0,
				userAccount:{
					__v:0,
					password:0,
					_id:0
				}

			}
		}
		]
		const result= await getUserProfileByUserIdService(pipeline)
		if (! result){
			return next(APIErrors.notFound())
		}
		
		const userProfile= result.find(profile=>profile.userId==userId)
		if (! userProfile){
			return next(APIErrors.notFound())
		}

		res.status(200).json({success:"true",userProfile})

	} catch (error) {
		next(error)
		
	}
}