import { ArchiveModel } from "./archiveModel.js";

export const addToArchiveService = async (deletedNote) => {
	const archiveNote = new ArchiveModel({
		title: deletedNote.title,
		description: deletedNote.description,
		categoryId: deletedNote.categoryId,
		userId: deletedNote.userId,
		favourite: deletedNote.favourite,
	});

	return await archiveNote.save();
};

export const getAllArchiveNotesService = async () => {
	return await ArchiveModel.find();
};
export const getArchiveNoteByIdService = async (archivedNoteId) => {
	return await ArchiveModel.findById(archivedNoteId);
};

export const deleteArchiveNoteByIdService = async (archiveNoteId) => {
	return await ArchiveModel.findByIdAndDelete(archiveNoteId);
};
