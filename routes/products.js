const { Router } = require("express");
const { check } = require("express-validator");
const {
  getAll,
  getById,
  update,
  create,
  deleteRecord,
} = require("../controllers/products");

const { checkValidationsResult, validateJwt } = require("../middlewares");
const {
  categoryExistsById,
  productsExistsById,
} = require("../helpers/db-validators");

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

const commonValidations = [
  check("name", "Name is mandatory").not().isEmpty(),
  check("price").isNumeric(),
  check("description").isString(),
  check("available").isBoolean(),
  check("category").isMongoId(),
  check("category").custom(categoryExistsById),
  checkValidationsResult,
  // check("role", "Is not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
];

router.post("/", [validateJwt, ...commonValidations], create);

router.put("/:id", [validateJwt, ...commonValidations], update);

router.delete(
  "/:id",
  [
    validateJwt,
    check("id", "Id invalid").isMongoId(),
    check("id").custom(productsExistsById),
    checkValidationsResult,
  ],
  deleteRecord
);

module.exports = router;
