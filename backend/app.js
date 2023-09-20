import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import { userRouter } from "./user/userRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { noteRoute } from "./note/noteRoute.js";
<<<<<<< HEAD
import authRoute from "./middleware/authRoute.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import "./passport.js";
// import cors from "cors"
=======
import { categoryRoute } from "./category/categoryRoute.js";
import authRoute from "./middleware/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
>>>>>>> caa0d098552ffa5ab979935b169d67902cb3ed6b

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
<<<<<<< HEAD
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// using cors 
// app.use(cors({
//   origin:"http://localhost:5173",
//   methods:"GET, POST, PUT, DELETE",
//   credentials:true
// }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true')
    
    next();
  });
 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure:false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

=======

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
>>>>>>> caa0d098552ffa5ab979935b169d67902cb3ed6b
//routes
app.use("/note", noteRoute);
app.use("/user", userRouter);
app.use("/auth", authRoute);
<<<<<<< HEAD

// failed route if the authentication fails
app.get("/failed", (req, res) => {
  console.log("User is not authenticated");
  res.send("Failed");
});

// the home route
app.get("/", (req,res)=> {
=======
app.use("/category", categoryRoute);

// the home route
app.get("/", (req, res) => {
  // const email=req.email
>>>>>>> caa0d098552ffa5ab979935b169d67902cb3ed6b
  res.status(200).json({
    success: true,
    message: "Welcome to Space Note App API",
  });
});
app.use(errorMiddleware);
app.listen(PORT, async () => {
  await connection(MONGODB_URL);
  console.log(`Server started and listening on http://127.0.0.1:${PORT}...`);
<<<<<<< HEAD
});                                      
=======
});
>>>>>>> caa0d098552ffa5ab979935b169d67902cb3ed6b
