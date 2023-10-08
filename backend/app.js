import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import { userRouter } from "./user/userRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { noteRoute } from "./note/noteRoute.js";
import authRoute from "./middleware/authRoute.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import "./passport.js";
import cors from "cors"
import { categoryRoute } from "./category/categoryRoute.js";
import { archiveRoute } from "./archive/archiveRoute.js";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// using cors 
app.use(cors({
  origin:process.env.CLIENT_URL||"http://127.0.0.1:5173",//http://localhost:5173 https://space-note-app.onrender.com
  methods:"GET, POST, PUT, DELETE",
  credentials:true
}))
app.set("trust proxy", 1);
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers','Content-Type');
//     res.header('Access-Control-Allow-Credentials', 'true')
    
//     next();
//   });

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure:false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);


//routes
app.use("/note", noteRoute);
app.use("/user", userRouter);
app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/archive", archiveRoute);


// failed route if the authentication fails
app.get("/failed", (req, res) => {
  console.log("User is not authenticated");
  res.send("Failed");
});

// the home route
app.get("/", (req, res) => {
  // const email=req.email
  res.status(200).json({
    success: true,
    message: "Welcome to Space Note App API",
  });
});
app.use(passport.initialize());
app.use(passport.session());
// Error handling middlware
app.use(errorMiddleware);
// starting server
app.listen(PORT, async () => {
  await connection(MONGODB_URL);
  console.log(`Server started and listening on http://127.0.0.1:${PORT}...`);
});
