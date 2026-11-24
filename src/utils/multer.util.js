
import multer from "multer";
import path from "path";
const uploadRoot = path.resolve("public/uploads");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;
    if (file.mimetype.startsWith("image/")) {
      folder = "img";
    }
    else if (file.mimetype.startsWith("video/")) {
      folder = "videos";
    }
    else if (file.mimetype.startsWith("audio/")) {
      folder = "audio";
    }
    else if (file.mimetype === "application/pdf") {
      folder = "documents";
    }
    else {
      return cb(new Error("Unsupported file type"));
    }
    const destination = path.join(uploadRoot, folder);
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const uniqueName =`${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
    storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "application/pdf"
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file format"));
    }
  }
});

export default upload;
