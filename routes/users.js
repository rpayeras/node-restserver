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

const { validationsResults, validateJwt, hasRole } = require("../middlewares");

const router = Router();

router.get(
  "/",
  [
    check("limit", "Limit must be a number").isNumeric(),
    check("offset", "Offset must be a number").isNumeric(),
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
  // check("role", "Is not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
];

router.post(
  "/",
  [
    ...userValidations,
    check("email").custom(userMailNotExists),
    validationsResults,
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
    validationsResults,
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
    validationsResults,
  ],
  usersDelete
);

module.exports = router;
