import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    favourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const NoteModel = model("note", noteSchema);
