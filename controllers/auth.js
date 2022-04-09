const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJwt } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req = request, res = response) => {
  const { token } = req.body;

  try {
    const { name, email, picture } = await googleVerify(token);
    let user = await User.findOne({ email });

    if (!user) {
      const newUser = {
        name,
        email,
        password: "bygoogle",
        img: picture,
        google: true,
        role: "USER_ROLE",
      };

      user = new User(newUser);

      await user.save();
    }

    // If user exists in db we check his status
    if (!user.status) {
      return res.status(401).send({
        msg: "User disabled, contact with administrator",
      });
    }

    // Generate local token
    const newToken = await generateJwt(user.id);

    return res.send({
      user,
      token: newToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      msg: "Token invalid",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
