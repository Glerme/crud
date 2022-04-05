import multer from "multer";

import path from "path";

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../uploads/avatar");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${file.originalname}` + path.extname(file.originalname)
    );
  },
});

export const uploadAvatar = multer({
  storage: storageImage,
  fileFilter: (req, file, cb) => {
    const text = path.extname(file.originalname);

    if (text !== ".png" && text !== ".jpg" && text !== ".jpeg") {
      return cb(new Error("Somente imagens são permitidas!"));
    }

    cb(null, true);
  },
});
