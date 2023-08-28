import  express from "express"
import dotenv from "dotenv"
import connection from "./config/db.js"
import { userRouter } from "./user/userRoute.js"
import errorMiddleware from "./middleware/errorMiddleware.js"
import { noteRoute } from "./note/noteRoute.js"
import authRoute from "./middleware/authRoute.js"
import { verifyUserAccessToken } from "./middleware/authController.js"
dotenv.config()


const PORT=process.env.PORT
const MONGODB_URL= process.env.MONGODB_URL

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routes
app.use('/note', noteRoute)
app.use("/user",userRouter)
app.use("/auth",authRoute)

// the home route
app.get("/",verifyUserAccessToken,(req,res)=>{
    const email=req.email
    res.status(200)
    .json({
        success:"true",
        message:"Welcome to Space Note App API"
    })
})
app.use(errorMiddleware)
// app.use(verifyAccessToken)
//starting up server
app.listen(PORT,async()=>{
    
    await connection(MONGODB_URL)
    console.log(`Server started and listening on http://127.0.0.1:${PORT}...`);
})