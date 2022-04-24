const { Router } = require("express");
const { check } = require("express-validator");
const { show, upload, update, deleteFile } = require("../controllers/uploads");
const { collectionAllowed } = require("../helpers");
const { checkValidationsResult } = require("../middlewares");
const { checkFileNotEmpty } = require("../middlewares/validate-file");

const router = Router();

router.post("/", [checkFileNotEmpty, checkValidationsResult], upload);

router.put(
  "/:collection/:id",
  [
    checkFileNotEmpty,
    check("id").isMongoId(),
    check("collection").custom((c) =>
      collectionAllowed(c, ["users", "products"])
    ),
    checkValidationsResult,
  ],
  update
);

router.get(
  "/:collection/:id",
  [
    check("id").isMongoId(),
    check("collection").custom((c) =>
      collectionAllowed(c, ["users", "products"])
    ),
    checkValidationsResult,
  ],
  show
);

router.delete(
  "/:collection/:id",
  [
    check("id").isMongoId(),
    check("collection").custom((c) =>
      collectionAllowed(c, ["users", "products"])
    ),
    checkValidationsResult,
  ],
  deleteFile
);

module.exports = router;
