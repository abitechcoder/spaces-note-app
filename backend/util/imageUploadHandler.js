import multer from "multer";
import fs from "fs";
import path from "path";
import { getUserProfileByUserIdService } from "../user/userService.js";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../backend/public/images");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

export const upload = multer({
	limits: {
		fileSize: 100000,
	},

	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
			return cb(new Error("Please upload a valid image file"));
		}
		const { userId } = req.params;
		getUserProfileByUserIdService(userId)
			.then((userProfile) => {
				const previousImage = userProfile.imageURL;
				// removing previous image if not the same as the new image to be uploaded
				if (file.originalname !== previousImage && previousImage !== "") {
					const imagePath = path.resolve("public/images/" + previousImage);
					fs.unlinkSync(`${imagePath}`);
				}
			})
			.catch((error) => {
				if (error) {
					cb(new Error(error.message));
				}
			});
		cb(undefined, true);
	},

	storage: storage,
});
