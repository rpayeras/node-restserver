const checkFileNotEmpty = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  next();
};

module.exports = {
  checkFileNotEmpty,
};
