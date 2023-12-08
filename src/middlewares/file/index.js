const util = require('util');
const multer = require('multer');
const maxSize = 64 * 1024 * 1024;

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/heic' ||
        file.mimetype === 'image/webp'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let uploadFileMulter = multer({
    limits: {
        fileSize: maxSize,
    },
    fileFilter: fileFilter,
}).fields([
    {
        name: 'image',
        maxCount: 10,
    },
]);

const uploader = util.promisify(uploadFileMulter);

const fileParser = (req, res, next) => {
    req.body.image = req.files.image;
    next();
};

const uploadFile = [uploader, fileParser];

module.exports = { uploadFile };
