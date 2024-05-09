import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, Math.random() + "#" + file.originalname);
    },
});

const upload = multer({
    storage,
});

export { upload };
