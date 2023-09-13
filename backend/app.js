import  express from "express"
import dotenv from "dotenv"
import connection from "./config/db.js"
import { userRouter } from "./user/userRoute.js"
import errorMiddleware from "./middleware/errorMiddleware.js"
import { noteRoute } from "./note/noteRoute.js"
import authRoute from "./middleware/authRoute.js"
import cookieParser from "cookie-parser"
import passport from "passport"
import session from "express-session"
import "./passport.js"
import cors from "cors"

dotenv.config()


const PORT=process.env.PORT
const MONGODB_URL= process.env.MONGODB_URL

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(session({
    secret: process.env.GOOGLE_AUTH_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());



// Success route if the authentication is successful
// app.get("/success",isLoggedIn, (req, res) => {
//     console.log('You are logged in');
//     res.send(`Welcome ${req.user.displayName}`)
// })

//routes
app.use('/note', noteRoute)
app.use("/user",userRouter)
app.use("/auth",authRoute)

//   Google authentication route
app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
));
app.get("/success", (req, res) => {
    console.log('You are logged in');
    // res.send(req.user_json)
    res.send(`Welcome ${req.user._json.email}`)
    console.log(req.user._json.email);
})
// Call back route
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
     (req, res) =>{
        res.redirect('/success')

    }
);

// failed route if the authentication fails
app.get("/failed", (req, res) => {
    console.log('User is not authenticated');
    res.send("Failed")
})

// the home route
app.get("/",(req,res)=>{
    // const email=req.email
    res.status(200)
    .json({
        success:true,
        message:"Welcome to Space Note App API"
    })
})
app.use(errorMiddleware)
app.listen(PORT,async()=>{
    
    await connection(MONGODB_URL)
    console.log(`Server started and listening on http://127.0.0.1:${PORT}...`);
})