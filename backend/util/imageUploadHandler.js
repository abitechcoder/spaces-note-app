import multer from "multer";
import path from "path";
import sharp from "sharp";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    
},
});

export const upload = multer({
  limits: {
    fileSize: 100000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },

  storage: storage,
});

// const image=upload.single("upload")
// // const image=req.File
// console.log(image);
