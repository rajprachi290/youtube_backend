// using multer as  a middleware
// whenever there is a need of file upload we will inject multer ,eg-registration form
// this is a middleware
// we need to configure middleware
//this is basic multer functionality
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage,});
