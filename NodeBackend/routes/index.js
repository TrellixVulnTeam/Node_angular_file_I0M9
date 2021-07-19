const express = require("express");
const router = express.Router();
const controller = require("../controller/fileController");

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);
  router.get("/MostRecentFile", controller.getMostRecentFile);
   router.delete("/deleteMostRecentFile", controller.deleteMostRecentFile);
  app.use(router);
};

module.exports = routes;