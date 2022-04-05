const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJwt = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      res.status(401).json({ msg: "Current user not exists" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = {
  validateJwt,
};
