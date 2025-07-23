const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,res, cb) {
        cb(null, "uploads/");
    },                   //colocou file só
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

module.exports = upload;