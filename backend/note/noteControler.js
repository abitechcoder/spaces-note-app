import { 
    createNoteService,
    deleteNoteService,
    getAllNoteService,
    getNotesByIdService,
    updateNoteService
  } from "./noteService.js";


export const createNote = async(req, res) => {
    try{
        const { title, description} = req.body
        if(!title || !description){
            return res.status(400).json({message: "you are yet to supply the title and description of this note!, big head😂😂"})
        }
        const newNote = await createNoteService(req.body)
        res.status(200).json({
            message: "note created successfully",
            newNote
        })
    }catch(error){
        res.status(500).json({error: "internal server error"})
    }
}

export const getAllNotes = async(req, res) => {
   try{
     const allNotes = await getAllNoteService()
     res.status(200).json({
        messgae: "All notes fetched successfully",
        allNotes
    })
   }catch(error) {
    res.status(500).json({Error: "internal server error!"})
   }
}

export const getNotesById = async(req, res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({error: "Id is required"})
        }
        const note = await getNotesByIdService(id)
        res.status(200).json({
            message: "Note fetched successfully",
            note
        })
    } catch (error) {
        res.status(500).json({error: "internal server error"})
    }
}

export const updateNote = async (req, res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({error: "Account not found👴👴"})
        }
        const note = await getNotesByIdService(id)
        if(!note){
        res.status(200).json({error: "account not found"})
        }
        const updatedNote = await updateNoteService(id, req.body)
        res.status(200).json({
            message: "note updated successfully",
            updatedNote
        })
    } catch (error) {
        res.status(500).json({error: "internal server error"})
    }
}

export const deleteNote = async (req, res) =>{
    try{ 
        const { id } = req.params 
        if(!id){
            res.status(400).json({message: "Note cannot be found"})
        }
        if(!note){
            return res.status(400).json({error: "Note does not exist"})
        }
        const deleteNote = await deleteNoteService(id)
        res.status(200).json({
            message: "Note deleted successfully",
            deleteNote
        })
    }catch (error) {
        res.status(500).json({error: "internal server error"})
    }
}