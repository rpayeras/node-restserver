const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJwt } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "User not exists",
      });
    }

    if (!user.status) {
      return res.status(400).json({
        msg: "This user has been disabled, please contact administrator",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const token = await generateJwt(user.id);

    return res.json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      msg: "Contact with administrator",
    });
  }
};

module.exports = {
  login,
};
