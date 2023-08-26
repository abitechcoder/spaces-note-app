import bcryptjs from "bcryptjs";

export const hashPassword = (password) => {
	const salt = bcryptjs.genSaltSync(10);
	const hashedPassword = bcryptjs.hashSync(password, salt);
	return hashedPassword;
};
