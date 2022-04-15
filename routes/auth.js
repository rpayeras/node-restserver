const { Router } = require("express");
const { login, googleSignIn } = require("../controllers/auth");
const { check } = require("express-validator");
const { checkValidationsResult } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("password", "Password is mandatory").not().isEmpty(),
    checkValidationsResult,
  ],
  login
);

router.post(
  "/google",
  [
    check("token", "Google token is needed").not().isEmpty(),
    checkValidationsResult,
  ],
  googleSignIn
);

module.exports = router;
