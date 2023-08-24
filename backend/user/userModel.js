import { Schema,SchemaType,model } from "mongoose";

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

const userProfileSchema=Schema({
    firstName:String,
    lastName:String,
    profession:String,
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

export const userProfileModel=model("userProfile",userProfileSchema)