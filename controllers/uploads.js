const { response } = require("express");
const { uploadFile } = require("../helpers");

const upload = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
  }

  uploadFile(req.files, ["txt", "md", "png"], "texts")
    .then((result) => {
      res.send({
        msg: result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        msg: err.message,
      });
    });
};

module.exports = {
  upload,
};
