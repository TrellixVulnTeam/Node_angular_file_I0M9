const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8000/files/"

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 100 MB!",
        });
      }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/MyUploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];
    
    if (files != undefined) {
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });
    
      res.status(200).send(fileInfos);
    }else{res.status(300);}
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/MyUploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};


const getMostRecentFile = (req, res) => {
    const directoryPath = __basedir + "/MyUploads/";
  
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
  
      //let fileInfos = [];
  
    //   files.forEach((file) => {
    //     fileInfos.push({
    //       name: file,
    //       url: baseUrl + file,
    //     });
    //   });
    
    let mostRecentFile={'name':"",'url':""};
    for(i=0;i<files.length;i++){
        mostRecentFile['name']=files[i];
        mostRecentFile['url']=baseUrl+files[i];
    }
      //res.status(200).send(mostRecentFile);
      res.download(directoryPath + mostRecentFile['name'], mostRecentFile['name'], (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not download the file. " + err,
          });
        }
      });
      
      
    });
  };







module.exports = {
  upload,
  getListFiles,
  download,
getMostRecentFile,
};