import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    title: {
        type: String,
        require: true
    },
},
{timestamps: true
})

export const categoryModel = model('category', categorySchema)