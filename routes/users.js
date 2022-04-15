const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require("../controllers/users");
const {
  isValidRole,
  userMailNotExists,
  userExistsById,
} = require("../helpers/db-validators");

const {
  checkValidationsResult,
  validateJwt,
  hasRole,
} = require("../middlewares");

const router = Router();

router.get(
  "/",
  [
    validateJwt,
    check("limit", "Limit must be a number").isNumeric(),
    check("offset", "Offset must be a number").isNumeric(),
    checkValidationsResult,
  ],
  usersGet
);

const userValidations = [
  check("name", "Name is required").not().isEmpty(),
  check("password", "Password must have more than 6 characters").isLength({
    min: 6,
  }),
  check("email", "Email is required").isEmail(),
  check("role").custom(isValidRole),
  checkValidationsResult,
  // check("role", "Is not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
];

router.post(
  "/",
  [
    ...userValidations,
    check("email").custom(userMailNotExists),
    checkValidationsResult,
  ],
  usersPost
);

router.patch("/", usersPatch);

router.put(
  "/:id",
  [
    ...userValidations,
    check("id", "Id invalid").isMongoId(),
    check("id").custom(userExistsById),
    checkValidationsResult,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    validateJwt,
    hasRole("ADMIN_ROLE"),
    check("id", "Id invalid").isMongoId(),
    check("id").custom(userExistsById),
    checkValidationsResult,
  ],
  usersDelete
);

module.exports = router;
