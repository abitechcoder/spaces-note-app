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
const userModel=model("user",userAccountSchema)
export default userModel