import  express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express()
const PORT=process.env.PORT

app.use(express.urlencoded({extended:false}))
app.use(express.json())

// the home route
app.get("/",(req,res)=>{
    res.status(200)
    .json({
        success:"true",
        message:"Welcome to Space Note App API"
    })
})

app.listen(PORT,()=>{
    console.log(`Server started and listening on http://127.0.0.1:${PORT}...`);
})