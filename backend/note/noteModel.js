import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
<<<<<<< HEAD
        type: String,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        default: "no category"
    },
     favourite:{
        type: Boolean,
        default: "false"
     }
},
{timestamps: true
})
=======
      type: String,
      required: true,
    },
    favourite: {
      type: Boolean,
      required: true,
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
>>>>>>> 1a62ccf9566d93fddc4574e90ae02c8781d8c378

export const NoteModel = model("note", noteSchema);
