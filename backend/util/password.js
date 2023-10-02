import bcryptjs from "bcryptjs";
// hashing password function
export const hashPassword = (password) => {
	const salt = bcryptjs.genSaltSync(10);
	const hashedPassword = bcryptjs.hashSync(password, salt);
	return hashedPassword;
};

// validation hashed password function
export const validatePassword = (password, hashedPassword) => {
	return bcryptjs.compare(password, hashedPassword);
};
