import express from "express";
import {
	addToArchive,
	deleteArchiveNote,
	getAllArchivedNote,
	restoreNote,
} from "./archiveController.js";
import { verifyUserAccessToken } from "../middleware/authController.js";

export const archiveRoute = express.Router();
archiveRoute.use(verifyUserAccessToken);
archiveRoute.route("/note").get(getAllArchivedNote);
archiveRoute.route("/note/:noteId").get(addToArchive).delete(deleteArchiveNote);
archiveRoute.route("/restore/:noteId").get(restoreNote);
