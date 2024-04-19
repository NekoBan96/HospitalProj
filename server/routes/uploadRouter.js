const Router = require("express");
const router = new Router();
const UploadController = require("../helpers/uploadHelper");
const express = require('express');
const app = express();

router.post("/uploadFile", UploadController.uploadFile);
router.get('/download', UploadController.download);

module.exports = router;

