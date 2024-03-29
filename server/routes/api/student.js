const express = require("express");
const router = express.Router();
const studentController = require("../../controllers/studentController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const { studentID } = JSON.parse(req.body.data);
    const fileExt = path.extname(file.originalname);

    fs.readdir("uploads/", (err, files) => {
      if (err) throw err;

      const existingFile = files.find((f) => f.startsWith(studentID));
      if (existingFile) {
        fs.unlink(`uploads/${existingFile}`, (err) => {
          if (err) throw err;
        });
      }

      cb(null, studentID + fileExt);
    });
  },
});

const upload = multer({ storage: storage });

router.post(
  "/submit-form",
  upload.single("resume"),
  studentController.handleSubmitForm,
);

module.exports = router;
