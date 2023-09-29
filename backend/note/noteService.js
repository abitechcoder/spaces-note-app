import { NoteModel } from "./noteModel.js";


export const createNoteService = async(data) => {
    const newNote = new NoteModel({
        title: data.title,
        description: data.description,
        category: data.category,
        userId: data.userId,
        favourite: data.favourite
    })
    newNote.save()
    return newNote
    
}

export const favouriteNoteService = async (noteId, updateData) => {
    return await NoteModel.findOneAndUpdate({_id:noteId},{favourite:updateData}, {new:true})
}

export const getAllNoteService = async() => {
    const id = NoteModel.userId
    console.log(id)
    const allNotes = await NoteModel.find(id)
    return allNotes
} 
export const getNotesByIdService = async(id) => {
  const account = await NoteModel.findById(id)
  return account
}

export const updateNoteService = async (id, data) => {
    const updatedNote = await NoteModel.findByIdAndUpdate(id, {
        title: data.title,
        description: data.description,
        category: data.category,
        
    }, {new: true})
    return updatedNote
}

export const deleteNoteService = async (req, res) => {
   const deleteNote = await NoteModel.findByIdAndDelete(id)
   return deleteNote
}