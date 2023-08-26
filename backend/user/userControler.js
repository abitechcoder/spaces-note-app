import {
	createUserAccountService,
	deleteUserAccountService,
	getAllAccountService,
	getUserAccountByIdService,
	isAccountExist,
} from "./userService.js";
import { APIErrors } from "../middleware/errorHandlers.js";
import { hashPassword } from "../util/hashPassword.js";

export const createUserAccount = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return next( APIErrors.invalidRequest("All fields are required"));
		}
		//  checking if account already exit
		if (await isAccountExist(email)) {
			return next( APIErrors.invalidRequest("Account already exist"));
		} 
			const hashedPassword = hashPassword(password);
			const userAccount = await createUserAccountService(email, hashedPassword);
			return res.status(200).json({ success: "true", userAccount });
	
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
		if (accounts.length === 0) {
			return res
				.status(200)
				.json({ success: "true", message: "Database empty" });
		}
		return res.status(200).json({ success: "true", accounts });
	} catch (error) {
		next(error);
		// res.status(error.status), json({ success: "false", error: error.message });
	}
};

export const getUseAccountById = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		if (!userId) {
			return next(APIErrors.invalidRequest("User ID required"));
		} else {
			const result = await getUserAccountByIdService(userId);
			if (!result) {
				return next( APIErrors.notFound());
			}
			res.status(200).json({ success: "true", result });
		}
	} catch (error) {
		next(error);
		// res.status(error.status).json({ success: "false", error: error.message });
	}
};
export const deleteUserAccount = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		if (!userId) {
			return next( APIErrors.invalidRequest("User ID required"));
		}
		if (!(await getUserAccountByIdService(userId))) {
			return next( APIErrors.notFound("No record found"));
		}
		const result = await deleteUserAccountService(userId);
		res.status(200).json({ success: "true", result });
	} catch (error) {
		next(error);
		// res.status(error.status).json({ success: "false", error: error.message });
	}
};
