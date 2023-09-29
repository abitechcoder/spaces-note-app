import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
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

export const NoteModel = model('note', noteSchema)