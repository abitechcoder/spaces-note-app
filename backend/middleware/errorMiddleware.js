import { APIErrors } from "./errorHandlers.js";

const errorMiddleware = (error, req, res, next) => {
	if (error instanceof APIErrors) {
		return res
			.status(error.status)
			.json({ success: "false", error: error.message });
	}

	return res
		.status(error.status || 500)
		.json({
			success: "false",
			error: error.message || "Internal server error",
		});
};

export default errorMiddleware;
