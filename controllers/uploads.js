const { response } = require("express");
const fs = require("fs");
const path = require("path");

const { uploadFile } = require("../helpers");
const models = require("../models");

const allowedCollections = ["users", "products", "categories"];
const allowedExtensions = ["png", "jpg"];

const show = async (req, res) => {
  const { collection, id } = req.params;

  if (!allowedCollections.includes(collection) && !models[collection]) {
    return res.status(401).send({
      msg: "Collection not allowed",
    });
  }

  const model = models[collection];

  try {
    const record = await model.findById(id);

    if (!record) {
      return res.status(400).json({
        msg: "Collection not found",
      });
    }

    const pathFile = path.join(__dirname, "../uploads", collection, record.img);

    if (fs.existsSync(pathFile)) {
      res.sendFile(pathFile);
    } else {
      res.sendFile(path.join(__dirname, "../assets/no-image.jpg"));
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      msg: err,
    });
  }
};

const upload = async (req, res = response) => {
  uploadFile(req.files, ["txt", "md", "png"], "generic")
    .then((result) => {
      res.send({
        msg: result,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        msg: err.message,
      });
    });
};

const update = async (req, res) => {
  const { collection, id } = req.params;

  if (!allowedCollections.includes(collection) && !models[collection]) {
    return res.status(401).send({
      msg: "Collection not allowed",
    });
  }

  const model = models[collection];

  try {
    const record = await model.findById(id);

    if (!record) {
      return res.status(400).json({
        msg: "User not found",
      });
    }

    const pathFile = await uploadFile(req.files, allowedExtensions, collection);

    record.img = pathFile;
    await record.save();

    res.json({
      msg: "Image updated",
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      msg: err,
    });
  }
};

const deleteFile = async (req, res) => {
  const { collection, id } = req.params;

  if (!allowedCollections.includes(collection) && !models[collection]) {
    return res.status(401).send({
      msg: "Collection not allowed",
    });
  }

  const model = models[collection];

  try {
    const record = await model.findById(id);

    if (!record) {
      return res.status(400).json({
        msg: "Collection not found",
      });
    }

    const pathFile = path.join(__dirname, "../uploads", collection, record.img);

    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);

      record.img = null;
      await record.save();

      res.json({
        msg: "Image deleted",
      });
    } else {
      return res.status(400).json({
        msg: "Image not found",
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      msg: err,
    });
  }
};

module.exports = {
  upload,
  update,
  deleteFile,
  show,
};
