import path from "path";
import multer from "multer";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public", "Assets", "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB size limit
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (![".jpg", ".jpeg", ".webp", ".png", ".mp4"].includes(ext)) {
      return cb(new Error(`Unsupported file type! ${ext}`), false);
    }
    cb(null, true);
  },
});

export default upload;