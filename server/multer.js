const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media");
  },
  filename: function (req, file, cb) {
    let extension = file.originalname.split(".").pop();
    cb(null, uuidv4() + "." + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "user_image") {
    if (file.mimetype.includes("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else if (file.fieldname === "cnic_image_front") {
    if (file.mimetype.includes("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else if (file.fieldname === "cnic_image_back") {
    if (file.mimetype.includes("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else if (file.fieldname === "videos") {
    if (file.mimetype.includes("video/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else if (file.fieldname === "resume") {
    if (
      file.mimetype.includes("image/") ||
      file.mimetype.includes("application/pdf") ||
      file.mimetype.includes("application/msword") ||
      file.mimetype.includes(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(null, false);
  }
};

module.exports = {
  fileStorage,
  fileFilter,
};
