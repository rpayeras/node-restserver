const { Router } = require("express");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);
router.post("/", usersPost);
router.patch("/", usersPatch);
router.put("/:id", usersPut);
router.delete("/", usersDelete);

module.exports = router;
