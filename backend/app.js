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
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
// cors options
// const corsOptions = (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };
// using cors
app.use(cors( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.GOOGLE_AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// using passport with google authentication
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/note", noteRoute);
app.use("/user", userRouter);
app.use("/auth", authRoute);

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
app.use(errorMiddleware);
app.listen(PORT, async () => {
  await connection(MONGODB_URL);
  console.log(`Server started and listening on http://127.0.0.1:${PORT}...`);
});
