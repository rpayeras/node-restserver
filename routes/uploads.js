const { Router } = require("express");
// const { check } = require("express-validator");
const { upload } = require("../controllers/uploads");
const { checkValidationsResult } = require("../middlewares");

const router = Router();

router.post("/", [checkValidationsResult], upload);

module.exports = router;
