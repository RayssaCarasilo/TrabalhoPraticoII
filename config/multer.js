const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,res, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, res, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

module.exports = upload;