const { Router } = require("express");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("password", "Password is mandatory").not().isEmpty(),
  ],
  login
);

module.exports = router;
