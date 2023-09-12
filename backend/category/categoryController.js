import {
  createCategoryService,
  getAllCategoriesService,
} from "./categoryService.js";

export const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Category title is required" });
    }
    const newCategory = await createCategoryService(req.body);
    res.status(200).json({
      message: "category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await getAllCategoriesService();
    res.status(200).json({
      messgae: "All categories fetched successfully",
      categories: allCategories,
    });
  } catch (error) {
    res.status(500).json({ Error: "internal server error!" });
  }
};

// export const getNotesById = async(req, res) => {
//     try {
//         const {id} = req.params
//         if(!id){
//             return res.status(400).json({error: "Id is required"})
//         }
//         const note = await getNotesByIdService(id)
//         res.status(200).json({
//             message: "Note fetched successfully",
//             note
//         })
//     } catch (error) {
//         res.status(500).json({error: "internal server error"})
//     }
// }

// export const updateNote = async (req, res) => {
//     try {
//         const {id} = req.params
//         if(!id){
//             return res.status(400).json({error: "Account not found👴👴"})
//         }
//         const note = await getNotesByIdService(id)
//         if(!note){
//         res.status(200).json({error: "account not found"})
//         }
//         const updatedNote = await updateNoteService(id, req.body)
//         res.status(200).json({
//             message: "note updated successfully",
//             updatedNote
//         })
//     } catch (error) {
//         res.status(500).json({error: "internal server error"})
//     }
// }

// export const deleteNote = async (req, res) =>{
//     try{
//         const { id } = req.params
//         if(!id){
//             res.status(400).json({message: "Note cannot be found"})
//         }
//         if(!note){
//             return res.status(400).json({error: "Note does not exist"})
//         }
//         const deleteNote = await deleteNoteService(id)
//         res.status(200).json({
//             message: "Note deleted successfully",
//             deleteNote
//         })
//     }catch (error) {
//         res.status(500).json({error: "internal server error"})
//     }
// }
