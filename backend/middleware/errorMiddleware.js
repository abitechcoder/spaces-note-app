import { APIErrors } from "./errorHandlers.js";

const errorMiddleware=(error,req,res,next)=>{
    if(error instanceof APIErrors){
        return res.status(error.status).json({success:"middleware",error:error.message})
    }

    return res.status(500).json({success:"false",error:"Internal server error"})
}


export default errorMiddleware