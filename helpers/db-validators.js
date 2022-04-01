const Role = require("../models/role");
const User = require("../models/user");

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

module.exports = {
  isValidRole,
  userMailNotExists,
  userExistsById,
};
