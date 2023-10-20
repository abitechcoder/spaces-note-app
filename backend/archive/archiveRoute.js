import express from "express";
import {
	addToArchive,
	deleteArchiveNote,
	getAllArchivedNoteByUser,
	restoreNote,
} from "./archiveController.js";
import { verifyUserAccessToken } from "../middleware/authController.js";

export const archiveRoute = express.Router();
archiveRoute.route("/note/test/userId").get(getAllArchivedNoteByUser);
// archiveRoute.use(verifyUserAccessToken);
archiveRoute.route("/note").get(verifyUserAccessToken,getAllArchivedNoteByUser);
archiveRoute.route("/note/:noteId").post(verifyUserAccessToken,addToArchive).delete(verifyUserAccessToken,deleteArchiveNote);
archiveRoute.route("/restore/:noteId").post(verifyUserAccessToken,restoreNote);
