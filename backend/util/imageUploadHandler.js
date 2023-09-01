import multer from "multer"
import sharp from "sharp"




    export   const upload=multer({
            limits:{
                fileSize:100000
            },
            fileFilter(req,file,cb){
                if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
                    return cb(new Error('Please upload a valid image file'))
                }
                cb(undefined,true)
            }
        })
       
// const image=upload.single("upload")
// // const image=req.File
// console.log(image);

