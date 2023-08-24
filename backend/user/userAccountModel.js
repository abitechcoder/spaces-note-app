import { Schema,model } from "mongoose";

const userAccountSchema= Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
export const userModel=model("user",userAccountSchema)
