import path from "path";
import multer from "multer";

import { nanoid } from "../utils/nanoid";

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/games"));
  },
  filename: (req, file, cb) => {
    cb(null, nanoid());
  },
});

export const uploadGameAvatar = multer({
  storage: storageImage,
  fileFilter: (req, file, cb) => {
    const text = path.extname(file.originalname);

    if (text !== ".png" && text !== ".jpg" && text !== ".jpeg") {
      return cb(new Error("Somente imagens são permitidas!"));
    }

    cb(null, true);
  },
});
