const express = require('express');
const router = express.Router();

const upload = require("../config/multer")

const ImageController = require("../controller/imageController");

//mudou para "foto" e adicionou a linha 10
router.post("/", upload.single("foto"), ImageController.create);
router.get("/", ImageController.getAll);

module.exports = router;