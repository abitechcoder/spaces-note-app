import bcryptjs from "bcryptjs";
export const HashPassword = (password) => {
	const salt = bcryptjs.genSaltSync(10);
	const hashPassword = bcryptjs.hashSync(password, salt);
	return hashPassword;
};
