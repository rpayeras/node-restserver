const { response } = require("express");

const usersGet = (req, res = response) => {
  res.status(200).json({
    message: "Get!",
  });
};

const usersPost = (req, res = response) => {
  const { name, age } = req.body;

  res.status(200).json({ name, age });
};

const usersPut = (req, res = response) => {
  const { id } = req.params;
  res.status(200).json({ id });
};

const usersPatch = (req, res = response) => {
  const { test, test2 } = req.query;

  res.status(200).json({ test, test2 });
};

const usersDelete = (req, res = response) => {
  res.status(200).json({
    message: "Get!",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
