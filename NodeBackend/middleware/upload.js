//load libraries
const util = require("util"); 
const multer = require("multer");
const maxSize = 10 * 1024 * 1024;   //100 MB

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/MyUploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;