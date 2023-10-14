import express from "express";
import {
	addToArchive,
	deleteArchiveNote,
	getAllArchivedNoteByUser,
	restoreNote,
} from "./archiveController.js";
import { verifyUserAccessToken } from "../middleware/authController.js";

export const archiveRoute = express.Router();
archiveRoute.use(verifyUserAccessToken);
archiveRoute.route("/note").get(getAllArchivedNoteByUser);
archiveRoute.route("/note/:noteId").post(addToArchive).delete(deleteArchiveNote);
archiveRoute.route("/restore/:noteId").post(restoreNote);
