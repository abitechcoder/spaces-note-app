import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../firebase.js";
import {
	getStorage,
	ref,
	getDownloadURL,
	uploadBytesResumable,
} from "firebase/storage";

import {
	changUserPasswordService,
	createUserAccountService,
	createUserProfileService,
	deleteUserAccountService,
	deleteUserProfileByUserIdService,
	getAllAccountService,
	getUserAccountByIdService,
	getUserProfileByUserId,
	getUserProfileByUserIdService,
	getUserProfileExtendedByUserIdService,
	isAccountExist,
	sendEmailService,
	updateUserProfileService,
	uploadUserProfileImageService,
} from "./userService.js";
import { APIErrors } from "../middleware/errorHandlers.js";
import { hashPassword, validatePassword } from "../util/password.js";
import {
	createCategoryService,
	deleteAllCategoryByUserIdService,
} from "../category/categoryService.js";
import { deleteArchiveNoteByUserIdService } from "../archive/archiveService.js";
import { deleteAllNoteByUserId } from "../note/noteService.js";

// initializing firebase app
initializeApp(firebaseConfig);
// Creating new user account and setting up user profile
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
		// creating user account
		const userAccount = await createUserAccountService(email, hashedPassword);
		// creating user profile
		const userId = userAccount._id;
		const userProfile = await createUserProfileService(userId);
		// creating no category using create category service
		const data = {
			title: "No category",
			userId,
		};
		// creating default category folder (No category folder)  for user
		await createCategoryService(data);
		// sending email notification to user after successfully creating an account.
		await sendEmailService(email);
		return res.status(200).json({
			success: true,
			message: "account Created successfully",
			userAccount,
			userProfile,
		});
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
		return res.status(200).json({
			success: true,
			accounts,
		});
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
			res.status(200).json({
				success: true,
				result,
			});
		}
	} catch (error) {
		next(error);
	}
};
// delete user account together with its associated profile by id
export const deleteUserAccountById = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		if (!userId) {
			return next(APIErrors.invalidRequest("User ID required"));
		}
		if (!(await getUserAccountByIdService(userId))) {
			return next(APIErrors.notFound("No record found"));
		}
		// deleting user account
		await deleteUserAccountService(userId);
		// deleting user profile
		await deleteUserProfileByUserIdService(userId);
		// deleting category of user
		await deleteAllCategoryByUserIdService(userId);
		// deleting archived note for user
		await deleteArchiveNoteByUserIdService(userId);
		// deleting note of user
		await deleteAllNoteByUserId(userId);
		res.status(200).json({
			success: true,
			message: `user account with id ${userId} has been deleted together with all related document successfully`,
		});
	} catch (error) {
		next(error);
	}
};
// changing user password
export const changeUserPassword = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const { password, newPassword } = req.body;
		if ((!userId, !password, !newPassword)) {
			return next(APIErrors.invalidRequest("All fields are required"));
		}
		const userAccount = await getUserAccountByIdService(userId);
		if (!userAccount) {
			return next(
				APIErrors.notFound(`There is no user account with the Id ${userId}.`)
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
		const result = await changUserPasswordService(userId, hashedPassword);
		if (!result) {
			throw error;
		}
		res.status(200).json({
			success: true,
			message: "user password has been changed successful.",
		});
	} catch (error) {
		next(error);
	}
};

// creating user profile.
export const createUserProfile = async (req, res, next) => {
	try {
		const body = req.body;
		const userId = body.userId;
		if (!body.userId) {
			return next(APIErrors.invalidRequest("user id is required"));
		}
		const result = await getUserProfileByUserId(userId);
		if (result) {
			return next(APIErrors.invalidRequest("User profile already exist"));
		}
		const useProfile = await createUserProfileService(body);
		res.status(200).json({
			success: true,
			useProfile,
		});
	} catch (error) {
		next(error);
	}
};

// Fetch user profile together with their user account using user account id

