const { Router } = require("express");
const { login, googleSignIn } = require("../controllers/auth");
const { check } = require("express-validator");
const { validationsResults } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("password", "Password is mandatory").not().isEmpty(),
    validationsResults,
  ],
  login
);

router.post(
  "/google",
  [
    check("token", "Google token is needed").not().isEmpty(),
    validationsResults,
  ],
  googleSignIn
);

module.exports = router;
