const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const where = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(),
    User.find(where).skip(offset).limit(limit),
  ]);

  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Crypt password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.status(200).json(user);
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...otherUserData } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    otherUserData.password = bcrypt.hashSync(password, salt);
  }

  await User.findByIdAndUpdate(id, otherUserData);

  res.json(otherUserData);
};

const usersPatch = (req, res = response) => {
  const { test, test2 } = req.query;

  res.status(200).json({ test, test2 });
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, {
    state: false,
  });

  res.json({
    user,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
