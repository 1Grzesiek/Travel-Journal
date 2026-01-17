import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // limit 5 MB na plik
  },

  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"), false);
      return;
    }
    cb(null, true);
  }
});

export default upload;
