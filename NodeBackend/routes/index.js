const express = require("express");
const router = express.Router();
const controller = require("../controller/fileController");

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);
  router.get("/MostRecentFile", controller.getMostRecentFile);
  app.use(router);
};

module.exports = routes;