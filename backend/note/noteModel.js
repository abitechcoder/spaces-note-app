import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
},
{timestamps: true
})

export const NoteModel = model('note', noteSchema)