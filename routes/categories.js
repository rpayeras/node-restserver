const { Router } = require("express");
const { check } = require("express-validator");
const {
  getAll,
  getById,
  update,
  create,
  deleteRecord,
} = require("../controllers/categories");

const { checkValidationsResult, validateJwt } = require("../middlewares");
const { categoryExistsById } = require("../helpers/db-validators");

const router = Router();

router.get(
  "/",
  [
    validateJwt,
    check("limit", "Limit must be a number").isNumeric(),
    check("offset", "Offset must be a number").isNumeric(),
    checkValidationsResult,
  ],
  getAll
);

router.get(
  "/:id",
  [
    validateJwt,
    check("id", "Id invalid").isMongoId(),
    check("id").custom(categoryExistsById),
    checkValidationsResult,
  ],
  getById
);

router.post(
  "/",
  [
    validateJwt,
    check("name", "Name is mandatory").not().isEmpty(),
    checkValidationsResult,
  ],
  create
);

router.put(
  "/:id",
  [
    validateJwt,
    check("name", "Name is mandatory").not().isEmpty(),
    checkValidationsResult,
  ],
  update
);

router.delete(
  "/:id",
  [
    validateJwt,
    check("id", "Id invalid").isMongoId(),
    check("id").custom(categoryExistsById),
    checkValidationsResult,
  ],
  deleteRecord
);

module.exports = router;
