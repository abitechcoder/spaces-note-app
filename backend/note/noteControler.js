import { getCategoriesByUserIdService } from "../category/categoryService.js";
import {
	createNoteService,
	deleteNoteService,
	getAllNoteService,
	getNotesByIdService,
	updateNoteService,
	favouriteNoteService,
	getNotesByUserIdService,
	trashNoteService,
} from "./noteService.js";

export const createNote = async (req, res) => {
	// console.log(req.body);
	try {
		const { title, description, userId, categoryId } = req.body;
		if (!title || !description) {
			return res
				.status(400)
				.json({
					message:
						"you are yet to supply the title and description of this note!, big head😂😂",
				});
		}
		if (!categoryId) {
			const categoryByUser = await getCategoriesByUserIdService(userId);
			const noCategory = categoryByUser.find(
				(category) => category.title == "No Category"
			);
			const catId = noCategory._id;
			const data = {
				title,
				description,
				categoryId:catId,
				userId,
			};
			const newNote = await createNoteService(data);
      res.status(200).json({
				message: "note created successfully",
				newNote,
			});

		} else {
			const newNote = await createNoteService(req.body);
			res.status(200).json({
				message: "note created successfully",
				newNote,
			});
		}
	} catch (error) {
		res.status(500).json({ error: "internal server error" });
	}
};

export const getAllNotes = async (req, res) => {
	try {
		const allNotes = await getAllNoteService();
		res.status(200).json({
			message: "All notes fetched successfully",
			allNotes,
		});
	} catch (error) {
		res.status(500).json({ Error: "internal server error!" });
	}
};

export const getNotesById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ error: "Id is required" });
		}
		const note = await getNotesByIdService(id);
		res.status(200).json({
			message: "Note fetched successfully",
			note,
		});
	} catch (error) {
		res.status(500).json({ error: "internal server error" });
	}
};

export const getNotesByUserId = async (req, res) => {
	try {
		const { userId } = req.params;
		if (!userId) {
			return res.status(400).json({ error: "UserId is required" });
		}
		const notes = await getNotesByUserIdService(userId);
		res.status(200).json({
			message: "User Notes fetched successfully",
			notes,
		});
	} catch (error) {
		res.status(500).json({ error: "internal server error" });
	}
};

export const updateNote = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ error: "Account not found👴👴" });
		}
		const note = await getNotesByIdService(id);
		if (!note) {
			res.status(200).json({ error: "account not found" });
		}
		const updatedNote = await updateNoteService(id, req.body);
		res.status(200).json({
			message: "note updated successfully",
			updatedNote,
		});
	} catch (error) {
		res.status(500).json({ error: "internal server error" });
	}
};

export const updateFavourite = async (req, res) => {
	try {
		const { noteId } = req.params;
		const favourite = req.body.favourite;
		const fav = await favouriteNoteService(noteId, favourite);
		res.status(200).json({
			message: "favourite updated",
			fav,
		});
		console.log(fav);
	} catch (error) {
		res.status(500).json({ error: "internal server error" });
	}
};

export const saveToTrash = async (req, res) => {
	try {
		const { noteId } = req.params;
		const isTrashed = req.body.isTrashed;
		const trashedNote = await trashNoteService(noteId, isTrashed);
		res.status(200).json({
			message: "Note Trashed successfully",
			trashedNote,
		});
		console.log(trashedNote);
	} catch (error) {
		res.status(500).json({ error: "internal server error" });
	}
};

export const deleteNote = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ message: "Note cannot be found" });
		}
		const deleteNote = await deleteNoteService(id);
		res.status(200).json({
			message: "Note deleted successfully",
			deleteNote,
		});
	} catch (error) {
		res.status(500).json({ error: "internal server error" });
	}
};
