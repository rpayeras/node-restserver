const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  validExtensions = ["png", "jpg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const nameSplited = file.name.split(".");
    const ext = nameSplited[nameSplited.length - 1];

    if (!validExtensions.includes(ext)) {
      reject(
        new Error(`Extension ${ext} not allowed, only ${validExtensions}`)
      );
    }

    const nameTemp = uuidv4() + "." + ext;
    const uploadPath = path.join(__dirname, "../uploads/", folder, nameTemp);

    file.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        reject(new Error("Error on upload a file"));
      }

      resolve(nameTemp);
    });
  });
};

module.exports = {
  uploadFile,
};
