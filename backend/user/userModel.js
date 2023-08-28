import { Schema, SchemaType, model } from "mongoose";

const userAccountSchema = Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		refreshToken: String,
	},
	{ timestamps: true }
);
export const userModel = model("user", userAccountSchema);

const userProfileSchema = Schema(
	{
		firstName: String,
		lastName: String,
		profession: String,
		imageUrl: String,
		userId: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

export const userProfileModel = model("userProfile", userProfileSchema);
