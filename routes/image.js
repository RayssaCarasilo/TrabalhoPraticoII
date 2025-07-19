const express = require('express');
const router = express.Router();

const upload = require("../config/multer")

const ImageController = require("../controller/imageController");

router.post("/", upload.single("file"), ImageController.create);

module.exports = router;