export const getUserProfileExtendedByUserId = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		if (!userId) {
			return next(APIErrors.invalidRequest("User id is required."));
		}
		const pipeline = [
			{
				$lookup: {
					from: "users",
					localField: "userId",
					foreignField: "_id",
					as: "userAccount",
				},
			},
			{
				$project: {
					__v: 0,
					userAccount: {
						__v: 0,
						password: 0,
						_id: 0,
					},
				},
			},
		];
		const result = await getUserProfileExtendedByUserIdService(pipeline);
		if (!result) {
			return next(APIErrors.notFound());
		}
		const userProfile = result.find((profile) => profile.userId == userId);
		if (!userProfile) {
			return next(APIErrors.notFound());
		}
		res.status(200).json({
			success: true,
			userProfile,
		});
	} catch (error) {
		next(error);
	}
};
// fetch all user profile together with their user account
export const getAllUserProfileExtended = async (req, res, next) => {
	try {
		const pipeline = [
			{
				$lookup: {
					from: "users",
					localField: "userId",
					foreignField: "_id",
					as: "userAccount",
				},
			},
			{
				$project: {
					__v: 0,
					userAccount: {
						__v: 0,
						password: 0,
						_id: 0,
					},
				},
			},
		];
		const userProfile = await getUserProfileExtendedByUserIdService(pipeline);
		if (!userProfile) {
			return next(APIErrors.notFound());
		}
		res.status(200).json({
			success: true,
			userProfile,
		});
	} catch (error) {
		next(error);
	}
};
// updating user profile using the user id
export const updateUserProfileByUserId = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const { firstName, lastName, profession, imageURL } = req.body;
		if (!userId) {
			return next(APIErrors.invalidRequest("User Id is required"));
		}
		const userProfile = await getUserProfileByUserIdService(userId);
		if (!userProfile) {
			return next(
				APIErrors.notFound(
					`there is no user profile associated with the account id ${userId}`
				)
			);
		}

		firstName !== undefined ? (userProfile.firstName = firstName) : userProfile;
		lastName !== undefined ? (userProfile.lastName = lastName) : userProfile;
		profession !== undefined
			? (userProfile.profession = profession)
			: userProfile;
		imageURL !== undefined ? (userProfile.imageURL = imageURL) : userProfile;

		const updatedUserProfile = await updateUserProfileService(
			userId,
			userProfile
		);
		res.status(200).json({
			success: true,
			message: "user profile updated successfully",
			updatedUserProfile,
		});
	} catch (error) {
		next(error);
	}
};

// deleting user profile using user account id
export const deleteUserProfileByUserId = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		await deleteUserProfileByUserIdService(userId);
		res.status(200).json({
			success: true,
			message: "account deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

// uploading user profile image controller
export const uploadUserProfileImage = async (req, res, next) => {
	// setting storage for firebase
	const storage = getStorage();
	try {
		console.log("Image File:", req.file)
		const imageURL = req.file.originalname;
		const storageRef = ref(storage, `files/images/${req.file.originalname}`);
		const metadata = {
			contentType: req.file.mimetype,
		};
		const { userId } = req.params;
		if (!userId) {
			return next(APIErrors.invalidRequest("user id is required"));
		}
		if (!imageURL) {
			return next(APIErrors.invalidRequest("no image has been selected"));
		}

		const userProfile = await getUserProfileByUserId(userId);
		if (!userProfile) {
			return next(
				APIErrors.notFound(`no record found with the user id ${userId}.`)
			);
		}
		// saving profile image to firebase store
		const snapshot = await uploadBytesResumable(
			storageRef,
			req.file.buffer,
			metadata
		);
		// downloading profile image url from firebase store
		const downloadURL = await getDownloadURL(snapshot.ref);
		// saving profile image url to database
		await uploadUserProfileImageService(userId, downloadURL);
		res.status(200).json({
			success: true,
			message: "image uploaded successfully",
			imageURL: downloadURL,
		});
	} catch (error) {
		next(error);
	}
};

// fetching user profile image using user id

export const getUserProfileImage = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const userProfile = await getUserProfileByUserId(userId);
		if (!userProfile) {
			return next(APIErrors.notFound(`there is no user with the id ${userId}`));
		}
		const imageURL = userProfile.imageURL;
		if (!imageURL) {
			return next(APIErrors.notFound("no profile image found"));
		}
		res.status(200).json({
			success: true,
			imageURL: `http://${req.hostname}:${process.env.PORT}/images/${imageURL}`,
		});
	} catch (error) {
		next(error);
	}
};
