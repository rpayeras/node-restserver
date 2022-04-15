const { Role, User, Category, Product } = require("../models");

const isValidRole = async (role = "") => {
  const exists = await Role.findOne({ name: role });

  if (!exists) {
    throw new Error("Role does not exist");
  }
};

const userMailNotExists = async (email = "") => {
  const exists = await User.findOne({ email });

  if (exists) {
    throw new Error("Mail already exists");
  }
};

const userExistsById = async (id = "") => {
  const exists = await User.findById(id);

  if (!exists) {
    throw new Error("This user not exists");
  }
};

const categoryExistsById = async (id = "") => {
  const exists = await Category.findById(id);

  if (!exists) {
    throw new Error("This category not exists");
  }
};

const productsExistsById = async (id = "") => {
  const exists = await Product.findById(id);

  if (!exists) {
    throw new Error("This products not exists");
  }
};

module.exports = {
  isValidRole,
  userMailNotExists,
  userExistsById,
  categoryExistsById,
  productsExistsById,
};
